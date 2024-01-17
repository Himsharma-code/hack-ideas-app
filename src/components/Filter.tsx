import { useState } from "react";
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";

interface FilterProps {
  filters: { label: string; value: string }[];
  handleApply: (options: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, handleApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    setSelectedFilters([value]);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Button> Filter</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <div className=" flex flex-col">
            {filters.map((filter) => (
              <Checkbox
                key={filter.value}
                isSelected={!!selectedFilters.includes(filter.value)}
                onChange={(e) => {
                  console.log("e", e);
                  handleCheckboxChange(filter.value);
                }}
              >
                {filter.label}
              </Checkbox>
            ))}
          </div>

          <div className="mt-4">
            <Button onClick={() => setSelectedFilters([])}>Clear</Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                handleApply(selectedFilters);
              }}
              className="ml-2"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
