import {
  Listbox,
  Transition,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, ReactNode, Key } from "react";

export function Selector<T extends Key & ReactNode>({
  currentValue,
  handleChange,
  valueRange,
  disabled = false,
}: {
  currentValue: T;
  handleChange: (value: T) => void;
  valueRange: T[];
  disabled?: boolean;
}) {
  return (
    <Listbox value={currentValue} onChange={handleChange} disabled={disabled}>
      <div className="relative max-w-18">
        <ListboxButton className="text-indigo-500 font-bold relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{currentValue}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-indigo-500"
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
            {valueRange.map((bs) => (
              <ListboxOption
                key={bs}
                className={({ active }: { active: boolean }) =>
                  `relative cursor-default select-none py-2 pl-9  ${
                    active ? "bg-indigo-200 text-indigo-500" : "text-gray-900"
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
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
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
    </Listbox>
  );
}
