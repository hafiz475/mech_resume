// src/components/SciFiTableModel/SciFiTableModel.jsx
import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

export default function SciFiTableModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const { scene } = useGLTF("/models/scifi_table_v1/scifi_table_v1_matte.glb");

    const cloned = useMemo(() => {
        const g = scene.clone(true);
        g.traverse(obj => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
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

useGLTF.preload("/models/scifi_table_v1/scifi_table_v1_matte.glb");
