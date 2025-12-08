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

    // Load GLB
    const gltf = useGLTF("/models/robot-arm/arm.glb");

    // Add simple emissive highlight (optional)
    gltf.scene.traverse((node) => {
        if (node.isMesh) {
            node.material = node.material.clone();
            node.material.emissive = new THREE.Color("#00eaff");
            node.material.emissiveIntensity = 0.08;
        }
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale}>
            <primitive object={gltf.scene} />
        </group>
    );
}

useGLTF.preload("/models/robot-arm/arm.glb");
