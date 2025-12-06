// =================================================================
// FILE: src/components/HUD/HUD.jsx
// =================================================================

import React from 'react';
import './hud.scss';
import clickBeep from "../../assets/sfx/ui-beep.mp3";
import useSFX from "../../hooks/useSFX";


export default function HUD({ profile, onOpenLife, onToggleAssembly, onSelectSection }) {
    const { play } = useSFX();
    return (
        <div className="hud-root">
            <div className="hud-card">
                <div className="hud-head">
                    <div className="hud-avatar">AR</div>
                    <div className="hud-meta">
                        <div className="hud-name">{profile.name}</div>
                        <div className="hud-sub">{profile.location} • {profile.birthdate}</div>
                    </div>
                </div>


                <div className="hud-about">
                    <strong>About</strong>
                    <p>Born a football kid, became a mechanical engineer, and pivoted into software — building robotics, factory-scale systems, and full-stack product experiences.</p>
                </div>


                <div className="hud-stack">
                    <strong>Tech Stack</strong>
                    <div className="stack-list">
                        {profile.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
                    </div>
                </div>


                <div className="hud-actions">
                    <button
                        onClick={() => { play(clickBeep, 0.3); onOpenLife(); }}
                        className="btn primary"
                    >
                        Open Life Log
                    </button>

                    <button
                        onClick={() => { play(clickBeep, 0.3); onToggleAssembly(); }}
                        className="btn"
                    >
                        Toggle Assembly Floor
                    </button>
                </div>

            </div>
        </div>
    );
}