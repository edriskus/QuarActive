import React, { useContext } from "react";
import { useStorage } from "./Storage";
import { DailyHealthBundle } from "../types/DailyHealth";
import { useEffect, FC, useState, createContext } from "react";
import moment from "moment";

const DAILY_HEALTH_KEY = "QuarActive--DailyHealth";

const DailyHealthContext = createContext<DailyHealthBundle>({
  show: false,
  complete: () => null
});

export const DailyHealthProvider: FC = ({ children }) => {
  const [getLocal, setLocal] = useStorage<{ lastShow: number } | undefined>(
    DAILY_HEALTH_KEY
  );
  const [lastShow, setLastShow] = useState<number>(getLocal()?.lastShow ?? 0);
  const bundle: DailyHealthBundle = {
    complete: () => setLastShow(+moment()),
    // 5s
    show:
      moment().day() !== moment(lastShow).day() && // Not the same day
      +moment() > lastShow && // Last shown before now
      moment().hour() > 4 // Later than 4AM
  };

  useEffect(() => {
    setLocal({ lastShow });
    // eslint-disable-next-line
  }, [lastShow]);

  return (
    <DailyHealthContext.Provider value={bundle}>
      {children}
    </DailyHealthContext.Provider>
  );
};

export const useDailyHealth = () => {
  return useContext(DailyHealthContext);
};
