import { ClientAdapter, ServerAdapter } from "./Adapter";
import { ClientObjectsRegistery } from "./client/ClientObjectsRegistery";
import { ServerObjectsRegistery } from "./server/ServerObjectsRegistery";
import { SyncedVariable } from "./server/SyncedVariable";
import { THNKServerContext } from "./server/THNKServerContext";

interface THNKClient {
  /** The adapter used by the scene to get new messages from the server. */
  adapter: ClientAdapter;
}

declare global {
  namespace gdjs {
    interface RuntimeScene {
      thnkClient?: THNKClient;
      thnkServer?: THNKServerContext;
    }

    interface RuntimeObject {
      /** A 16-bit ID THNK uses to know which replicated object is which. */
      thnkID: number;
      /** A reference to the `State` variable of the object, if it is replicated and on the server. */
      stateVariable: SyncedVariable;

      // Previous values are stored to not send unecessary data
      prevX: number;
      prevY: number;
      prevAngle: number;
      prevScale: number;
      prevZOrder: number;
      prevHeight: number;
      prevWidth: number;
      prevOpacity: number;
      prevVisibility: boolean;
      prevAnimation: number;
      prevText: string;

      // Helper declarations to check for presence of methods present on subclasses
      getScale?: () => number;
      setScale?: (value: number) => void;
      getOpacity?: () => number;
      setOpacity?: (value: number) => void;
      getAnimation?: () => number;
      setAnimation?: (value: number) => void;
      getString?: () => string;
      setString?: (value: string) => void;
    }
  }
}
