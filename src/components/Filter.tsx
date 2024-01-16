import { useState } from "react";
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

interface FilterProps {
  filters: { label: string; value: string }[];
  handleApply: (options: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, handleApply }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    setSelectedFilters((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((filter) => filter !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button> Filter</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <h3 className="mb-2">Filters</h3>
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
          <div className="mt-4">
            <Button onClick={() => setSelectedFilters([])}>Clear</Button>
            <Button
              onClick={() => handleApply(selectedFilters)}
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
