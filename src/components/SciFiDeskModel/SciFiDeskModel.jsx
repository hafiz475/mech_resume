// src/components/SciFiDeskModel/SciFiDeskModel.jsx
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function SciFiDeskModel({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1
}) {
    const gltf = useGLTF("/models/scifi-desk/scifi_desk.glb");

    // ------------ NORMALIZE ONLY ONCE ------------
    const desk = useMemo(() => {
        const cloned = gltf.scene.clone(true);

        cloned.traverse(obj => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
                obj.material = obj.material.clone();

                if (obj.material.name.toLowerCase().includes("light")) {
                    obj.material.emissive = new THREE.Color("#00eaff");
                    obj.material.emissiveIntensity = 1.5;
                }
            }
        });

        // Auto-center
        const bbox = new THREE.Box3().setFromObject(cloned);
        const center = new THREE.Vector3();
        bbox.getCenter(center);

        cloned.position.x -= center.x;
        cloned.position.y -= center.y;
        cloned.position.z -= center.z;

        // Auto-scale (normalizing size)
        const size = new THREE.Vector3();
        bbox.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const normalizeScale = 1 / maxDim;

        cloned.scale.setScalar(normalizeScale);

        console.log("[SciFiDesk] loaded once - size:", size, "center:", center);

        return cloned;
    }, [gltf]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={desk} />
        </group>
    );
}

useGLTF.preload("/models/scifi-desk/scifi_desk.glb");
