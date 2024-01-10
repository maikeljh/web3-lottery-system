import { stagger, useAnimate, animate, motion } from "framer-motion";
import { useState } from "react";

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const onButtonClick = () => {
    setIsOpen(!isOpen)
    const sparkles = Array.from({ length: 20 });
    const sparklesAnimation: AnimationSequence = isOpen
    ? [] : sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-200, 200),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 3.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const sparklesFadeOut: AnimationSequence = isOpen
    ? [] : sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.25,
        at: "<",
      },
    ]);

    const sparklesReset: AnimationSequence = isOpen
    ? [] : sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        border: "2px solid black", // Add black border
        borderRadius: "10px", // Optional: Add border-radius
      }}
    >
      <motion.div
        layout
        data-isOpen={isOpen}
        initial={{ borderRadius: 50 }}
        style={{
          background: "white",
          width: isOpen ? "400px" : "100px",
          height: isOpen ? "200px" : "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid black", // Add black border
          borderRadius: "10px", // Optional: Add border-radius
        }}
        className="parent"
        onClick={onButtonClick}
      >
        <motion.div
          layout
          style={{
            width: "40px",
            height: "40px",
            background: "#f107a3",
            borderRadius: "50%",
          }}
          className="child"
        />
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: "10px" }}
          >
            Hello
          </motion.p>
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 block"
        >
          {Array.from({ length: 25 }).map((_, index) => (
            <svg
              className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
              key={index}
              viewBox="0 0 122 117"
              width="10"
              height="10"
            >
              <path
                className="fill-blue-600"
                d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
              />
            </svg>
          ))}
        </span>
      </motion.div>
    </div>
  );
}

export default App;
