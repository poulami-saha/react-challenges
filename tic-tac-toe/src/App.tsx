import { useEffect, useState } from "react";
import { Box } from "./model/Box";
import "./App.css";

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

const defaultValue = new Array(9).fill({
  value: undefined,
  isActive: true,
  index: undefined,
});

const App = () => {
  const [boxes, setBoxes] = useState(defaultValue);
  const [winner, setWinner] = useState(false);
  const [turnO, setTurnO] = useState(false);

  const clickHandler = (index: number) => {
    const box: Box = {
      value: turnO ? "O" : "X",
      isActive: false,
      index: index,
    };
    boxes[index] = box;
    setBoxes([...boxes]);
    setTurnO((turnO) => !turnO);
  };

  const defaultValueSet = (boxes: Box[]) => {
    return boxes.map((_) => {
      return {
        isActive: true,
        value: undefined,
        index: undefined,
      };
    });
  };
  const resetGame = () => {
    setWinner(false);
    setBoxes((boxes) => defaultValueSet(boxes));
    setTurnO(false);
  };

  useEffect(() => {
    for (let pattern of winningPatterns) {
      const pos1 = boxes[pattern[0]].value;
      const pos2 = boxes[pattern[1]].value;
      const pos3 = boxes[pattern[2]].value;
      if (!!pos1 && !!pos2 && !!pos3 && pos1 === pos2 && pos2 === pos3) {
        setWinner(true);
      }
    }
  }, [boxes]);

  return (
    <div className="container">
      <header className="header">Tic-Tac-Toe</header>
      {winner && <p className="winner">The winner is {turnO ? "X" : "O"}</p>}
      <div className="grid">
        {boxes.map((box, index) => {
          return (
            <button
              key={index}
              onClick={() => clickHandler(index)}
              className={"box " + (winner ? "disableGrid" : "")}
              disabled={!box.isActive}
            >
              {box.value}
            </button>
          );
        })}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
