import React, { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import Particles from 'react-particles';
import particlesConfig from '../config/particles.config';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []); 

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <div id='particles-background' className='z-[-99] relative' >
      <Particles
        id='tsparticles'
        particlesLoaded={particlesLoaded} 
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesConfig}
        height={100}
        width={100} 
      />
    </div>
  );
};

export default ParticlesBackground;
