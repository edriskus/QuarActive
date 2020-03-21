import React, { useContext } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import en from "../locales/en.json";
import lt from "../locales/lt.json";
import { TranslatedString, LocaleBundle, Locale } from "../types/Translation";
import { createContext, FC, useState, useEffect } from "react";
import { useStorage } from "./Storage";

const LOCALE_KEY = "QuarActive--Locale";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    lt: {
      translation: lt
    }
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});

export function local(
  texts: TranslatedString,
  currentLanguage: string
): string {
  return (texts as any)[currentLanguage] ?? "__not_found__";
}

const LocaleContext = createContext<LocaleBundle>({
  locale: "en",
  setLocale: () => null
});

export const LocaleProvider: FC = ({ children }) => {
  const [getLocal, setLocal] = useStorage<{ locale: Locale } | undefined>(
    LOCALE_KEY
  );
  const [locale, setLocale] = useState<Locale>(getLocal()?.locale ?? "en");
  const { i18n } = useTranslation();
  const bundle: LocaleBundle = {
    setLocale: (locale: Locale) => setLocale(locale),
    locale
  };

  useEffect(() => {
    setLocal({ locale });
    i18n.changeLanguage(locale);
    // eslint-disable-next-line
  }, [locale]);

  return (
    <LocaleContext.Provider value={bundle}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => {
  return useContext(LocaleContext);
};
