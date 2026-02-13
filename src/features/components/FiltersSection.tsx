import React, {useState} from 'react';
import {Loader2, Plus, X} from 'lucide-react';
import {LicensesFilter, StarsFilter} from '@/types';
import {LICENSES_OPERATORS, STARS_OPERATORS} from '@/shared/constants';
import {useLanguages, useLicenses} from '@/features/hooks';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Checkbox} from '@/components/ui/checkbox';

interface FiltersSectionProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  selectedLicenses: string[];
  onLicensesChange: (licenses: string[]) => void;
  licensesOperator: LicensesFilter['operator'];
  onLicensesOperatorChange: (value: LicensesFilter['operator']) => void;
  starsFilter: {value: number; operator: StarsFilter['operator']} | null;
  onStarsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStarsOperatorChange: (value: StarsFilter['operator']) => void;
  onRemoveStarsFilter: () => void;
  onAddStarsFilter: () => void;
}

export function FiltersSection({
  selectedLanguages,
  onLanguagesChange,
  selectedLicenses,
  onLicensesChange,
  licensesOperator,
  onLicensesOperatorChange,
  starsFilter,
  onStarsValueChange,
  onStarsOperatorChange,
  onRemoveStarsFilter,
  onAddStarsFilter,
}: FiltersSectionProps) {
  const {languages, loading} = useLanguages();
  const {licenses, loading: licensesLoading} = useLicenses();
  const [langOpen, setLangOpen] = useState(false);
  const [licensesOpen, setLicensesOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [licensesFilter, setLicensesFilter] = useState('');

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

  const filteredLicenses = licenses
    .filter((l) => l?.trim())
    .filter((l) => !licensesFilter || l.toLowerCase().includes(licensesFilter.toLowerCase()));

  const toggleLicense = (lic: string) => {
    if (selectedLicenses.includes(lic)) {
      onLicensesChange(selectedLicenses.filter((x) => x !== lic));
    } else {
      onLicensesChange([...selectedLicenses, lic]);
    }
  };

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="min-w-0 flex-1 sm:max-w-[240px]">
        <Label htmlFor="languages-trigger" className="mb-2 block text-sm font-medium">
          Languages
        </Label>
        <Popover open={langOpen} onOpenChange={setLangOpen}>
          <PopoverTrigger asChild>
            <Button
              id="languages-trigger"
              variant="outline"
              className="w-full justify-between font-normal"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              {selectedLanguages.length === 0
                ? 'All languages'
                : `${selectedLanguages.length} selected`}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
            <div className="p-2">
              <Input
                placeholder="Filter languages..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="h-9"
                aria-label="Filter languages"
              />
            </div>
            <div
              className="max-h-[280px] overflow-y-auto p-2"
              role="listbox"
              aria-label="Language options"
            >
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
                </div>
              ) : (
                filtered.map((lang) => (
                  <label
                    key={lang}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    <Checkbox
                      checked={selectedLanguages.includes(lang)}
                      onCheckedChange={() => toggleLang(lang)}
                      aria-label={`Select ${lang}`}
                    />
                    {lang}
                  </label>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="min-w-0 flex-1 sm:max-w-[240px]">
        <Label htmlFor="licenses-trigger" className="mb-2 block text-sm font-medium">
          Licenses
        </Label>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={licensesOperator} onValueChange={onLicensesOperatorChange}>
            <SelectTrigger className="h-9 w-[100px] sm:w-[120px]">
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              {LICENSES_OPERATORS.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover open={licensesOpen} onOpenChange={setLicensesOpen}>
            <PopoverTrigger asChild>
              <Button
                id="licenses-trigger"
                variant="outline"
                className="min-w-0 flex-1 justify-between font-normal"
                aria-expanded={licensesOpen}
                aria-haspopup="listbox"
              >
                {selectedLicenses.length === 0
                  ? 'All licenses'
                  : `${selectedLicenses.length} selected`}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="min-w-[300px] w-[var(--radix-popover-trigger-width)] p-0">
              <div className="p-2">
                <Input
                  placeholder="Filter licenses..."
                  value={licensesFilter}
                  onChange={(e) => setLicensesFilter(e.target.value)}
                  className="h-9"
                  aria-label="Filter licenses"
                />
              </div>
              <div
                className="max-h-[280px] overflow-y-auto p-2"
                role="listbox"
                aria-label="License options"
              >
                {licensesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
                  </div>
                ) : (
                  filteredLicenses.map((lic) => (
                    <label
                      key={lic}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      <Checkbox
                        checked={selectedLicenses.includes(lic)}
                        onCheckedChange={() => toggleLicense(lic)}
                        aria-label={`Select ${lic}`}
                      />
                      {lic}
                    </label>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="min-w-0">
        <Label className="mb-2 block text-sm font-medium">Filter by Stars</Label>
        {starsFilter ? (
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={starsFilter.operator}
              onValueChange={onStarsOperatorChange}
            >
              <SelectTrigger className="h-9 w-[160px] sm:w-[180px]">
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
              inputMode="numeric"
              placeholder="Stars"
              value={starsFilter.value}
              onChange={onStarsValueChange}
              className="h-9 w-[100px] sm:w-[120px]"
              aria-label="Stars value"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemoveStarsFilter}
              className="size-9 text-muted-foreground hover:text-destructive"
              aria-label="Remove stars filter"
            >
              <X className="size-4" aria-hidden />
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="default" onClick={onAddStarsFilter}>
            <Plus className="size-4" aria-hidden />
            Add Stars Filter
          </Button>
        )}
      </div>
    </div>
  );
}
