"use client";

import { useEffect, useState } from "react";

type IntroAnimationProps = {
  onComplete: () => void;
};

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 7000);
    const completeTimer = setTimeout(() => {
      onComplete();
      window.dispatchEvent(new Event("introComplete"));
    }, 7700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <>
      <style>{`
        .intro-container {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: linear-gradient(to top, #101010 0%, #050505 28%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.7s ease-in, visibility 0.7s;
        }

        .intro-container.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        .intro-svg {
          width: min(90vw, 900px);
          height: auto;
          overflow: visible;
        }

        /* SCENE 2: LIGHT FLOURISH */
        .flourish-path {
          fill: none;
          stroke: url(#flourishGradient);
          stroke-width: 1.2;
          stroke-linecap: round;
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
          filter: drop-shadow(0 0 4px white);
          animation: 
            flourishDraw 1.3s ease-out 1.2s forwards,
            flourishFade 0.5s ease-in 2.7s forwards;
        }
        
        .flourish-two {
          animation-delay: 1.35s, 2.7s;
          opacity: 0.5;
          stroke-width: 0.8;
        }

        @keyframes flourishDraw {
          0% { opacity: 0; stroke-dashoffset: 1500; }
          15% { opacity: 1; }
          100% { opacity: 1; stroke-dashoffset: 0; }
        }

        @keyframes flourishFade {
          to { opacity: 0; }
        }

        /* SCENE 3 & 4: FRAGMENT FORMATION & SOLID TEXT */
        .letter-stroke {
          fill: none;
          stroke: rgba(220, 220, 220, 0.4);
          stroke-width: 1.5;
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
          opacity: 0;
          animation: strokeAssemble 2.1s cubic-bezier(0.65, 0, 0.35, 1) 2.2s forwards;
        }

        @keyframes strokeAssemble {
          0% { opacity: 0; stroke-dashoffset: 1500; }
          10% { opacity: 1; }
          70% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; } /* Fades out as solid text appears */
        }

        .final-text {
          fill: #f4f1ed;
          font-family: 'Bodoni Moda', 'Didot', 'Bodoni MT', serif;
          font-size: 140px;
          font-weight: 400;
          letter-spacing: 8px;
          opacity: 0;
          animation: 
            textReveal 0.8s ease-in 3.2s forwards,
            textGlow 1.3s ease-in-out 4.5s forwards,
            textDisassemble 1s ease-in 5.8s forwards;
        }

        @keyframes textReveal {
          from { opacity: 0; filter: drop-shadow(0 0 0px white); }
          to { opacity: 1; filter: drop-shadow(0 0 6px rgba(255,255,255,0.3)); }
        }

        /* SCENE 5: LIGHT SWEEP */
        @keyframes textGlow {
          0% { filter: drop-shadow(0 0 4px rgba(255,255,255,0.3)); fill: #f4f1ed; }
          45% { filter: drop-shadow(0 0 15px white) drop-shadow(0 0 30px rgba(255,255,255,0.8)); fill: #ffffff; }
          100% { filter: drop-shadow(0 0 4px rgba(255,255,255,0.3)); fill: #f4f1ed; }
        }

        /* SCENE 6: DISASSEMBLY */
        @keyframes textDisassemble {
          0% { opacity: 1; filter: drop-shadow(0 0 5px white); transform: translateY(0); }
          45% { opacity: 0.8; filter: drop-shadow(0 0 2px white); transform: translateY(-2px); }
          100% { opacity: 0; filter: blur(5px); transform: translateY(-10px); }
        }

        /* The overlay stroke that draws OUT during disassembly */
        .disassemble-stroke {
          fill: none;
          stroke: white;
          stroke-width: 1;
          stroke-dasharray: 1500;
          stroke-dashoffset: 0;
          opacity: 0;
          animation: strokeDisassemble 1s ease-in 5.8s forwards;
        }

        @keyframes strokeDisassemble {
          0% { opacity: 1; stroke-dashoffset: 0; }
          100% { opacity: 0; stroke-dashoffset: -1500; }
        }

      `}</style>

      <div className={`intro-container ${isFading ? "fade-out" : ""}`}>
        <svg className="intro-svg" viewBox="0 0 800 200">
          <defs>
            <linearGradient id="flourishGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* SCENE 2: FLOURISH */}
          <path className="flourish-path" d="M 150,130 C 250,130 280,40 400,40 C 520,40 550,130 650,130" />
          <path className="flourish-path flourish-two" d="M 100,140 C 220,140 250,50 400,50 C 550,50 580,140 700,140" />

          {/* SCENE 3: FRAGMENT ASSEMBLY (Strokes drawing the letters) */}
          <text className="letter-stroke" x="50%" y="55%" textAnchor="middle" dominantBaseline="middle">
            DAPHNE
          </text>

          {/* SCENE 6: DISASSEMBLY (Strokes breaking apart) */}
          <text className="disassemble-stroke" x="50%" y="55%" textAnchor="middle" dominantBaseline="middle">
            DAPHNE
          </text>

          {/* SCENE 4 & 5: THE SOLID TEXT & LIGHT SWEEP */}
          <text className="final-text" x="50%" y="55%" textAnchor="middle" dominantBaseline="middle">
            DAPHNE
          </text>
        </svg>
      </div>
    </>
  );
}