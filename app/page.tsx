'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import FallingWords from './components/FallingWords';
import StaticNoise from './components/GlitchEffect';

function GlitchText({ text }: { text: string }) {
  const rRef = useRef<HTMLSpanElement>(null);
  const gRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomOffset = () => `${(Math.random() * 4 - 2).toFixed(2)}px`;

      if (rRef.current) {
        rRef.current.style.setProperty('--x', randomOffset());
        rRef.current.style.setProperty('--y', randomOffset());
      }
      if (gRef.current) {
        gRef.current.style.setProperty('--x', randomOffset());
        gRef.current.style.setProperty('--y', randomOffset());
      }
      if (bRef.current) {
        bRef.current.style.setProperty('--x', randomOffset());
        bRef.current.style.setProperty('--y', randomOffset());
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-6xl font-bold text-white glitch-text">
      <span className="absolute top-0 left-0 text-red-500 mix-blend-screen" ref={rRef} style={{ transform: 'translate(var(--x), var(--y))' }}>
        {text}
      </span>
      <span className="absolute top-0 left-0 text-green-500 mix-blend-screen" ref={gRef} style={{ transform: 'translate(var(--x), var(--y))' }}>
        {text}
      </span>
      <span className="absolute top-0 left-0 text-blue-500 mix-blend-screen" ref={bRef} style={{ transform: 'translate(var(--x), var(--y))' }}>
        {text}
      </span>
      <span className="relative z-10">{text}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#1a1a1a] flex flex-col relative">
       <StaticNoise />
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <FallingWords />
      </div>

      {/* コンテンツ */}
      <div className="h-screen w-full bg-[#1a1a1a] flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="glitch-text z-2">Hello World</h1>
            <h1 className="glitch-text z-3">Hello World</h1>
            <h1 className="glitch-text z-4">Hello World</h1>
        </div>

          <div className="flex justify-center mt-10">
          <Link
            href="/second"
            className="text-white text-2xl border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition"
          >
            Scroll to Next Page
          </Link>
        </div>
      </div>
    </div>
  );
}
