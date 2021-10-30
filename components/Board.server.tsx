import { useEffect, useRef, useState } from "react";
import { getCurrentGeneration } from "../firebase/firestore";
import Grid from "../game/grid";
import styles from "../styles/Board.module.css";
import { getRandomColor } from "../utils/getRandomColor";

const useWindowSize = (rows: number) => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    setSize(window.innerHeight / rows);
  }, [rows]);
  return size;
};

const Board = () => {
  const interval = useRef(0);
  const gridRef = useRef(new Grid([[]]));
  const size = useWindowSize(gridRef.current.rowsCount);
  const [iterationHash, setIterationHash] = useState(gridRef.current.iteration);

  const updateGrid = async () => {
    const data = await getCurrentGeneration();
    console.log(data);
    gridRef.current = new Grid(data);
    setIterationHash(Math.random());
  };

  useEffect(() => {
    updateGrid();
  }, []);

  useEffect(() => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      gridRef.current.nextIteration();
      setIterationHash(gridRef.current.iteration);
    }, 1000) as unknown as number;

    return () => clearInterval(interval.current);
  }, [gridRef]);
  const cells = gridRef.current.grid.flat();
  return (
    <div
      className={styles.grid}
      style={{
        width: size * gridRef.current.columnsCount,
        gridTemplateColumns: `repeat(${gridRef.current.columnsCount}, ${size}px)`,
        gridTemplateRows: `repeat(${gridRef.current.rowsCount}, ${size}px)`,
      }}
    >
      {cells.map((cell, index) => (
        <div
          key={index}
          onClick={() => {
            cell.alive = true;
            setIterationHash(Math.random());
          }}
          className={styles.cell}
          style={{
            left: cell.x * size,
            top: cell.y * size,
            height: size,
            background: cell.alive ? getRandomColor() : "transparent",
          }}
        ></div>
      ))}
    </div>
  );
};
export default Board;
