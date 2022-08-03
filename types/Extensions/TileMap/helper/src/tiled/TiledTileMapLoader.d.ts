import { EditableTileMap } from '../model/TileMapModel';
import { TiledMap } from './TiledFormat';
/**
 * It creates a {@link EditableTileMap} from a Tiled JSON.
 */
export declare class TiledTileMapLoader {
    static load(tiledMap: TiledMap): EditableTileMap | null;
}
