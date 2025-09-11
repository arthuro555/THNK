use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub enum Visibility {
    Public,
    Player,
    Server,
}

#[wasm_bindgen]
#[derive(Clone)]
pub enum DataType {
    StaticNumber,
    VarNumber,
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

enum ProtocolUpdate {
    NewComponent {
        cid: usize,
    },
    AddComponentField {
        cid: usize,
        visibility: Visibility,
        data_type: DataType,
    },
    NewEntity {
        eid: usize,
    },
    AddComponent {
        eid: usize,
        cid: usize,
    },
}
