// src/components/HologramSurface/HologramSurface.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function HologramSurface({ width = 1.2, height = 0.8, rotation = [0, 0, 0] }) {
    const mat = useRef();

    useFrame(() => {
        if (!mat.current) return;
        // increment uniform uTime exposed by our shader material
        if (mat.current.uTime !== undefined) mat.current.uTime += 0.02;
    });

    return (
        <mesh rotation={rotation}>
            <planeGeometry args={[width, height]} />
            {/* use the registered material: <hologramMat /> (lowercased tag) */}
            <hologramMat
                ref={mat}
                transparent
                depthWrite={false}
                uColor={new Float32Array([0.0, 0.9, 1.0])}
                uOpacity={0.55}
            />

        </mesh>
    );
}
