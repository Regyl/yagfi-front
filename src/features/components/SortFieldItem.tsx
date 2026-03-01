import React from "react";
import { Trash2 } from "lucide-react";
import { Order } from "@/types";
import { SORT_FIELDS, SORT_TYPES } from "@/shared/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

interface SortFieldItemProps {
  order: Order;
  index: number;
  onFieldChange: (field: string) => void;
  onTypeChange: (type: "asc" | "desc") => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function SortFieldItem({
  order,
  index,
  onFieldChange,
  onTypeChange,
  onRemove,
  canRemove,
}: SortFieldItemProps) {
  const { t } = useTranslation();
  return (
    <div className="flex w-full max-w-[220px] flex-col gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <Badge
          variant="secondary"
          className="size-8 shrink-0 justify-center p-0 font-medium"
        >
          {index + 1}
        </Badge>
        {canRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="size-8 text-muted-foreground hover:text-destructive"
            aria-label={`Remove sort field ${index + 1}`}
          >
            <Trash2 className="size-4" aria-hidden />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`sort-field-${index}`}>{t("sort.field")}</Label>
        <Select value={order.field} onValueChange={onFieldChange}>
          <SelectTrigger id={`sort-field-${index}`} className="h-9 w-full">
            <SelectValue placeholder="Field" />
          </SelectTrigger>
          <SelectContent>
            {SORT_FIELDS.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {t(f.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`sort-order-${index}`}>{t("sort.order")}</Label>
        <Select
          value={order.type}
          onValueChange={(v) => onTypeChange(v as "asc" | "desc")}
        >
          <SelectTrigger id={`sort-order-${index}`} className="h-9 w-full">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            {SORT_TYPES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {t(s.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
