export interface TranslatedString {
  en: string;
  lt: string;
}

export type Locale = "en" | "lt";

export interface LocaleBundle {
  locale: Locale;
  setLocale(locale: Locale): void;
}
