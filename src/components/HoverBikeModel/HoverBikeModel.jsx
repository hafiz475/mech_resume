// src/components/HoverBikeModel/HoverBikeModel.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function HoverBikeModel({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
}) {
    const { scene } = useGLTF("/models/tron-moto-lowpol/tron_moto_lowpoly.glb");

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload("/models/tron-moto-lowpol/tron_moto_lowpoly.glb");
