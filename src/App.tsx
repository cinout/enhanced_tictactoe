import { useMemo, useState } from "react";
// import "./App.scss";
import styles from "./App.module.scss";

enum Player {
  X = "X",
  O = "O",
}
const boardSizeRange = [3, 4, 5, 6, 7];

// Player Announcement
function PlayerAnnounce({
  player,
  hasWinner,
  winner,
}: {
  player: Player;
  hasWinner: boolean;
  winner: Player | undefined;
}) {
  return (
    <div className={styles.playerAnnounce}>
      {hasWinner ? (
        <>
          <span>WE HAVE A WINNER:</span>
          <span>{winner} !</span>
        </>
      ) : (
        <>
          <span>Next Player:</span>
          <span>{player}</span>
        </>
      )}
    </div>
  );
}

// Individual Square
function Square({
  occupiedBy,
  pos,
  onAddMove,
  hasWinner,
}: {
  occupiedBy: Player | undefined;
  pos: number;
  onAddMove: (pos: number) => void;
  hasWinner: boolean;
}) {
  return (
    <button
      className={styles.square}
      onClick={() => onAddMove(pos)}
      disabled={occupiedBy !== undefined || hasWinner}
    >
      {occupiedBy}
    </button>
  );
}

// Board = 9 * Square
function Board({
  boardSize,
  currentBoardLayout,
  onAddMove,
  hasWinner,
}: {
  onAddMove: (pos: number) => void;
  boardSize: number;
  currentBoardLayout: number[];
  hasWinner: boolean;
}) {
  const board = Array.from({ length: boardSize ** 2 });

  return (
    <div className={styles[`board_size_${boardSize}`]}>
      {board.map((_, pos) => {
        const indexInLayout = currentBoardLayout.indexOf(pos);

        const occupiedBy =
          indexInLayout === -1
            ? undefined
            : indexInLayout % 2 === 0
            ? Player.X
            : Player.O;

        return (
          <Square
            key={pos}
            occupiedBy={occupiedBy}
            pos={pos}
            onAddMove={onAddMove}
            hasWinner={hasWinner}
          />
        );
      })}
    </div>
  );
}

// Game History
function History({
  currentStep,
  allSteps,
  onClickRestart,
  onClickLeft,
  onClickRight,
  onManualStepChange,
}: {
  currentStep: number;
  allSteps: number;
  onClickRestart: () => void;
  onClickLeft: () => void;
  onClickRight: () => void;
  onManualStepChange: (input: number) => void;
}) {
  return (
    <>
      <button onClick={onClickRestart}>Restart</button>
      <div>
        <button onClick={onClickLeft} disabled={currentStep === 0}>
          Left
        </button>

        <select
          id="currentStep"
          value={currentStep}
          onChange={(e) => onManualStepChange(Number(e.target.value))}
          disabled={allSteps === 0}
        >
          {Array.from({ length: allSteps + 1 }).map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>

        <button onClick={onClickRight} disabled={currentStep === allSteps}>
          Right
        </button>
      </div>
    </>
  );
}

// Board Size Selector Dropdown
function BoardSizeSelector({
  boardSize,
  onBoardSizeChange,
}: {
  boardSize: number;
  onBoardSizeChange: (bs: number) => void;
}) {
  return (
    <div>
      <label htmlFor="boardSizeDropDown">Board Size</label>
      <select
        id="boardSizeDropDown"
        value={boardSize}
        onChange={(e) => onBoardSizeChange(Number(e.target.value))}
      >
        {boardSizeRange.map((bs) => (
          <option key={bs} value={bs}>
            {bs}
          </option>
        ))}
      </select>
    </div>
  );
}

// calculate all winning cases
function calculateWinningCases(boardSize: number) {
  const base_range = Array.from({ length: boardSize }, (_, i) => i); // [0, 1, 2] if boardSize is 3
  const winColumn = base_range.map((item) =>
    base_range.map((m) => item + m * boardSize)
  );
  const winRow = base_range.map((item) =>
    base_range.map((m) => item * boardSize + m)
  );
  const winLeftDiag = base_range.map((item) => item * boardSize + item);
  const winRightDiag = base_range.map(
    (item) => item * boardSize + (boardSize - item - 1)
  );

  const winningCases = [...winColumn, ...winRow, winLeftDiag, winRightDiag];
  return winningCases;
}

// default APP
function App() {
  /**
   * Define State Variables
   */
  const [boardSize, setBoardSize] = useState<number>(3); // board size
  const [currentStep, setCurrentStep] = useState<number>(0); // current step
  const [boardHistory, setBoardHistory] = useState<number[]>([]);

  /**
   * Calculate Local Variables
   */
  const winningCases = useMemo(
    () => calculateWinningCases(boardSize),
    [boardSize]
  );
  const player = currentStep % 2 === 0 ? Player.X : Player.O;
  const currentBoardLayout = boardHistory.slice(0, currentStep);

  //  calculate winner
  let hasWinner = false;
  let winner = undefined;
  const playerXMoves = new Set(
    currentBoardLayout.filter((value, index) => index % 2 === 0)
  );
  const playerOMoves = new Set(
    currentBoardLayout.filter((value, index) => index % 2 === 1)
  );

  for (const wincase of winningCases) {
    if (wincase.every((pos) => playerXMoves.has(pos))) {
      hasWinner = true;
      winner = Player.X;
      break;
    } else if (wincase.every((pos) => playerOMoves.has(pos))) {
      hasWinner = true;
      winner = Player.O;
      break;
    }
  }

  /**
   * Called when new move is added
   */
  function addMove(pos: number) {
    setBoardHistory([...currentBoardLayout, pos]);
    setCurrentStep((step) => step + 1);
  }

  /**
   * Called when user choose a different board size
   */
  function changeBoardSize(boardSize: number) {
    setBoardSize(boardSize);
    setCurrentStep(0);
    setBoardHistory([]);
  }

  /**
   * Called when user clicks RESTART button
   */
  function handleClickRestart() {
    setCurrentStep(0);
    setBoardHistory([]);
  }

  /**
   * Called when user clicks Left button
   */

  function handleClickLeft() {
    setCurrentStep((step) => step - 1);
  }
  /**
   * Called when user clicks Right button
   */
  function handleClickRight() {
    setCurrentStep((step) => step + 1);
  }

  /**
   * Called when user manually change the step
   */
  function handleStepTextChange(inputStep: number) {
    setCurrentStep(inputStep);
  }

  return (
    <div className={styles.app}>
      <div className={styles.leftContainer}>
        <PlayerAnnounce player={player} hasWinner={hasWinner} winner={winner} />
        <History
          currentStep={currentStep}
          allSteps={boardHistory.length}
          onClickRestart={handleClickRestart}
          onClickLeft={handleClickLeft}
          onClickRight={handleClickRight}
          onManualStepChange={handleStepTextChange}
        />
        <Board
          boardSize={boardSize}
          currentBoardLayout={currentBoardLayout}
          onAddMove={addMove}
          hasWinner={hasWinner}
        />
      </div>
      <div className={styles.rightContainer}>
        <BoardSizeSelector
          boardSize={boardSize}
          onBoardSizeChange={changeBoardSize}
        />
      </div>
    </div>
  );
}

export default App;
