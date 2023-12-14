declare namespace gdjs {
    namespace scene3d {
        namespace camera {
            const getCameraZ: (runtimeScene: RuntimeScene, layerName: string, cameraIndex: integer) => float;
            const setCameraZ: (runtimeScene: RuntimeScene, z: float, layerName: string, cameraIndex: integer) => void;
            const getCameraRotationX: (runtimeScene: RuntimeScene, layerName: string, cameraIndex: integer) => float;
            const setCameraRotationX: (runtimeScene: RuntimeScene, angle: float, layerName: string, cameraIndex: integer) => void;
            const getCameraRotationY: (runtimeScene: RuntimeScene, layerName: string, cameraIndex: integer) => float;
            const setCameraRotationY: (runtimeScene: RuntimeScene, angle: float, layerName: string, cameraIndex: integer) => void;
            const turnCameraTowardObject: (runtimeScene: RuntimeScene, object: gdjs.RuntimeObject | null, layerName: string, cameraIndex: integer, isStandingOnY: boolean) => void;
            const turnCameraTowardPosition: (runtimeScene: RuntimeScene, x: float, y: float, z: float, layerName: string, cameraIndex: integer, isStandingOnY: boolean) => void;
            const getNearPlane: (runtimeScene: RuntimeScene, layerName: string, cameraIndex: integer) => float;
            const setNearPlane: (runtimeScene: RuntimeScene, distance: float, layerName: string, cameraIndex: integer) => void;
            const getFarPlane: (runtimeScene: RuntimeScene, layerName: string, cameraIndex: integer) => float;
            const setFarPlane: (runtimeScene: RuntimeScene, distance: float, layerName: string, cameraIndex: integer) => void;
            const getFov: (runtimeScene: RuntimeScene, layerName: string, cameraIndex: integer) => float;
            const setFov: (runtimeScene: RuntimeScene, angle: float, layerName: string, cameraIndex: integer) => void;
        }
    }
}
