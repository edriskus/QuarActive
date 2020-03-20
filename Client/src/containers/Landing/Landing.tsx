import React from "react";
import { TaskStatus } from "../../types/Task";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const task: TaskStatus = TaskStatus.done;
  const { t } = useTranslation();
  return <div>{t("landing.stuckInQuarantine")}</div>;
}
