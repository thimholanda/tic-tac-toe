"use client";

import { Reducer, useEffect, useReducer, useState } from "react";
import ButtonBoard from "./ButtonBoard";
import styles from "./styles.module.sass";
import { GrRadial } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { IoRefreshCircleOutline } from "react-icons/io5";

type ScoreState = {
  a: number;
  b: number;
};

type ActionProps = {
  type: "addToA" | "addToB";
};

const reducer = (state: ScoreState, action: ActionProps) => {
  switch (action.type) {
    case "addToA":
      return { ...state, a: state.a + 1 };
    case "addToB":
      return { ...state, b: state.b + 1 };
    default:
      return state;
  }
};

const BoardTable = () => {
  const [positionsBoard, setPositionsBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [userData, setUserData] = useState<{ a: number[]; b: number[] }>({ a: [], b: [] });
  const [data, setData] = useState<number[]>([]);
  const [user, setUser] = useState<"a" | "b">("a");
  const [isEnded, setIsEnded] = useState(false);
  const [winnerPosition, setWinnerPosition] = useState("");
  const [winner, setWinner] = useState<"a" | "b" | "">("");
  const [scoreState, dispatchScore] = useReducer(reducer, { a: 0, b: 0 });
  const [lastUserTurn, setLastUserTurn] = useState<"a" | "b">("a");

  const winnerPositions = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const resultMap = [`${styles.resultTraceY} ${styles.resultTraceY}`, `${styles.resultTraceY} ${styles.resultTraceYCenter}`, `${styles.resultTraceY} ${styles.resultTraceYRight}`, `${styles.resultTraceX} ${styles.resultTraceX}`, `${styles.resultTraceX} ${styles.resultTraceXCenter}`, `${styles.resultTraceX} ${styles.resultTraceXBottom}`, `${styles.resultTraceX} ${styles.resultTraceXDiagonalLeft}`, `${styles.resultTraceX} ${styles.resultTraceXDiagonalRight}`];

  const handleClick = (index: number) => {
    setPositionsBoard((prev) => {
      const tempArray = [...prev];
      tempArray[index] = user;
      return [...tempArray];
    });

    if (data.includes(index)) return;

    const userDataTemp = [...userData[user], index];

    setData([...data, index]);

    setUserData((prev) => {
      return { ...prev, [user]: userDataTemp };
    });

    setUser((user) => {
      return user === "a" ? "b" : "a";
    });
  };

  useEffect(() => {
    const resultA = winnerPositions.map((arr) => {
      return arr.every((val) => userData.a.includes(val));
    });

    const resultB = winnerPositions.map((arr) => {
      return arr.every((val) => userData.b.includes(val));
    });

    if (resultA.includes(true)) {
      console.log("a");
      setWinnerPosition(String(resultA.indexOf(true)));
      dispatchScore({ type: "addToA" });
      setWinner("a");
      setIsEnded(true);
    }

    if (resultB.includes(true)) {
      console.log("b");
      dispatchScore({ type: "addToB" });
      setWinnerPosition(String(resultB.indexOf(true)));
      setWinner("b");
      setIsEnded(true);
    }

    if (data.length === 9) {
      console.log("end");
      setIsEnded(true);
      //   handleResetGame();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, data]);

  const handleResetGame = () => {
    setPositionsBoard(["", "", "", "", "", "", "", "", ""]);
    setLastUserTurn((prev) => {
      return prev === "a" ? "b" : "a";
    });
    setUserData({ a: [], b: [] });
    setIsEnded(false);
    setData([]);
    setWinnerPosition("");
    setWinner("");
  };

  return (
    <>
      <div className={`${styles.boardContainer}`}>
        {!isEnded && (
          <h1>
            <span>
              <strong>Current player:</strong>
            </span>{" "}
            {(user === "a" && <AiOutlineClose size="38" />) || (user === "b" && <GrRadial />)}
          </h1>
        )}
        {!!isEnded && (
          <button className={styles.buttonReset} onClick={handleResetGame} type="button">
            <IoRefreshCircleOutline /> <span>Restart game</span>
          </button>
        )}
        {!!isEnded && !!winner && (
          <span className={styles.result}>
            <strong>Winner:</strong> {(winner === "a" && <AiOutlineClose />) || (winner === "b" && <GrRadial />)}
          </span>
        )}
        <span>{!!isEnded && !winner && `Tied`}</span>
        <h2>
          <AiOutlineClose size="30" />
          <span style={{ marginRight: 50 }} className={styles.scoreWrap}>
            {scoreState.a}
          </span>
          <GrRadial />
          <span className={styles.scoreWrap} style={{ marginLeft: 5 }}>
            {scoreState.b}
          </span>
        </h2>
        <div className={styles.positionBoard}>
          {!!winnerPosition && <div className={`${resultMap[parseInt(winnerPosition)]}`}></div>}

          {positionsBoard.map((value, index) => (
            <ButtonBoard
              style={{ color: "black" }}
              isActive={!!value}
              disabled={!!value || !!isEnded}
              onClick={() => {
                handleClick(index);
              }}
              key={index}
            >
              {(value === "a" && <AiOutlineClose size="38" />) || (value === "b" && <GrRadial />)}
            </ButtonBoard>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardTable;
