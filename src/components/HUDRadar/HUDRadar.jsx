// ======================================================================
// FILE: src/components/HUDRadar/HUDRadar.jsx
// ======================================================================

import React from "react";
import "./hud-radar.scss";
import { motion } from "framer-motion";

export default function HUDRadar({ activeSection, profile }) {

    return (
        <div className="hud-radar-container">

            {/* Rotating Ring */}
            <motion.div
                className="radar-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Pulsing Center */}
            <motion.div
                className="radar-pulse"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Sweep Beam */}
            <motion.div
                className="radar-sweep"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* ⭐ NEW: Mini Dots for Timeline */}
            <div className="radar-dots">
                {profile.sections.map((item, index) => {
                    // evenly distribute dots around circle
                    const angle = (index / profile.sections.length) * Math.PI * 2;

                    const x = Math.cos(angle) * 55; // radius
                    const y = Math.sin(angle) * 55;

                    const isActive = item.id === activeSection;

                    return (
                        <motion.div
                            key={item.id}
                            className={`radar-dot ${isActive ? "active" : ""}`}
                            style={{
                                transform: `translate(${x}px, ${y}px)`
                            }}
                            animate={isActive ? { scale: [1, 1.5, 1] } : {}}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        />
                    );
                })}
            </div>

            {/* Text Label */}
            <div className="radar-label">
                <div className="radar-title">TRACKING</div>
                <div className="radar-value">{activeSection}</div>
            </div>
        </div>
    );
}
