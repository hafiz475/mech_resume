// =================================================================
// FILE: src/components/CodedModels/RobotArm.jsx
// =================================================================

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function RobotArm({ position = [-2, 0, -1], rotation = [0, 0, 0], scale = 1 }) {
    const group = useRef();

    useFrame((s) => {
        if (!group.current) return;
        // gentle idle movement
        group.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.6) * 0.06;
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale}>
            {/* Base */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.28, 0.32, 0.18, 24]} />
                <meshStandardMaterial metalness={0.9} roughness={0.25} color={"#2b2f33"} />
            </mesh>

            {/* Lower segment */}
            <group position={[0, 0.12, 0]}>
                <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.12, 0.12, 1.0, 20]} />
                    <meshStandardMaterial metalness={0.95} roughness={0.18} color={"#3a3f46"} />
                </mesh>

                {/* joint */}
                <mesh position={[0, 1.1, 0]}>
                    <sphereGeometry args={[0.14, 16, 16]} />
                    <meshStandardMaterial emissive={"#00eaff"} emissiveIntensity={0.02} metalness={0.9} roughness={0.1} color={"#111417"} />
                </mesh>

                {/* upper segment */}
                <mesh position={[0.3, 1.65, 0]} rotation={[0, 0, -1.05]}>
                    <boxGeometry args={[0.22, 1.0, 0.22]} />
                    <meshStandardMaterial metalness={0.95} roughness={0.18} color={"#2f3439"} />
                </mesh>

                {/* claw */}
                <group position={[0.75, 1.8, 0]} rotation={[0, 0, 0]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.08, 0.4, 0.06]} />
                        <meshStandardMaterial color={"#111"} metalness={0.95} roughness={0.1} />
                    </mesh>
                    <mesh position={[0, -0.02, 0.07]} rotation={[0, 0.4, 0]}>
                        <boxGeometry args={[0.06, 0.25, 0.06]} />
                        <meshStandardMaterial color={"#111"} metalness={0.9} roughness={0.1} />
                    </mesh>

                    {/* small LED accent */}
                    <mesh position={[0.08, 0.05, 0.0]}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshStandardMaterial emissive={"#00eaff"} emissiveIntensity={1.1} color={"#003a53"} metalness={0.6} roughness={0.1} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}
