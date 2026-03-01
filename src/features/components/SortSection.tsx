import React from "react";
import { Plus } from "lucide-react";
import { Order } from "@/types";
import { SortFieldItem } from "./SortFieldItem";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface SortSectionProps {
  sortOrders: Order[];
  onAddSortField: () => void;
  onRemoveSortField: (index: number) => void;
  onSortFieldChange: (index: number, field: string) => void;
  onSortTypeChange: (index: number, type: "asc" | "desc") => void;
}

export function SortSection({
  sortOrders,
  onAddSortField,
  onRemoveSortField,
  onSortFieldChange,
  onSortTypeChange,
}: SortSectionProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          {t("sort.title")}
        </span>
        <Button variant="outline" size="sm" onClick={onAddSortField}>
          <Plus className="size-4" aria-hidden />
          {t("sort.addSortField")}
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {sortOrders.map((order, i) => (
          <SortFieldItem
            key={i}
            order={order}
            index={i}
            onFieldChange={(f) => onSortFieldChange(i, f)}
            onTypeChange={(t) => onSortTypeChange(i, t)}
            onRemove={() => onRemoveSortField(i)}
            canRemove={sortOrders.length > 1}
          />
        ))}
      </div>
      {sortOrders.length > 1 && (
        <p className="mt-3 text-sm text-muted-foreground">
          {t("sort.description")}
        </p>
      )}
    </div>
  );
}
