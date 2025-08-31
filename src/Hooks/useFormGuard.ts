import { useState } from "react";
import { useBlocker } from "react-router-dom";
import { getByPassNavigation, setByPassNavigation } from "../utils";

type FormGuardProps = {
  isDirty: boolean;
  onConfirm: () => void;
};

export const useFormGuard = ({ isDirty, onConfirm }: FormGuardProps) => {
  const [nextLocation, setNextLocation] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const blocker = useBlocker((tx) => {
    if (!isDirty || getByPassNavigation()) {
      setByPassNavigation(false);
      return false;
    }
    setNextLocation(tx.nextLocation.pathname);
    setOpenDialog(true);
    return true;
  });

  const confirmNavigation = () => {
    if (nextLocation) {
      setOpenDialog(false);
      onConfirm();
      blocker.proceed?.();
    }
  };

  const cancelNavigation = () => {
    setOpenDialog(false);
    setNextLocation(null);
  };

  return {
    openDialog,
    confirmNavigation,
    cancelNavigation,
  };
};
