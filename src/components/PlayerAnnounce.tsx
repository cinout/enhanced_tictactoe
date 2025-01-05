// Player Announcement
import { Player } from "../utilities.tsx";

const textGradient = {
  [Player.X]: "from-playerX1 to-playerX2",
  [Player.O]: "from-playerO1 to-playerO2",
};

function Announcement({
  textLeft,
  textRight,
  animate = false,
}: {
  textLeft: string;
  textRight: Player;
  animate?: boolean;
}) {
  return (
    <>
      <span>{textLeft}</span>
      <span
        className={`text-4xl ml-4 text-transparent bg-gradient-to-tr	${
          textGradient[textRight]
        } [-webkit-background-clip:text] ${animate && "animate-winnerJump"}`}
      >
        {textRight}
      </span>
    </>
  );
}

export function PlayerAnnounce({
  player,
  hasWinner,
  winner,
}: {
  player: Player;
  hasWinner: boolean;
  winner: Player | undefined;
}) {
  return (
    <div className="flex flex-row justify-center items-center text-center mb-4 font-black text-white bg-stone-500/40 w-fit rounded-md py-0.5 px-3">
      {hasWinner ? (
        <Announcement
          textLeft="WE HAVE A WINNER:"
          textRight={winner as Player}
          animate={true}
        />
      ) : (
        <Announcement textLeft="PLAYER:" textRight={player} animate={false} />
      )}
    </div>
  );
}
