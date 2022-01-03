import { useState } from "react";
import { AiOutlinePlaySquare, AiOutlinePauseCircle } from "react-icons/ai";
import { CgShapeSquare } from "react-icons/cg";

const buttonStyle: React.CSSProperties = {
  position: "relative",
  top: "80px",
  margin: "20px", // Why more than 20px messes up the button position?
};

export const Timer = () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const playClick = () => {
    setIntervalId(
      setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000)
    );
  };

  const pauseClick = () => {
    clearInterval(intervalId as unknown as number); //parameter type of clearInterval and return type of setInterval is not same.
    setIntervalId(null);
  };

  const stopClick = () => {
    clearInterval(intervalId as unknown as number);
    setIntervalId(null);
    setTime(0);
  };

  const timeToMinute = (time: number) => {
    if (time / 60 < 10) {
      return `0${Math.floor(time / 60)}`;
    } else {
      return `${Math.floor(time / 60)}`;
    }
  };

  const timeToSecond = (time: number) => {
    if (time % 60 < 10) {
      return `0${time % 60}`;
    } else {
      return `${time % 60}`;
    }
  };

  return (
    <div
      style={{
        border: "2px solid",
        width: "600px",
        height: "400px",
        margin: "auto",
      }}
    >
      <div
        style={{
          border: "4px solid lightblue",
          width: "400px",
          height: "140px",
          margin: "auto",
          fontSize: "80px",
          position: "relative",
          top: "10px",
        }}
      >
        <div
          style={{
            position: "relative",
            top: "10px",
            margin: "auto",
          }}
        >
          {timeToMinute(time)} : {timeToSecond(time)}
        </div>
        <span style={buttonStyle} onClick={playClick}>
          <AiOutlinePlaySquare size="5rem" />
        </span>
        <span style={buttonStyle} onClick={pauseClick}>
          <AiOutlinePauseCircle size="5rem" />
        </span>
        <span style={buttonStyle} onClick={stopClick}>
          <CgShapeSquare size="5rem" />
        </span>
      </div>
    </div>
  );
};

export {};
