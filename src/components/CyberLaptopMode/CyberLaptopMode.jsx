// src/components/CyberLaptopModel/CyberLaptopModel.jsx
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function CyberLaptopModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const { scene } = useGLTF("/models/cyberpunk_laptop/cyberpunk_laptop.glb");

    const cloned = useMemo(() => {
        const g = scene.clone(true);
        g.traverse(obj => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                obj.material = obj.material.clone();
                // screen glow
                if (obj.material.name.toLowerCase().includes("screen")) {
                    obj.material.emissive = new THREE.Color("#00eaff");
                    obj.material.emissiveIntensity = 1.2;
                }
            }
        });
        return g;
    }, [scene]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={cloned} />
        </group>
    );
}

useGLTF.preload("/models/cyberpunk_laptop/cyberpunk_laptop.glb");
