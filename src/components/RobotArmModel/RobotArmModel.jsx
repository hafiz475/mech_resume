// ======================================================================
// FILE: src/components/RobotArmModel/RobotArmModel.jsx
// ======================================================================

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function RobotArmModel({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const group = useRef();
    const { scene } = useGLTF("/models/robot-arm/arm.glb");

    // Basic emissive highlight + shadows
    scene.traverse((obj) => {
        if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;

            obj.material = obj.material.clone();
            obj.material.emissive = new THREE.Color("#00eaff");
            obj.material.emissiveIntensity = 0.1;
        }
    });

    return (
        <group
            ref={group}
            position={position}
            rotation={rotation}
            scale={scale}
        >
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload("/models/robot-arm/arm.glb");
