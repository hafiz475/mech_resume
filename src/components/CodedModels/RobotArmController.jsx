// src/components/CodedModels/RobotArmController.jsx

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import servoSound from "../../assets/sfx/servo-move.mp3";
import useSFX from "../../hooks/useSFX";

export default function RobotArmController({ group, activeSection }) {
    const { play } = useSFX();
    const targetRot = useRef(0);
    const currentRot = useRef(0);

    useEffect(() => {
        play(servoSound, 0.35);
    }, [activeSection]);

    useFrame(() => {
        if (!group.current) return;

        const i = Number(activeSection.replace("sec", ""));
        targetRot.current = i * 0.35;

        currentRot.current += (targetRot.current - currentRot.current) * 0.07;

        group.current.rotation.y = currentRot.current;
    });

    return null;
}
