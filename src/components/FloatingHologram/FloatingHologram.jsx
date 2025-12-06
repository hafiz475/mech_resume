// =================================================================
// FILE: src/components/FloatingHologram/FloatingHologram.jsx
// =================================================================

import React from 'react';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import './floating-hologram.scss';


export default function FloatingHologram({ activeSectionId }) {
    const active = profile.sections.find(s => s.id === activeSectionId) || profile.sections[0];
    return (
        <Html position={[0.9, 1.15, -0.6]} center occlude>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 12 }} className="fh-card">
                <div className="fh-period">{active.period}</div>
                <div className="fh-title">{active.title}</div>
                <div className="fh-text">{active.text}</div>
            </motion.div>
        </Html>
    );
}