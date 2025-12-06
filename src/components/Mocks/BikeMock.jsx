// =================================================================
// FILE: src/components/Mocks/BikeMock.jsx
// =================================================================

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import './mocks.scss';


export default function BikeMock({ position = [2.2, 0.1, -1] }) {
    const ref = useRef();
    useFrame((s) => { if (ref.current) ref.current.rotation.y = -s.clock.elapsedTime * 0.6; });
    return (
        <group ref={ref} position={position}>
            <mesh position={[0, 0.3, 0]}> {/* body */}
                <boxGeometry args={[1.4, 0.2, 0.5]} />
                <meshStandardMaterial color={'#222222'} metalness={0.8} roughness={0.25} />
            </mesh>
            <mesh position={[0.6, 0.05, 0.35]}> {/* wheel */}
                <torusGeometry args={[0.25, 0.06, 16, 64]} />
                <meshStandardMaterial color={'#111'} metalness={0.9} roughness={0.3} />
            </mesh>
            <mesh position={[-0.6, 0.05, 0.35]}> {/* wheel */}
                <torusGeometry args={[0.25, 0.06, 16, 64]} />
                <meshStandardMaterial color={'#111'} metalness={0.9} roughness={0.3} />
            </mesh>
        </group>
    );
}