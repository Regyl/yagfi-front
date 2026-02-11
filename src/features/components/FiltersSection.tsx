import React, {useState} from 'react';
import {Loader2, Plus, X} from 'lucide-react';
import {StarsFilter} from '../../types';
import {STARS_OPERATORS} from '../../shared/constants';
import {useLanguages} from '../hooks';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Popover, PopoverContent, PopoverTrigger,} from '@/components/ui/popover';
import {Checkbox} from '@/components/ui/checkbox';

interface FiltersSectionProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  starsFilter: {value: number; operator: StarsFilter['operator']} | null;
  onStarsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStarsOperatorChange: (value: StarsFilter['operator']) => void;
  onRemoveStarsFilter: () => void;
  onAddStarsFilter: () => void;
}

export function FiltersSection({
  selectedLanguages,
  onLanguagesChange,
  starsFilter,
  onStarsValueChange,
  onStarsOperatorChange,
  onRemoveStarsFilter,
  onAddStarsFilter,
}: FiltersSectionProps) {
  const {languages, loading} = useLanguages();
  const [langOpen, setLangOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const filtered = languages
    .filter((l) => l?.trim())
    .filter((l) => !filter || l.toLowerCase().startsWith(filter.toLowerCase()));

  const toggleLang = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      onLanguagesChange(selectedLanguages.filter((x) => x !== lang));
    } else {
      onLanguagesChange([...selectedLanguages, lang]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="min-w-[200px]">
        <Label className="mb-2 block">Languages</Label>
        <Popover open={langOpen} onOpenChange={setLangOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal"
            >
              {selectedLanguages.length === 0
                ? 'All languages'
                : `${selectedLanguages.length} selected`}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
            <div className="p-2">
              <Input
                placeholder="Filter..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-8"
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                filtered.map((lang) => (
                  <label
                    key={lang}
                    className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <Checkbox
                      checked={selectedLanguages.includes(lang)}
                      onCheckedChange={() => toggleLang(lang)}
                    />
                    {lang}
                  </label>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label className="mb-2 block">Filter by Stars:</Label>
        {starsFilter ? (
          <div className="flex flex-wrap items-center gap-4">
            <Select
              value={starsFilter.operator}
              onValueChange={onStarsOperatorChange}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Operator" />
              </SelectTrigger>
              <SelectContent>
                {STARS_OPERATORS.map((op) => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Stars"
              value={starsFilter.value}
              onChange={onStarsValueChange}
              className="h-8 w-[120px]"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemoveStarsFilter}
              className="size-8 text-destructive"
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={onAddStarsFilter}>
            <Plus className="size-4" />
            Add Stars Filter
          </Button>
        )}
      </div>
    </div>
  );
}
