import { Selector } from "./shared/Selector";

function Button({
  onClick,
  disabled,
  text,
}: {
  onClick: () => void;
  disabled: boolean;
  text: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-fit h-9 bg-indigo-50 text-indigo-400 rounded-md py-0.5 px-2 border-2 border-indigo-400 disabled:bg-stone-400/70  disabled:text-slate-300 disabled:cursor-not-allowed disabled:border-slate-300"
    >
      {text}
    </button>
  );
}

// Game History
export function History({
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
    <div>
      <div className="text-center mb-5">
        <Button
          onClick={onClickRestart}
          text="New Game!"
          disabled={allSteps === 0}
        />
      </div>

      <div className="flex flex-row justify-center mb-2">
        <Button
          onClick={onClickLeft}
          text="Back"
          disabled={currentStep === 0}
        />

        <div className="inline-block ml-2 mr-2">
          <Selector
            currentValue={currentStep}
            handleChange={onManualStepChange}
            valueRange={Array.from({ length: allSteps + 1 }).map(
              (_, index) => index
            )}
            disabled={allSteps === 0}
          />
        </div>

        <Button
          onClick={onClickRight}
          text="Next"
          disabled={currentStep === allSteps}
        />
      </div>
    </div>
  );
}
