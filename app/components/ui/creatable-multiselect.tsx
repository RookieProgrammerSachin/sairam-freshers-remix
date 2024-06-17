import { useState } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";

export function MultiSelectCreatable({
  inputFieldName,
  //   value,
  //   setValue,
}: {
  inputFieldName: string;
  //   value: string[];
  //   setValue: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch("");

    if (val === "$create") {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
    } else {
      setValue((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      );
    }
  };

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = data
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <>
      <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
        withArrow
        arrowSize={16}
        shadow="xl"
      >
        <Combobox.DropdownTarget>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  //   name={inputFieldName}
                  placeholder="Add guests"
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                    if (
                      event.key === "Enter" &&
                      !exactOptionMatch &&
                      search.trim().length > 0
                    ) {
                      event.preventDefault();
                      handleValueSelect("$create");
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}

            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                + Create {search}
              </Combobox.Option>
            )}

            {exactOptionMatch &&
              search.trim().length > 0 &&
              options.length === 0 && (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {/* Somehow break head to use this trick as in :
        https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/components/MultiSelect/MultiSelect.tsx#L434
        EDIT: figured it out, probably delete comment
      */}
      <Combobox.HiddenInput
        name={inputFieldName}
        valuesDivider={","}
        value={value}
        // form={form}
        // {...hiddenInputProps}
      />
    </>
  );
}
