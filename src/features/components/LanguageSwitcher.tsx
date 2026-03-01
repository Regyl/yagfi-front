import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/i18n"; // Import directly from your i18n config
import { useState, useEffect } from "react";

const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [open, setOpen] = useState(false);

  // Sync with i18n language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => setCurrentLang(lng);
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground hover:bg-accent"
          aria-label="Select language"
          aria-haspopup="menu"
        >
          {currentLang === "en"
            ? "🇺🇸 English"
            : currentLang === "es"
              ? "🇪🇸 Español"
              : "Language"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="z-[1200] min-w-[160px]"
      >
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("es")}>
          🇪🇸 Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
