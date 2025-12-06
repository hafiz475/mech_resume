// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import IronResume from './components/IronResume';

// --- register shader material with R3F (IMPORTANT) ---
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { hologramShader } from './shaders/hologramShader';

// create a named material constructor and extend THREE with it
const HologramMat = shaderMaterial(
  hologramShader.uniforms,
  hologramShader.vertexShader,
  hologramShader.fragmentShader
);
extend({ HologramMat });
// --- end registration ---

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IronResume />
  </StrictMode>,
);
