import { useEffect, useRef, useState } from "react";
import { currentGenerationDoc } from "../firebase/firestore";
import Grid from "../game/grid";
import styles from "../styles/Board.module.css";
import { getRandomColor } from "../utils/getRandomColor";
import { useDocumentData } from "react-firebase-hooks/firestore";

const useWindowSize = (rows: number) => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    setSize(window.innerHeight / rows);
  }, [rows]);
  return size;
};

const Board = () => {
  const gridRef = useRef(new Grid([[]]));
  const size = useWindowSize(gridRef.current.rowsCount);
  const [iterationHash, setIterationHash] = useState(gridRef.current.iteration);

  const [value, loading, error] = useDocumentData(currentGenerationDoc as any, {
    transform: (val) => JSON.parse(val.data),
  });

  if (!loading && !error) {
    gridRef.current = new Grid(value);
  }

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
