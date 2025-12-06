// =================================================================
// FILE: src/components/Mocks/FactoryBlock.jsx
// =================================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import './mocks.scss';


export default function FactoryBlock({ position = [0, -0.05, 3], scale = 1 }) {
    const ref = useRef();
    useFrame((s) => { if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.02; });
    return (
        <group ref={ref} position={position} scale={scale}>
            <mesh position={[0, 0.2, 0]}> <boxGeometry args={[3.2, 0.5, 2.0]} />
                <meshStandardMaterial color={'#3b3f46'} metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[-1.1, 0.9, -0.5]}> <cylinderGeometry args={[0.12, 0.12, 1.2, 12]} />
                <meshStandardMaterial color={'#5d6166'} metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[1.0, 0.9, -0.4]}> <cylinderGeometry args={[0.12, 0.12, 1.2, 12]} />
                <meshStandardMaterial color={'#5d6166'} metalness={0.6} roughness={0.4} />
            </mesh>
        </group>
    );
}