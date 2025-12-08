// src/components/WoodenFloor/WoodenFloor.jsx
import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";

export default function WoodenFloor({ size = 40, y = 0 }) {
    let texture = null;

    // If you add a texture at public/textures/wood_floor.jpg it will be used.
    // Otherwise the code will fallback to a plain wood-like color.
    try {
        texture = useLoader(TextureLoader, "/textures/wood_floor.jpg");
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(12, 12);
    } catch (e) {
        texture = null;
    }

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, y, 0]}
            receiveShadow
        >
            <planeGeometry args={[size, size]} />
            {texture ? (
                <meshStandardMaterial map={texture} metalness={0.05} roughness={0.9} />
            ) : (
                <meshStandardMaterial color={"#6f4a2d"} metalness={0.05} roughness={0.9} />
            )}
        </mesh>
    );
}
