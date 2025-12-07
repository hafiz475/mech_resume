// ======================================================================
// FILE: src/components/HUDRadar/HUDRadar.jsx
// ======================================================================

import React from "react";
import "./hud-radar.scss";
import { motion } from "framer-motion";

export default function HUDRadar({ activeSection }) {
    return (
        <div className="hud-radar-container">
            {/* Outer rotating ring */}
            <motion.div
                className="radar-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner pulse */}
            <motion.div
                className="radar-pulse"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 🔥 NEW: Radar Sweep Beam */}
            <motion.div
                className="radar-sweep"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Active Target Label */}
            <div className="radar-label">
                <div className="radar-title">TRACKING</div>
                <div className="radar-value">{activeSection}</div>
            </div>
        </div>
    );
}
