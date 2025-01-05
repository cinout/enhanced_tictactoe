import { Player } from "../utilities.tsx";

const textGradient = {
  [Player.X]: "from-playerX1 to-playerX2",
  [Player.O]: "from-playerO1 to-playerO2",
};

// Individual Square
function Square({
  occupiedBy,
  pos,
  onAddMove,
  hasWinner,
  showAnimation,
}: {
  occupiedBy: Player | undefined;
  pos: number;
  onAddMove: (pos: number) => void;
  hasWinner: boolean;
  showAnimation: boolean;
}) {
  const disabled = occupiedBy !== undefined || hasWinner;

  return (
    <button
      className={`text-4xl h-full w-full border-[1px] border-slate-500 bg-[#faebd7] font-black disabled:cursor-not-allowed transition ease-in-out duration-150 not-disabled:hover:scale-110 not-disabled:hover:border-slate-400 not-disabled:hover:bg-[#f2e2ce]`}
      onClick={() => onAddMove(pos)}
      disabled={disabled}
    >
      {occupiedBy && (
        <span
          className={`text-transparent bg-gradient-to-tr	${
            occupiedBy && textGradient[occupiedBy]
          } [-webkit-background-clip:text] ${
            showAnimation && "animate-winnerJump"
          }`}
        >
          {occupiedBy}
        </span>
      )}
    </button>
  );
}

// Board = 9 * Square
export function Board({
  boardSize,
  currentBoardLayout,
  onAddMove,
  hasWinner,
  winSquares,
}: {
  onAddMove: (pos: number) => void;
  boardSize: number;
  currentBoardLayout: number[];
  hasWinner: boolean;
  winSquares: number[];
}) {
  const board = Array.from({ length: boardSize ** 2 });

  const boardGemotry: Record<number, string> = {
    3: "grid-cols-3 grid-rows-3 w-[calc(3*70px)] h-[calc(3*70px)]",
    4: "grid-cols-4 grid-rows-4 w-[calc(4*70px)] h-[calc(4*70px)]",
    5: "grid-cols-5 grid-rows-5 w-[calc(5*70px)] h-[calc(5*70px)]",
    6: "grid-cols-6 grid-rows-6 w-[calc(6*70px)] h-[calc(6*70px)]",
    7: "grid-cols-7 grid-rows-7 w-[calc(7*70px)] h-[calc(7*70px)]",
  };

  return (
    <div
      className={`grid bg-gradient-to-tr from-indigo-200/60 to-indigo-100/60 justify-center items-center p-2.5 ${boardGemotry[boardSize]} rounded-xl`}
    >
      {/* <div className={styles[`board_size_${boardSize}`]}> */}
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
            showAnimation={winSquares?.includes(pos)}
          />
        );
      })}
    </div>
  );
}
