import type { Category } from "../types/Task";
import { TextAttributes } from "@opentui/core";

interface TabBarProps {
  categories: Category[];
  selected: string;
  onSelect: (categoryId: string) => void;
}

export function TabBar({ categories, selected, onSelect }: TabBarProps) {
  return (
    <box flexDirection="row" gap={2}>
      <tab-select
        options={["Todas", ...categories.map((c) => c.name)]}
        selectedIndex={selected === "all" ? 0 : categories.findIndex((c) => c.id === selected) + 1}
        onChange={(_index, label) => {
          if (label === "Todas") {
            onSelect("all");
          } else {
            const cat = categories.find((c) => c.name === label);
            if (cat) onSelect(cat.id);
          }
        }}
      />
    </box>
  );
}

export function CategoryTabs({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <box flexDirection="row" gap={1}>
      <text
        attributes={selected === "all" ? TextAttributes.BOLD : TextAttributes.DIM}
        onClick={() => onSelect("all")}
      >
        [Todas]
      </text>
      {categories.map((cat) => (
        <text
          key={cat.id}
          attributes={selected === cat.id ? TextAttributes.BOLD : TextAttributes.DIM}
          onClick={() => onSelect(cat.id)}
        >
          [{cat.name}]
        </text>
      ))}
    </box>
  );
}