// =================================================================
// FILE: src/components/LifeLogPanel/LifeLogPanel.jsx
// =================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../../data/profile';
import './life-log.scss';


function TimelineItem({ s, idx, active, onClick }) {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }} className={`tl-item ${active ? 'active' : ''}`} onClick={() => onClick(s.id)}>
            <div className="tl-period">{s.period}</div>
            <div className="tl-main">
                <div className="tl-title">{s.title}</div>
                <div className="tl-text">{s.text}</div>
            </div>
        </motion.div>
    );
}

export default function LifeLogPanel({ open, onClose, activeId, onSelect }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div className="life-log-root" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="life-log-card">
                        <div className="life-log-head">
                            <div>LIFE LOG // ORIGIN FILE 001</div>
                            <button onClick={onClose} className="btn small">Close</button>
                        </div>
                        <div className="tl-list">
                            {profile.sections.map((s, i) => (
                                <TimelineItem key={s.id} s={s} idx={i} active={s.id === activeId} onClick={onSelect} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}