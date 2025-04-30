'use client';

import { useEffect, useState } from 'react';

const WORDS = ['興味', '関心', '意欲', '態度', '学習', '生活習慣'];

type Word = {
  id: number;
  text: string;
  left: string;
  top: string;
  direction: 'down' | 'up' | 'left' | 'right';
  glitchType: number;
  fontSize: string;
  opacity: number;
};

export default function FallingWords() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const directions: Array<'down' | 'up' | 'left' | 'right'> = ['down', 'up', 'left', 'right'];
            const newWord: Word = {
        id: Date.now(),
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        left: `${Math.random() * 120 - 10}%`, // 画面外 (-10%〜110%) に配置
        top: `${Math.random() * 120 - 10}%`, // 画面外 (-10%〜110%) に配置
direction: directions[Math.floor(Math.random() * directions.length)],
        glitchType: Math.floor(Math.random() * 3),
        fontSize: `${Math.random() * (4 - 0.8) + 0.8}rem`, // ランダムなフォントサイズ (0.8rem〜4rem)
        opacity: Math.random() * (1 - 0.3) + 0.3, // ランダムな透明度 (0.3〜1)
      };

      setWords((prev) => [...prev, newWord].slice(-30)); // 最大50個保持
    }, 1000); // 0.5秒ごとに追加

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {words.map(({ id, text, left, top, direction, glitchType, fontSize, opacity }) => (
        <div
          key={id}
          className={`falling-word flicker-text text-white font-bold ${getGlitchClass(glitchType)}`}
          style={{
            left,
            top,
            fontSize,
            opacity,
            animation: `${getAnimation(direction)}, fadeInOut 5s ease-in-out`,
            writingMode: 'vertical-rl',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}

function getGlitchClass(type: number) {
  switch (type) {
    case 0:
      return 'glitch-a';
    case 1:
      return 'glitch-b';
    case 2:
      return 'glitch-c';
    default:
      return '';
  }
}

function getAnimation(direction: 'down' | 'up' | 'left' | 'right') {
  switch (direction) {
    case 'down':
      return 'moveDown 5s linear infinite';
    case 'up':
      return 'moveUp 10s linear infinite';
    case 'left':
      return 'moveLeft 5s linear infinite';
    case 'right':
      return 'moveRight 8s linear infinite';
    default:
      return '';
  }
}
