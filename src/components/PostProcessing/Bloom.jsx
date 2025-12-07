// src/components/PostProcessing/Bloom.jsx
import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function BloomEffects() {
    return (
        <EffectComposer>
            <Bloom
                intensity={1.25}             // STRONG, clear glow
                luminanceThreshold={0.04}    // VERY sensitive → bloom visible always
                luminanceSmoothing={0.9}
                radius={0.85}                // nice soft edges
                mipmapBlur
            />
        </EffectComposer>
    );
}
