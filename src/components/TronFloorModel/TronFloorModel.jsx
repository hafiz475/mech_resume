// src/components/TronFloorModel/TronFloorModel.jsx
import React, { useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function TronFloorModel({
    position = [0, -0.55, 0],
    scale = 1,
}) {
    const group = useRef();
    const { scene } = useGLTF("/models/tron-floor/floor.glb");

    useLayoutEffect(() => {
        if (!scene || !group.current) return;

        // Clone so we don't mutate original GLTF
        const root = scene.clone(true);

        // ----------------------------------------------------
        // 🔥 STEP 1: FORCE ALL ROTATIONS TO IDENTITY (NO TILT)
        // ----------------------------------------------------
        root.traverse(obj => {
            obj.rotation.set(0, 0, 0);    // remove rotation
            obj.updateMatrixWorld(true);
        });

        // ----------------------------------------------------
        // 🔥 STEP 2: NOW ROTATE WHOLE FLOOR TO BE HORIZONTAL
        // ----------------------------------------------------
        // Floor should lie flat: rotate -90° on X axis
        root.rotation.set(-Math.PI / 2, 0, 0);

        // ----------------------------------------------------
        // 🔥 STEP 3: Fix materials + emissive glow
        // ----------------------------------------------------
        root.traverse(obj => {
            if (obj.isMesh) {
                obj.material = obj.material.clone();
                obj.material.emissive = new THREE.Color("#00eaff");
                obj.material.emissiveIntensity = 1.2;
                obj.castShadow = false;
                obj.receiveShadow = true;
            }
        });

        group.current.add(root);
    }, [scene]);

    return (
        <group
            ref={group}
            position={position}
            scale={scale}
        />
    );
}

useGLTF.preload("/models/tron-floor/floor.glb");
