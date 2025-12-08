// src/components/ArcReactorModel/ArcReactorModel.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function ArcReactorModel({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
}) {
    const { scene } = useGLTF("/models/primary-ion-drive/primary_ion_drive.glb");

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload("/models/primary-ion-drive/primary_ion_drive.glb");
