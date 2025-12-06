// =================================================================
// FILE: src/components/FloatingHologram/FloatingHologram.jsx
// =================================================================

import React, { useEffect } from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import './floating-hologram.scss';
import whooshSound from "../../assets/sfx/hologram-whoosh.mp3";
import useSFX from "../../hooks/useSFX";
import HologramSurface from '../HologramSurface/HologramSurface';


export default function FloatingHologram({ activeSectionId }) {
    const active = profile.sections.find(s => s.id === activeSectionId) || profile.sections[0];
    const { play } = useSFX();

    useEffect(() => {
        play(whooshSound, 0.25);
    }, [activeSectionId]);

    return (
        <group position={[0.9, 1.15, -0.6]}>
            {/* hologram background */}
            <HologramSurface width={1.4} height={1} rotation={[0, 0, 0]} />


            {/* floating UI (HTML) */}
            <Html center distanceFactor={10}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} className="fh-card">
                    <div className="fh-period">{active.period}</div>
                    <div className="fh-title">{active.title}</div>
                    <div className="fh-text typewriter">
                        {active.text.split("").map((char, i) => (
                            <span
                                key={i}
                                className="tw-char"
                                style={{
                                    animationDelay: `${i * 0.02}s`,
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </Html>
        </group>
    );
}