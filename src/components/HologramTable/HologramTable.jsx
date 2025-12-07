import React from "react";
import { useGLTF } from "@react-three/drei";

export default function HologramTable(props) {
    const { scene } = useGLTF("/models/hologram-table/table.glb");

    // Add hologram-like glow
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material.emissive = child.material.emissive || new THREE.Color("#00faff");
            child.material.emissiveIntensity = 0.6;
        }
    });

    return (
        <primitive
            object={scene}
            {...props}
        />
    );
}
