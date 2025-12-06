// =================================================================
// FILE: src/components/ArcReactor/ArcReactor.jsx
// =================================================================


import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import './arc-reactor.scss';


export default function ArcReactor({ active = false }) {
    const ref = useRef();
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.z += 0.008 + (active ? 0.01 : 0);
        const pulse = 1.0 + Math.sin(state.clock.elapsedTime * (active ? 6 : 3)) * (active ? 0.25 : 0.08);
        ref.current.material.emissiveIntensity = 1.2 * pulse;
    });


    return (
        <mesh ref={ref} position={[0, 1.15, 0]}>
            <torusGeometry args={[0.7, 0.12, 18, 128]} />
            <meshStandardMaterial emissive={'#00f5ff'} metalness={0.95} roughness={0.02} emissiveIntensity={1.2} />
        </mesh>
    );
}