import "react-i18next";

// Import your translation files for type safety
import en from "../public/locales/en/translation.json";
import es from "../public/locales/es/translation.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      en: typeof en;
      es: typeof es;
    };
  }
}
