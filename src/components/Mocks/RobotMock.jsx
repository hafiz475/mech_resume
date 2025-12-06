// =================================================================
// FILE: src/components/Mocks/RobotMock.jsx
// =================================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import './mocks.scss';


export default function RobotMock({ position = [-2.4, 0.5, -1], scale = 0.9 }) {
    const ref = useRef();
    useFrame((s) => {
        if (!ref.current) return;
        ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.6) * 0.18;
        ref.current.position.y = 0.5 + Math.sin(s.clock.elapsedTime * 1.6) * 0.02;
    });
    return (
        <group ref={ref} position={position} scale={scale}>
            <mesh position={[0, 0.65, 0]}>
                <boxGeometry args={[0.9, 0.9, 0.4]} />
                <meshStandardMaterial color={'#b0b6c8'} metalness={0.74} roughness={0.18} />
            </mesh>
            <mesh position={[0, -0.1, 0]}> {/* body */}
                <boxGeometry args={[1.2, 1.0, 0.6]} />
                <meshStandardMaterial color={'#9aa4b6'} metalness={0.7} roughness={0.25} />
            </mesh>
            <mesh position={[0, 1.2, 0.08]}> {/* head */}
                <sphereGeometry args={[0.28, 16, 16]} />
                <meshStandardMaterial emissive={'#dbefff'} emissiveIntensity={0.35} metalness={0.6} roughness={0.1} />
            </mesh>
        </group>
    );
}