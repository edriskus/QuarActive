import React, { useState, useCallback } from "react";
import { Snackbar, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useStorage } from "../../utils/Storage";

const COOKIE_KEY = "QuarActive--GDPR";

export default function CookieBar() {
  const [getLocal, setLocal] = useStorage(COOKIE_KEY);
  const [open, setOpen] = useState<boolean>(!getLocal());
  const { t } = useTranslation();

  const handleClose = useCallback(() => {
    setOpen(false);
    setLocal(true);
  }, [setLocal]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      ClickAwayListenerProps={{
        onClickAway: () => null
      }}
      onClose={handleClose}
      message={t("gdpr.message")}
      action={
        <>
          <Button color="inherit" size="small">
            {t("gdpr.moreInfo")}
          </Button>
          <Button color="secondary" size="small" onClick={handleClose}>
            {t("gdpr.agree")}
          </Button>
        </>
      }
    />
  );
}
