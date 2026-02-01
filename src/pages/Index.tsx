import { useState, useRef, useCallback } from "react";

const ROMANTIC_GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWRiMWZqd2N4Y3RpbDVtZnVyN2RqMGR0cXFtYWRnZGNyc3VoYjVtaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3V0j3ytFyGHqiV7W/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXFoOGp0ZnU1OXFudjE2dDI2d2VwNXd0aHRjdWFiZmJhZGNhOWo4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHNmcnQ0dGNtOHQ5NWlnbmR1emxzMmZiYjJ0MHoyeHN6ZGt5dXN1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHWXddcCOGZNmFO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbThhZWJ1dGsycmozd3BjZm9zaWUzYjg5cjV0cGZhZW44d2R2cDQ2eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeMA62E1XIlqVb2/giphy.gif",
];

const FloatingHeart = ({ delay, left }: { delay: number; left: number }) => (
  <div
    className="absolute text-4xl opacity-30 animate-float pointer-events-none"
    style={{
      left: `${left}%`,
      animationDelay: `${delay}s`,
      top: `${Math.random() * 60 + 10}%`,
    }}
  >
    💕
  </div>
);

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: newX, y: newY });
    setHasMoved(true);
  }, []);

  const randomGif = ROMANTIC_GIFS[Math.floor(Math.random() * ROMANTIC_GIFS.length)];

  const floatingHearts = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 0.5,
    left: (i * 12) + 5,
  }));

  if (accepted) {
    return (
      <div className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {floatingHearts.map((heart, i) => (
          <FloatingHeart key={i} {...heart} />
        ))}
        
        <div className="text-center z-10">
          <h1 className="font-romantic text-7xl md:text-9xl text-primary animate-pulse-heart mb-8">
            Yay! 💕
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-medium">
            I knew you'd say yes! 🥰
          </p>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto border-4 border-primary/20">
            <img
              src={randomGif}
              alt="Romantic celebration"
              className="w-full h-auto"
            />
          </div>
          
          <p className="mt-8 text-lg text-muted-foreground font-medium">
            Happy Valentine's Day, my love! ❤️
          </p>
        </div>

        {/* Confetti hearts */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-confetti pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {['💕', '❤️', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-romantic flex flex-col items-center justify-center p-8 relative overflow-hidden"
    >
      {floatingHearts.map((heart, i) => (
        <FloatingHeart key={i} {...heart} />
      ))}

      <div className="text-center z-10 max-w-2xl">
        <div className="mb-4 text-6xl animate-pulse-heart">💕</div>
        
        <h1 className="font-romantic text-5xl md:text-7xl lg:text-8xl text-primary mb-12 leading-tight">
          Will you be my Valentine?
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
          <button
            onClick={() => setAccepted(true)}
            className="btn-romantic text-xl md:text-2xl min-w-[140px]"
          >
            Yes 💕
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            className="btn-secondary-romantic text-xl md:text-2xl min-w-[140px] transition-transform duration-200"
            style={{
              transform: hasMoved
                ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
                : 'none',
              position: hasMoved ? 'absolute' : 'relative',
            }}
          >
            No 😢
          </button>
        </div>

        {hasMoved && (
          <p className="mt-16 text-muted-foreground text-sm font-medium animate-fade-in">
            Hehe, you can't click No! 😏
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
