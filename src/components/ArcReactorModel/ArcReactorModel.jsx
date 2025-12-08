// src/components/ArcReactorModel/ArcReactorModel.jsx

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ArcReactorModel({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
}) {
    const group = useRef();
    const { scene, animations } = useGLTF("/models/primary-ion-drive/primary_ion_drive.glb");

    const mixer = useRef(null);

    // PLAY ORIGINAL ANIMATIONS FROM MODEL
    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);

            animations.forEach((clip) => {
                const action = mixer.current.clipAction(clip);
                action.play();
            });

            console.log("🎬 Playing GLB animations:", animations);
        }
    }, [scene, animations]);

    useFrame((_, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload("/models/primary-ion-drive/primary_ion_drive.glb");
