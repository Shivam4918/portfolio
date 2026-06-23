import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParticlesProvider init={particlesInit}>
      <App />
    </ParticlesProvider>
  </React.StrictMode>
);
