// =================================================================
// FILE: src/components/CodedModels/HoverBike.jsx
// =================================================================

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function HoverBike({ position = [2.4, 0.1, -1], rotation = [0, 0, 0], scale = 1 }) {
    const group = useRef();

    useFrame((s) => {
        if (!group.current) return;
        const t = s.clock.elapsedTime;
        group.current.position.y = position[1] + Math.sin(t * 1.6) * 0.03; // subtle hover
        group.current.rotation.y = -t * 0.15;
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale}>
            {/* body */}
            <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[1.2, 0.18, 0.48]} />
                <meshStandardMaterial color={"#141619"} metalness={0.9} roughness={0.15} />
            </mesh>

            {/* nose */}
            <mesh position={[0.62, 0.18, 0]} rotation={[0, 0, 0.15]}>
                <coneGeometry args={[0.12, 0.3, 12]} />
                <meshStandardMaterial color={"#1b1f24"} metalness={0.9} roughness={0.12} />
            </mesh>

            {/* two hover rings */}
            <group position={[-0.25, 0.02, 0.35]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.36, 0.04, 16, 64]} />
                    <meshStandardMaterial emissive={"#00eaff"} emissiveIntensity={0.9} metalness={0.6} roughness={0.2} color={"#052027"} />
                </mesh>
            </group>

            <group position={[0.75, 0.02, 0.35]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.36, 0.04, 16, 64]} />
                    <meshStandardMaterial emissive={"#00eaff"} emissiveIntensity={0.9} metalness={0.6} roughness={0.2} color={"#052027"} />
                </mesh>
            </group>

            {/* neon strip */}
            <mesh position={[0, 0.28, 0]}>
                <boxGeometry args={[1.0, 0.02, 0.1]} />
                <meshStandardMaterial emissive={"#00eaff"} emissiveIntensity={0.7} color={"#062533"} metalness={0.6} roughness={0.15} />
            </mesh>
        </group>
    );
}
