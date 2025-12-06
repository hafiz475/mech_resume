// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.scss';
import IronResume from './components/IronResume';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IronResume />
  </StrictMode>,
);
