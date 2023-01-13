import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import type {
  FieldPath,
  UseFormSetValue,
  FieldPathValue,
  FieldValues,
} from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  setValue: UseFormSetValue<T>;
  options: { value: string }[];
  label?: string;
}

export default function Select<T extends FieldValues>({
  name,
  setValue,
  options,
  label,
}: SelectProps<T>) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    if (selected !== undefined)
      setValue(name, selected as FieldPathValue<T, FieldPath<T>>);
  }, [selected, name, setValue]);

  return (
    <div>
      <label className="text-14 leading-8">{label}</label>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative text-12">
          <Listbox.Button className="relative w-full h-[52px] cursor-default rounded-[4px]  border border-[#DBDBDB] focus-visible:border-[#DBDBDB]">
            <div className="text-left p-3">{selected.value}</div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full rounded-md ">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `first:rounded-t-[4px] last:rounded-b-[4px] relative flex items-center p-3 border h-[52px] bg-white border-[#DBDBDB] ${
                      active ? 'font-semibold' : ''
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.value}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
