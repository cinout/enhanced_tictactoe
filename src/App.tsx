import { useMemo, useState } from "react";
import { Player } from "./utilities.tsx";
import { Board } from "./components/Board.tsx";
import { History } from "./components/History.tsx";
import { PlayerAnnounce } from "./components/PlayerAnnounce.tsx";
import { BoardSizeSelector } from "./components/BoardSizeSelector.tsx";

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
  let winner: Player | undefined = undefined;
  let winSquares: number[] = [];
  const playerXMoves = new Set(
    currentBoardLayout.filter((_, index) => index % 2 === 0)
  );
  const playerOMoves = new Set(
    currentBoardLayout.filter((_, index) => index % 2 === 1)
  );

  for (const wincase of winningCases) {
    if (wincase.every((pos) => playerXMoves.has(pos))) {
      hasWinner = true;
      winner = Player.X;
      winSquares = wincase;
      break;
    } else if (wincase.every((pos) => playerOMoves.has(pos))) {
      hasWinner = true;
      winner = Player.O;
      winSquares = wincase;
      break;
    }
  }

  const isDrawGame = currentBoardLayout.length === boardSize ** 2 && !hasWinner;

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
    <div className={`w-screen h-screen`}>
      <div
        className={`gradientBackDrop bg-gradient-to-r from-playerX1 to-playerX2 ${
          !isDrawGame && (winner ? winner === Player.X : player === Player.X)
            ? "opacity-100"
            : "opacity-0"
        } `}
      />

      <div
        className={`gradientBackDrop bg-gradient-to-r from-playerO1 to-playerO2 ${
          !isDrawGame && (winner ? winner === Player.O : player === Player.O)
            ? "opacity-100"
            : "opacity-0"
        } `}
      />

      <div
        className={`gradientBackDrop bg-gradient-to-r from-slate-400 to-slate-200 ${
          isDrawGame ? "opacity-100" : "opacity-0"
        } `}
      />

      <div className="flex flex-col items-center justify-center h-full">
        <PlayerAnnounce
          player={player}
          hasWinner={hasWinner}
          winner={winner}
          isDrawGame={isDrawGame}
        />
        <div className="h-[3%]" />
        <History
          currentStep={currentStep}
          allSteps={boardHistory.length}
          onClickRestart={handleClickRestart}
          onClickLeft={handleClickLeft}
          onClickRight={handleClickRight}
          onManualStepChange={handleStepTextChange}
        />
        <div className="h-[5%]" />
        <Board
          boardSize={boardSize}
          currentBoardLayout={currentBoardLayout}
          onAddMove={addMove}
          hasWinner={hasWinner}
          winSquares={winSquares}
        />
      </div>

      <div className="absolute top-0 right-0 mt-6 mr-6">
        <BoardSizeSelector
          boardSize={boardSize}
          onBoardSizeChange={changeBoardSize}
        />
      </div>
    </div>
  );
}

export default App;
