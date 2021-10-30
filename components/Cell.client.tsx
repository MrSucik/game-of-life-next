import styles from "../styles/Board.module.css";
import { getRandomColor } from "../utils/getRandomColor";
import GameCell from "../game/cell";

const Cell: React.FC<{
  cell: GameCell;
  size: number;
  onClick: () => void;
}> = ({ cell, size, children, onClick }) => (
  <div
    onClick={onClick}
    className={styles.cell}
    style={{
      left: cell.x * size,
      top: cell.y * size,
      height: size,
      background: cell.alive ? getRandomColor() : "transparent",
    }}
  >
    {children}
  </div>
);

export default Cell;
