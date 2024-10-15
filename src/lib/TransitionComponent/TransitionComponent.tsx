import React from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap-trial';

const TransitionComponent = ({ children }: any) => {
  const location = useLocation();
  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        timeout={500}
        onEnter={(node: HTMLElement) => {
          gsap.set(node, { autoAlpha: 0 });
          gsap
            .timeline({ paused: true })
            .to(node, { autoAlpha: 1, duration: 0.25 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, { autoAlpha: 0, duration: 0.1 })
            .play();
        }}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
