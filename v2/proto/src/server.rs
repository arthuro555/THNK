use std::{collections::VecDeque, rc::Rc};

use wasm_bindgen::prelude::*;

use crate::utils::{DefaultWithId, IdPool};

#[bitmask_enum::bitmask(u8)]
enum PacketHeader {
    SchemaUpdateIncluded,
    PartialUpdate,
}

#[wasm_bindgen]
pub enum Visibility {
    Public,
    Server,
    Player,
}

#[wasm_bindgen]
#[derive(Clone)]
pub enum DataType {
    Number,
    Text,
    Bool,
    Array,
    Component,
}

#[wasm_bindgen]
#[derive(Clone)]
pub enum NumberTypes {
    Byte,
    Short,
    Long,
    HalfFloat,
    Full,
    Float,
    Extra,
}

#[wasm_bindgen(getter_with_clone)]
pub struct Component {
    #[wasm_bindgen(readonly)]
    pub name: String,
    #[wasm_bindgen(readonly)]
    pub fields: Vec<ComponentField>,
}

#[wasm_bindgen]
impl Component {
    #[wasm_bindgen(constructor)]
    pub fn new(name: String) -> Self {
        Self {
            name,
            fields: vec![],
        }
    }

    // Consumes a field and adds it to a Component
    #[wasm_bindgen]
    pub fn add_field(&mut self, field: ComponentField) {
        self.fields.push(field);
    }
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Clone)]
pub struct ComponentField {
    #[wasm_bindgen(readonly)]
    pub name: String,
    #[wasm_bindgen(readonly)]
    pub data_type: DataType,
}

#[wasm_bindgen]
impl ComponentField {
    #[wasm_bindgen]
    pub fn new(name: String, data_type: DataType) -> Self {
        Self { name, data_type }
    }
}

#[derive(Clone)]
struct Entity {
    id: usize,
    components: Vec<usize>,
}

impl DefaultWithId for Entity {
    fn create_with_id(id: usize) -> Self {
        Self {
            id,
            components: vec![],
        }
    }
}

struct Schema {
    version: usize,
    entities: IdPool<Entity>,
    components: Rc<Vec<Component>>,
    components_count: usize,
    entity_id_size: NumberTypes,
    component_id_size: NumberTypes,
    new_entities: Vec<usize>,
    removed_entities: Vec<usize>,
    entity_component_updates: Vec<Vec<usize>>,
}

impl Schema {
    pub fn empty() -> Self {
        Self {
            version: 0,
            entities: IdPool::new(),
            components: Rc::new(vec![]),
            components_count: 0,
            entity_id_size: NumberTypes::Byte,
            component_id_size: NumberTypes::Byte,
            new_entities: vec![],
            removed_entities: vec![],
            entity_component_updates: vec![vec![]],
        }
    }

    pub fn create_next(&self) -> Self {
        Self {
            version: self.version + 1,
            components: self.components.clone(),
            components_count: self.components_count,
            entities: self.entities.clone(),
            component_id_size: self.component_id_size.clone(),
            entity_id_size: self.entity_id_size.clone(),
            new_entities: vec![],
            removed_entities: vec![],
            entity_component_updates: vec![],
        }
    }

    pub fn add_entity(&mut self) -> usize {
        let id = self.entities.generate();
        self.new_entities.push(id);
        id
    }

    pub fn remove_entity(&mut self, id: usize) {
        self.removed_entities.push(id);
        self.entities.release(id);
    }
}

pub struct Player {
    id: usize,
    last_ackd_schema: usize,
    authenticated: bool,
}

impl DefaultWithId for Player {
    fn create_with_id(id: usize) -> Self {
        Self {
            id,
            last_ackd_schema: 0,
            authenticated: false,
        }
    }
}

// The list of player messages to send for this tick.
#[wasm_bindgen]
pub struct PlayerUpdateMessages {
    // The id of the player this message is destined to.
    #[wasm_bindgen(readonly)]
    pub id: usize,
    payload: Vec<u8>,
}

#[wasm_bindgen]
impl PlayerUpdateMessages {
    // Gets the message to send AND FREES THE UNDERLYING WASM MEMORY.
    // Do not forget to call this, but do not call it more than once!
    #[wasm_bindgen]
    pub fn payload(self) -> Vec<u8> {
        self.payload
    }
}

#[wasm_bindgen]
pub struct ServerContext {
    players: IdPool<Player>,
    next_schema: Schema,
    previous_schemas: VecDeque<Schema>,
    authentication_enabled: bool,
    schema_dirty: bool,
}

#[wasm_bindgen]
impl ServerContext {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let initial_schema = Schema::empty();
        Self {
            players: IdPool::new(),
            next_schema: initial_schema.create_next(),
            previous_schemas: VecDeque::from([initial_schema]),
            authentication_enabled: false,
            schema_dirty: false,
        }
    }

    fn make_packet(&self, for_player: &Player) -> Vec<u8> {
        let header: PacketHeader = match self.schema_dirty {
            true => PacketHeader::SchemaUpdateIncluded,
            false => PacketHeader::none(),
        };
        let proto: Vec<u8> = vec![header.into()];

        proto
    }

    #[wasm_bindgen]
    pub fn create_player(&mut self) -> usize {
        self.players.generate()
    }

    #[wasm_bindgen]
    pub fn delete_player(&mut self, player_id: usize) {
        self.players.release(player_id);
    }

    #[wasm_bindgen]
    pub fn generate_player_update_messages(&self) -> Vec<PlayerUpdateMessages> {
        let mut messages: Vec<PlayerUpdateMessages> = Vec::with_capacity(self.players.len());

        for player in self.players.iter() {
            if self.authentication_enabled && !player.authenticated {
                continue;
            }
            messages.push(PlayerUpdateMessages {
                id: player.id,
                payload: self.make_packet(player),
            });
        }

        messages
    }

    #[wasm_bindgen]
    pub fn enable_authentication(&mut self) {
        self.authentication_enabled = true;
    }

    #[wasm_bindgen]
    pub fn authenticate_player(&mut self, player_id: usize) -> Result<(), String> {
        let player: &mut Player = self
            .players
            .get(player_id)
            .ok_or(String::from("No such player"))?;
        player.authenticated = true;
        Ok(())
    }

    #[wasm_bindgen]
    pub fn add_entity(&mut self) -> usize {
        self.schema_dirty = true;
        self.next_schema.add_entity()
    }

    #[wasm_bindgen]
    pub fn remove_entity(&mut self, id: usize) {
        self.schema_dirty = true;
        self.next_schema.remove_entity(id);
    }
}

#[cfg(test)]
mod test {
    use super::ServerContext;

    #[test]
    fn make_server_context() {
        let mut ctx = ServerContext::new();

        let p1 = ctx.create_player();
        let p2 = ctx.create_player();
        ctx.delete_player(p1);
        let p1 = ctx.create_player();

        {
            let p1 = ctx.create_player();
            let p2 = ctx.create_player();
            let p3 = ctx.create_player();
            ctx.delete_player(p1);
            ctx.delete_player(p2);
            ctx.create_player();
            ctx.delete_player(p3);
        }

        println!("{:?} {:?}", p1, p2);
    }
}
