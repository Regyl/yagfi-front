import React, {useState} from 'react';
import {Loader2, Plus, RotateCcw, X} from 'lucide-react';
import {IssueLanguagesFilter, LicensesFilter, StarsFilter} from '@/types';
import {LICENSES_OPERATORS, STARS_OPERATORS} from '@/shared/constants';
import {useIssueLanguages, useLanguages, useLicenses} from '@/features/hooks';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Checkbox} from '@/components/ui/checkbox';
import {Card, CardContent, CardHeader} from '@/components/ui/card';

interface FiltersSectionProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  selectedLicenses: string[];
  onLicensesChange: (licenses: string[]) => void;
  licensesOperator: LicensesFilter['operator'];
  onLicensesOperatorChange: (value: LicensesFilter['operator']) => void;
  selectedIssueLanguages: string[];
  onIssueLanguagesChange: (languages: string[]) => void;
  issueLanguagesOperator: IssueLanguagesFilter['operator'];
  onIssueLanguagesOperatorChange: (value: IssueLanguagesFilter['operator']) => void;
  starsFilter: {value: number; operator: StarsFilter['operator']} | null;
  onStarsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStarsOperatorChange: (value: StarsFilter['operator']) => void;
  onRemoveStarsFilter: () => void;
  onAddStarsFilter: () => void;
  onResetLanguages: () => void;
  onResetLicenses: () => void;
  onResetIssueLanguages: () => void;
  onResetAll: () => void;
}

export function FiltersSection({
  selectedLanguages,
  onLanguagesChange,
  selectedLicenses,
  onLicensesChange,
  licensesOperator,
  onLicensesOperatorChange,
  selectedIssueLanguages,
  onIssueLanguagesChange,
  issueLanguagesOperator,
  onIssueLanguagesOperatorChange,
  starsFilter,
  onStarsValueChange,
  onStarsOperatorChange,
  onRemoveStarsFilter,
  onAddStarsFilter,
  onResetLanguages,
  onResetLicenses,
  onResetIssueLanguages,
  onResetAll,
}: FiltersSectionProps) {
  const {languages, loading} = useLanguages();
  const {licenses, loading: licensesLoading} = useLicenses();
  const {issueLanguages, loading: issueLanguagesLoading} = useIssueLanguages();
  const [langOpen, setLangOpen] = useState(false);
  const [licensesOpen, setLicensesOpen] = useState(false);
  const [issueLanguagesOpen, setIssueLanguagesOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [licensesFilter, setLicensesFilter] = useState('');
  const [issueLanguagesFilter, setIssueLanguagesFilter] = useState('');

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

  const filteredIssueLanguages = issueLanguages
    .filter((l) => l?.trim())
    .filter((l) => !issueLanguagesFilter || l.toLowerCase().includes(issueLanguagesFilter.toLowerCase()));

  const toggleIssueLanguage = (lang: string) => {
    if (selectedIssueLanguages.includes(lang)) {
      onIssueLanguagesChange(selectedIssueLanguages.filter((x) => x !== lang));
    } else {
      onIssueLanguagesChange([...selectedIssueLanguages, lang]);
    }
  };

  const hasActiveFilters =
    selectedLanguages.length > 0 ||
    selectedLicenses.length > 0 ||
    selectedIssueLanguages.length > 0 ||
    starsFilter !== null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Card className="min-w-0 flex-1 py-4 sm:max-w-[280px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Label htmlFor="languages-trigger" className="text-sm font-medium">
              Languages
            </Label>
            {selectedLanguages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetLanguages}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
                aria-label="Reset languages filter"
              >
                <X className="size-4" aria-hidden />
              </Button>
            )}
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="min-w-0 flex-1 py-4 sm:max-w-[320px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Label htmlFor="licenses-trigger" className="text-sm font-medium">
              Licenses
            </Label>
            {selectedLicenses.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetLicenses}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
                aria-label="Reset licenses filter"
              >
                <X className="size-4" aria-hidden />
              </Button>
            )}
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="min-w-0 flex-1 py-4 sm:max-w-[360px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Label htmlFor="issue-languages-trigger" className="text-sm font-medium">
              Issue Languages
            </Label>
            {selectedIssueLanguages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetIssueLanguages}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
                aria-label="Reset issue languages filter"
              >
                <X className="size-4" aria-hidden />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Select value={issueLanguagesOperator} onValueChange={onIssueLanguagesOperatorChange}>
                <SelectTrigger className="h-9 w-full sm:w-[120px]">
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
              <Popover open={issueLanguagesOpen} onOpenChange={setIssueLanguagesOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="issue-languages-trigger"
                    variant="outline"
                    className="w-full justify-between font-normal"
                    aria-expanded={issueLanguagesOpen}
                    aria-haspopup="listbox"
                  >
                    {selectedIssueLanguages.length === 0
                      ? 'All languages'
                      : `${selectedIssueLanguages.length} selected`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="min-w-[300px] w-[var(--radix-popover-trigger-width)] p-0">
                  <div className="p-2">
                    <Input
                      placeholder="Filter issue languages..."
                      value={issueLanguagesFilter}
                      onChange={(e) => setIssueLanguagesFilter(e.target.value)}
                      className="h-9"
                      aria-label="Filter issue languages"
                    />
                  </div>
                  <div
                    className="max-h-[280px] overflow-y-auto p-2"
                    role="listbox"
                    aria-label="Issue language options"
                  >
                    {issueLanguagesLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="size-5 animate-spin text-muted-foreground" aria-hidden />
                      </div>
                    ) : (
                      filteredIssueLanguages.map((lang) => (
                        <label
                          key={lang}
                          className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                        >
                          <Checkbox
                            checked={selectedIssueLanguages.includes(lang)}
                            onCheckedChange={() => toggleIssueLanguage(lang)}
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
          </CardContent>
        </Card>

        <Card className="min-w-0 flex-1 py-4 sm:max-w-[320px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Label className="text-sm font-medium">Stars</Label>
            {starsFilter !== null && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemoveStarsFilter}
                className="h-8 px-2 text-muted-foreground hover:text-destructive"
                aria-label="Reset stars filter"
              >
                <X className="size-4" aria-hidden />
              </Button>
            )}
          </CardHeader>
          <CardContent>
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
              </div>
            ) : (
              <Button variant="outline" size="default" onClick={onAddStarsFilter}>
                <Plus className="size-4" aria-hidden />
                Add Stars Filter
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onResetAll}
          className="w-fit shrink-0"
          aria-label="Reset all filters"
        >
          <RotateCcw className="size-4" aria-hidden />
          Reset all
        </Button>
      )}
    </div>
  );
}
