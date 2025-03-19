
import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  values: Option[];
  onChange: (values: Option[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  values,
  onChange,
  placeholder = "Select...",
  disabled = false,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (option: Option) => {
    onChange(values.filter((value) => value.value !== option.value));
  };

  const handleSelect = (option: Option) => {
    if (values.some((value) => value.value === option.value)) {
      onChange(values.filter((value) => value.value !== option.value));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <Command
      className="overflow-visible bg-transparent"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
        }
      }}
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {values.map((option) => (
            <Badge key={option.value} variant="secondary" className="rounded">
              {option.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleUnselect(option)}
                disabled={disabled}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Remove {option.label}</span>
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={values.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && options.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto max-h-[200px]">
              {options
                .filter((option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((option) => {
                  const isSelected = values.some(
                    (value) => value.value === option.value
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option)}
                      className={`flex items-center gap-2 ${
                        isSelected ? "bg-muted" : ""
                      }`}
                    >
                      <div
                        className={`border rounded-sm w-4 h-4 flex items-center justify-center ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {isSelected && (
                          <X className="h-3 w-3 text-primary-foreground" />
                        )}
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
