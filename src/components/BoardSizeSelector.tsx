// Board Size Selector Dropdown
import { boardSizeRange } from "../utilities.tsx";
import { Selector } from "./shared/Selector.tsx";

export function BoardSizeSelector({
  boardSize,
  onBoardSizeChange,
}: {
  boardSize: number;
  onBoardSizeChange: (bs: number) => void;
}) {
  return (
    <div className="flex flex-row items-center">
      <label htmlFor="boardSizeDropDown" className="text-white font-[500] mr-3">
        Board Size
      </label>

      {/* <select
        id="boardSizeDropDown"
        value={boardSize}
        onChange={(e) => onBoardSizeChange(Number(e.target.value))}
      >
        {boardSizeRange.map((bs) => (
          <option key={bs} value={bs}>
            {bs}
          </option>
        ))}
      </select> */}

      <div className="inline-block">
        <Selector
          currentValue={boardSize}
          handleChange={onBoardSizeChange}
          valueRange={boardSizeRange}
        />
        {/* <Listbox value={boardSize} onChange={onBoardSizeChange}>
          <div className="relative mt-1">
            <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{boardSize}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {boardSizeRange.map((bs) => (
                  <ListboxOption
                    key={bs}
                    className={({ active }: { active: boolean }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={bs}
                  >
                    {({ selected }: { selected: boolean }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {bs}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </Listbox> */}
      </div>
    </div>
  );
}
