// =================================================================
// FILE: src/components/IronResume/index.jsx
// =================================================================

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import ArcReactor from '../ArcReactor/ArcReactor';
import FloatingHologram from '../FloatingHologram/FloatingHologram';
import RobotArm from '../CodedModels/RobotArm';
import HoverBike from '../CodedModels/HoverBike';
import HologramTable from '../CodedModels/HologramTable';
import HUD from '../HUD/HUD';
import LifeLogPanel from '../LifeLogPanel/LifeLogPanel';
import { profile } from '../../data/profile';
import './iron-resume.scss';
import BootScreen from "../BootScreen/BootScreen";



export default function IronResume() {
    const [activeSection, setActiveSection] = useState(profile.sections[0].id);
    const [lifeOpen, setLifeOpen] = useState(false);
    const [arcPulse, setArcPulse] = useState(false);
    const [assemblyVisible, setAssemblyVisible] = useState(true);
    const [boot, setBoot] = useState(true);



    // pulse arc on section change
    useEffect(() => {
        setArcPulse(true);
        const t = setTimeout(() => setArcPulse(false), 1400);
        return () => clearTimeout(t);
    }, [activeSection]);


    return (
        <>
            {/* Boot Screen Always Shows First */}
            <BootScreen show={boot} onFinish={() => setBoot(false)} />

            {/* Main Resume shows ONLY after boot is finished */}
            {!boot && (
                <div className="iron-resume-root">

                    <Canvas camera={{ position: [0, 2.8, 7], fov: 50 }}>
                        <ambientLight intensity={0.35} />
                        <directionalLight position={[5, 10, 5]} intensity={1.1} />
                        <pointLight position={[0, 4, 2]} intensity={1.2} color={'#00eaff'} />

                        <ArcReactor active={arcPulse} />
                        <RobotArm position={[-2, 0, -1]} scale={1} />
                        {assemblyVisible && <HologramTable position={[0, -0.05, 3]} scale={1} />}
                        <HoverBike position={[2.4, 0.1, -1]} scale={1} />

                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
                            <planeGeometry args={[40, 40]} />
                            <meshStandardMaterial color={'#05070a'} metalness={0.2} roughness={0.6} />
                        </mesh>

                        <ContactShadows position={[0, -0.58, 0]} opacity={0.6} width={8} blur={2.4} far={1.5} />
                        <OrbitControls enablePan enableZoom enableRotate />

                        <FloatingHologram activeSectionId={activeSection} />
                    </Canvas>

                    <HUD
                        profile={profile}
                        onOpenLife={() => setLifeOpen(true)}
                        onToggleAssembly={() => setAssemblyVisible((v) => !v)}
                        onSelectSection={(id) => setActiveSection(id)}
                    />

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