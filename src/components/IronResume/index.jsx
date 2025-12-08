// =================================================================
// FILE: src/components/IronResume/index.jsx
// =================================================================

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";

import ArcReactorModel from "../ArcReactorModel/ArcReactorModel";
import FloatingHologram from "../FloatingHologram/FloatingHologram";
import RobotArmModel from "../RobotArmModel/RobotArmModel";
import HoverBikeModel from "../HoverBikeModel/HoverBikeModel";

import HUD from "../HUD/HUD";
import LifeLogPanel from "../LifeLogPanel/LifeLogPanel";
import HUDRadar from "../HUDRadar/HUDRadar";

import { profile } from "../../data/profile";
import "./iron-resume.scss";
import BootScreen from "../BootScreen/BootScreen";

import Radar3D from "../Radar3D/Radar3D";
import HologramTable from "../HologramTable/HologramTable";

// NEW environment components
import WoodenFloor from "../WoodenFloor/WoodenFloor";
import OvalRoom from "../OvalRoom/OvalRoom";
import TronFloorModel from "../TronFloorModel/TronFloorModel";

// =================================================================
// COMPONENT
// =================================================================
export default function IronResume() {
    const [activeSection, setActiveSection] = useState(profile.sections[0].id);
    const [lifeOpen, setLifeOpen] = useState(false);
    const [arcPulse, setArcPulse] = useState(false);
    const [assemblyVisible, setAssemblyVisible] = useState(true);
    const [boot, setBoot] = useState(true);

    // Arc reactor pulse when section changes
    useEffect(() => {
        setArcPulse(true);
        const t = setTimeout(() => setArcPulse(false), 1400);
        return () => clearTimeout(t);
    }, [activeSection]);

    return (
        <>
            <BootScreen show={boot} onFinish={() => setBoot(false)} />

            {!boot && (
                <div className="iron-resume-root">
                    <Canvas
                        shadows
                        dpr={[1, 1.5]}
                        camera={{ position: [0, 2.8, 7], fov: 50 }}
                    >
                        {/* ===== LIGHTING ===== */}
                        <ambientLight intensity={0.45} />
                        <directionalLight
                            position={[5, 8, 5]}
                            intensity={1.0}
                            castShadow
                            shadow-mapSize-width={2048}
                            shadow-mapSize-height={2048}
                            shadow-camera-left={-6}
                            shadow-camera-right={6}
                            shadow-camera-top={6}
                            shadow-camera-bottom={-6}
                        />
                        <pointLight position={[0, 4, 2]} intensity={0.9} color={"#00eaff"} />

                        {/* ===== ROOM ENVIRONMENT ===== */}
                        {/* <OvalRoom innerRadius={3.6} height={3.6} y={-0.55} scaleX={1.5} /> */}
                        <WoodenFloor size={40} y={-0.55} />
                        {/* <TronFloorModel /> */}


                        {/* ===== 3D ELEMENTS ===== */}
                        <ArcReactorModel position={[0, 2.5, 0]} scale={0.4} />

                        <Radar3D
                            profile={profile}
                            activeSection={activeSection}
                            position={[0, 1.0, 3]}
                            scale={1.4}
                        />

                        <RobotArmModel
                            position={[-5, -0.55, -5]}
                            rotation={[0, Math.PI / 2, 0]}
                            scale={6}
                        />


                        {assemblyVisible && (
                            <HologramTable
                                position={[0, 0.6, 3]}  // FLOATING 4FT
                                scale={20}
                            />
                        )}

                        <HoverBikeModel
                            position={[7, -0.55, -2.5]}
                            scale={0.3}
                        />

                        {/* ===== SHADOW RECEIVING PLANE ===== */}
                        <ContactShadows
                            position={[0, -0.58, 0]}
                            opacity={0.6}
                            width={8}
                            blur={2.4}
                            far={1.5}
                        />

                        <OrbitControls enablePan enableZoom enableRotate />
                        <FloatingHologram activeSectionId={activeSection} />
                    </Canvas>

                    {/* ===== UI HUD ===== */}
                    <HUD
                        profile={profile}
                        onOpenLife={() => setLifeOpen(true)}
                        onToggleAssembly={() => setAssemblyVisible((v) => !v)}
                        onSelectSection={(id) => setActiveSection(id)}
                    />

                    <HUDRadar activeSection={activeSection} profile={profile} />

                    <div className="life-panel-slot">
                        <LifeLogPanel
                            open={lifeOpen}
                            onClose={() => setLifeOpen(false)}
                            activeId={activeSection}
                            onSelect={(id) => {
                                setActiveSection(id);
                                setLifeOpen(true);
                            }}
                        />
                    </div>

                    <div className="bottom-status">IRON-MODE: ACTIVE</div>
                </div>
            )}
        </>
    );
}
