declare namespace gdjs {
    /** Base parameters for {@link gdjs.Cube3DRuntimeObject} */
    export interface Cube3DObjectData extends Object3DData {
        /** The base parameters of the Cube3D object */
        content: Object3DDataContent & {
            enableTextureTransparency: boolean;
            facesOrientation: 'Y' | 'Z';
            frontFaceResourceName: string;
            backFaceResourceName: string;
            backFaceUpThroughWhichAxisRotation: 'X' | 'Y';
            leftFaceResourceName: string;
            rightFaceResourceName: string;
            topFaceResourceName: string;
            bottomFaceResourceName: string;
            frontFaceResourceRepeat: boolean;
            backFaceResourceRepeat: boolean;
            leftFaceResourceRepeat: boolean;
            rightFaceResourceRepeat: boolean;
            topFaceResourceRepeat: boolean;
            bottomFaceResourceRepeat: boolean;
            frontFaceVisible: boolean;
            backFaceVisible: boolean;
            leftFaceVisible: boolean;
            rightFaceVisible: boolean;
            topFaceVisible: boolean;
            bottomFaceVisible: boolean;
            materialType: 'Basic' | 'StandardWithoutMetalness';
        };
    }
    type FaceName = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
    /**
     * Shows a 3D box object.
     */
    export class Cube3DRuntimeObject extends gdjs.RuntimeObject3D {
        private _renderer;
        private _facesOrientation;
        private _backFaceUpThroughWhichAxisRotation;
        private _shouldUseTransparentTexture;
        private _visibleFacesBitmask;
        private _textureRepeatFacesBitmask;
        private _faceResourceNames;
        _materialType: gdjs.Cube3DRuntimeObject.MaterialType;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, objectData: Cube3DObjectData);
        /**
         * Sets the visibility of a face of the 3D box.
         *
         * @param faceName - The name of the face to set visibility for.
         * @param value - The visibility value to set.
         */
        setFaceVisibility(faceName: FaceName, enable: boolean): void;
        /**
         * Sets the texture repeat of a face of the 3D box.
         *
         * @param faceName - The name of the face to set visibility for.
         * @param value - The visibility value to set.
         */
        setRepeatTextureOnFace(faceName: FaceName, enable: boolean): void;
        isFaceVisible(faceName: FaceName): boolean;
        /** @internal */
        isFaceAtIndexVisible(faceIndex: any): boolean;
        /** @internal */
        shouldRepeatTextureOnFaceAtIndex(faceIndex: any): boolean;
        setFaceResourceName(faceName: FaceName, resourceName: string): void;
        /** @internal */
        getFaceAtIndexResourceName(faceIndex: integer): string;
        getRenderer(): gdjs.RuntimeObject3DRenderer;
        getBackFaceUpThroughWhichAxisRotation(): 'X' | 'Y';
        setBackFaceUpThroughWhichAxisRotation(axis: 'X' | 'Y'): void;
        getFacesOrientation(): 'Y' | 'Z';
        setFacesOrientation(orientation: 'Y' | 'Z'): void;
        updateFromObjectData(oldObjectData: Cube3DObjectData, newObjectData: Cube3DObjectData): boolean;
        /**
         * Return true if the texture transparency should be enabled.
         */
        shouldUseTransparentTexture(): boolean;
        _convertMaterialType(materialTypeString: string): gdjs.Cube3DRuntimeObject.MaterialType;
        setMaterialType(materialTypeString: string): void;
    }
    export namespace Cube3DRuntimeObject {
        enum MaterialType {
            Basic = 0,
            StandardWithoutMetalness = 1
        }
    }
    export {};
}
