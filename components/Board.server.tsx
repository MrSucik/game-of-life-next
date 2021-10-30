import { useEffect, useRef, useState } from "react";
import { currentGenerationDoc } from "../firebase/firestore";
import Grid from "../game/grid";
import styles from "../styles/Board.module.css";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { initGameUpdate } from "../firebase/functions";
import Cell from "./Cell.client";
import GameCell from "../game/cell";

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

  const [value, loading, error] = useDocumentData(currentGenerationDoc as any, {
    transform: (val) => JSON.parse(val.data),
  });

  useEffect(() => {
    initGameUpdate();
    const interval = setInterval(() => {
      initGameUpdate();
    }, 59);
    return clearInterval(interval);
  }, []);

  if (!loading && !error) {
    gridRef.current = new Grid(value);
  }
  const cells = gridRef.current.grid.flat();
  const createCellClickHandler = (cell: GameCell) => () => {
    cell.alive = !cell.alive;
    const data = gridRef.current.exportAsDefinition();
    currentGenerationDoc.update({ data: JSON.stringify(data) });
  };
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
        <Cell
          key={index}
          cell={cell}
          size={size}
          onClick={createCellClickHandler(cell)}
        />
      ))}
    </div>
  );
};
export default Board;
