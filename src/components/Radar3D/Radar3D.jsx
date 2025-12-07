// ======================================================================
// FILE: src/components/Radar3D/Radar3D.jsx
// 3D Stark Hologram Radar Projection
// ======================================================================

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Radar3D({ profile, activeSection, position = [1.8, 1.2, -0.6], scale = 0.9 }) {

    const ringRef = useRef();
    const sweepRef = useRef();
    const pulseRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // rotating ring
        ringRef.current.rotation.z = t * 0.35;

        // sweep rotates faster
        sweepRef.current.rotation.z = t * 1.4;

        // center pulse
        const s = 1 + Math.sin(t * 3) * 0.12;
        pulseRef.current.scale.set(s, s, s);
    });

    return (
        <group position={position} scale={scale}>

            {/* Outer hologram ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.55, 0.01, 16, 64]} />
                <meshStandardMaterial
                    emissive={"#00faff"}
                    emissiveIntensity={3.5}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Center pulse */}
            <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.12, 32]} />
                <meshStandardMaterial
                    emissive={"#00faff"}
                    emissiveIntensity={3.5}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Sweep beam */}
            <mesh ref={sweepRef} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.6, 0.03]} />
                <meshStandardMaterial
                    emissive={"#00faff"}
                    emissiveIntensity={3.5}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Timeline dots */}
            {profile.sections.map((item, i) => {
                const angle = (i / profile.sections.length) * Math.PI * 2;
                const radius = 0.55;

                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const isActive = item.id === activeSection;

                return (
                    <mesh
                        key={item.id}
                        position={[x, 0, y]}
                        rotation={[0, 0, 0]}
                        scale={isActive ? 1.3 : 1}
                    >
                        <circleGeometry args={[0.03, 16]} />
                        <meshStandardMaterial
                            emissive={isActive ? "#00faff" : "#0099aa"}
                            emissiveIntensity={isActive ? 3.5 : 1.5}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
