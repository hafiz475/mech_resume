// src/components/TimeMachineModel/TimeMachineModel.jsx
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function TimeMachineModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const { scene } = useGLTF("/models/time_machine/time_machine.glb");

    const cloned = useMemo(() => {
        const g = scene.clone(true);
        g.traverse(obj => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                obj.material = obj.material.clone();
                // Time machine glowing accents
                obj.material.emissive = new THREE.Color("#00c8ff");
                obj.material.emissiveIntensity = 0.15;
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

useGLTF.preload("/models/time_machine/time_machine.glb");
