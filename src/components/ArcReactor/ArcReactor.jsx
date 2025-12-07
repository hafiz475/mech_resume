// =================================================================
// FILE: src/components/ArcReactor/ArcReactor.jsx
// =================================================================


import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import './arc-reactor.scss';
import arcSound from "../../assets/sfx/arc-pulse.mp3";
import useSFX from "../../hooks/useSFX";


export default function ArcReactor({ active = false }) {
    const ref = useRef();
    const { play } = useSFX();

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.z += 0.008 + (active ? 0.01 : 0);
        const pulse = 1.0 + Math.sin(state.clock.elapsedTime * (active ? 6 : 3)) * (active ? 0.25 : 0.08);
        ref.current.material.emissiveIntensity = 1.2 * pulse;

        // play pulse sound ONCE when active turns true
        if (active && !ref.current.hasPlayed) {
            play(arcSound, 0.4);
            ref.current.hasPlayed = true;

            setTimeout(() => {
                ref.current.hasPlayed = false;
            }, 800);
        }

    });


    return (
        <mesh ref={ref} position={[0, 1.15, 0]}>
            <torusGeometry args={[0.7, 0.12, 18, 128]} />
            <meshStandardMaterial emissive={'#00f5ff'} metalness={0.95} roughness={0.02} emissiveIntensity={2.4} />
        </mesh>
    );
}