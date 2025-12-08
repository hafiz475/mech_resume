// src/components/TronCarModel/TronCarModel.jsx
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function TronCarModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const { scene } = useGLTF("/models/tron_car_lowpoly/tron_car_lowpoly.glb");

    const cloned = useMemo(() => {
        const g = scene.clone(true);
        g.traverse(obj => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                obj.material = obj.material.clone();
                // Glow for TRON lines
                obj.material.emissive = new THREE.Color("#00eaff");
                obj.material.emissiveIntensity = 0.2;
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

useGLTF.preload("/models/tron_car_lowpoly/tron_car_lowpoly.glb");
