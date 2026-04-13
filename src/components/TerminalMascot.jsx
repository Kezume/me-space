import React, { useState, useEffect } from 'react';

const TerminalMascot = () => {
  const [position, setPosition] = useState(-100);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [frame, setFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Movement logic
    const moveTimer = setInterval(() => {
      if (!isHovered) {
        setPosition((prevPos) => {
          let newPos = prevPos + (direction * 1.5); // Speed
          
          // Turn around at screen edges
          if (newPos > windowWidth - 80) {
            setDirection(-1);
            newPos = windowWidth - 80;
          } else if (newPos < 0) {
            setDirection(1);
            newPos = 0;
          }
          return newPos;
        });
      }
    }, 30);

    // Animation logic
    const animTimer = setInterval(() => {
      if (!isHovered) {
        setFrame((f) => (f + 1) % 2);
      }
    }, 300);

    return () => { clearInterval(moveTimer); clearInterval(animTimer); };
  }, [direction, isHovered, windowWidth]);

  // Frame 1: Kaki terentang
  const frame1 = `
 /\\_/\\
( o.o )
 > ^ <
`;

  // Frame 2: Kaki tertutup (sedang melangkah)
  const frame2 = `
 /\\_/\\
( -.- )
  > < 
`;

  // Frame Hover: Terkejut / Duduk manis
  const frameHover = `
 /\\_/\\
( !.! )
 ( m m )
`;

  return (
    <div 
      className="fixed bottom-0 z-[100] cursor-pointer transition-transform ease-linear"
      style={{ 
        transform: `translateX(${position}px) scaleX(${direction === -1 ? -1 : 1})`,
        left: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Label kecil di atas karakter */}
        <div 
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] bg-primary text-[#050A15] px-1 py-0.5 font-bold uppercase whitespace-nowrap opacity-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0, transform: `scaleX(${direction === -1 ? -1 : 1}) translateX(${direction === -1 ? '50%' : '-50%'})` }}
        >
          Meow_Process
        </div>

        {/* Karakter ASCII */}
        <pre className="text-primary font-mono font-bold text-[10px] leading-[10px] m-0 p-0 drop-shadow-[0_0_5px_#4edea3]">
          {isHovered ? frameHover : (frame === 0 ? frame1 : frame2)}
        </pre>
        
        {/* Shadow di bawah karakter */}
        <div className="w-8 h-1 bg-primary/20 rounded-[100%] absolute -bottom-1 left-1/2 -translate-x-1/2 blur-[2px]"></div>
      </div>
    </div>
  );
};

export default TerminalMascot;
