import { useRef } from "react";

function LyricDisplay({ lyrics, currentTime }) {

  let activeIndex = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].timestamp_seconds) {
      activeIndex = i;
    }
  }

  const lineHeight = 60;
  // approximate height of each lyric line in pixels

  const offset = activeIndex * lineHeight;
  // how far down the active line is from the top

  return (
    <div className="lyric-display">
      <div
        className="lyric-inner"
        style={{
          transform: `translateY(calc(50% - ${offset}px - ${lineHeight / 2}px))`,
          // moves the list up so the active line sits in the center of the box
          transition: "transform 0.5s ease",
          //animation on line change
        }}
      >
        {lyrics.map((line, index) => (
          <p
            key={line.id}
            className={index === activeIndex ? "lyric-line active" : "lyric-line"}
          >
            {line.line_text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default LyricDisplay;