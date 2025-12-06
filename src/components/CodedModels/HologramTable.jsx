// =================================================================
// FILE: src/components/CodedModels/HologramTable.jsx
// =================================================================

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function HologramTable({ position = [0, -0.05, 3], rotation = [0, 0, 0], scale = 1 }) {
    const group = useRef();

    useFrame((s) => {
        if (!group.current) return;
        group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.03;
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale}>
            {/* base platform */}
            <mesh position={[0, 0.08, 0]}>
                <cylinderGeometry args={[1.3, 1.3, 0.18, 48]} />
                <meshStandardMaterial color={"#22272b"} metalness={0.85} roughness={0.25} />
            </mesh>

            {/* inner ring (hologram emitter) */}
            <mesh position={[0, 0.22, 0]}>
                <torusGeometry args={[0.85, 0.06, 16, 120]} />
                <meshStandardMaterial emissive={"#00eaff"} emissiveIntensity={0.45} metalness={0.6} roughness={0.3} color={"#052833"} />
            </mesh>

            {/* translucent hologram cone */}
            <mesh position={[0, 0.9, 0]}>
                <coneGeometry args={[0.45, 1.6, 32, 1, true]} />
                <meshStandardMaterial transparent opacity={0.12} color={"#9fe6ff"} metalness={0.1} roughness={0.7} />
            </mesh>

            {/* top hologram disk */}
            <mesh position={[0, 1.0, 0]}>
                <circleGeometry args={[0.42, 64]} />
                <meshStandardMaterial emissive={"#aeeeff"} emissiveIntensity={0.55} transparent opacity={0.9} />
            </mesh>
        </group>
    );
}
