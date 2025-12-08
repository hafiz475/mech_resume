// src/components/SciFiTerminalModel/SciFiTerminalModel.jsx
import React, { useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function SciFiTerminalModel({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
}) {
    const group = useRef();
    const { scene } = useGLTF("/models/scifi-terminal/scifi_terminal.glb");

    useLayoutEffect(() => {
        if (!scene) return;

        scene.traverse(obj => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                // Optional: Add subtle sci-fi glow on screens
                obj.material = obj.material.clone();
                if (obj.material.name.toLowerCase().includes("screen")) {
                    obj.material.emissive = new THREE.Color("#00faff");
                    obj.material.emissiveIntensity = 1.2;
                }
            }
        });
    }, [scene]);

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

useGLTF.preload("/models/scifi-terminal/scifi_terminal.glb");
