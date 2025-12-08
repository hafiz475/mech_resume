// src/components/OvalRoom/OvalRoom.jsx
import React from "react";
import * as THREE from "three";

export default function OvalRoom({
    innerRadius = 3.5,
    height = 3.2,
    y = 0,
    scaleX = 1.6,
}) {
    return (
        <group position={[0, y + height / 2, 0]}>
            {/* interior wall (cylinder scaled to be oval) */}
            <mesh rotation={[0, 0, 0]} scale={[scaleX, 1, 1]}>
                <cylinderGeometry args={[innerRadius, innerRadius, height, 128, 1, true]} />
                <meshStandardMaterial
                    color={"#ffffff"}
                    roughness={0.85}
                    metalness={0.02}
                    side={THREE.BackSide} // show inside
                />
            </mesh>

            {/* subtle ceiling/top fill (optional) */}
            <mesh position={[0, height / 2 - 0.02, 0]} rotation={[0, 0, 0]} scale={[scaleX, 1, 1]}>
                <circleGeometry args={[innerRadius * 1.02, 64]} />
                <meshStandardMaterial color={"#fafafa"} roughness={0.9} />
            </mesh>
        </group>
    );
}
