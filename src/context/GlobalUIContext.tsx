import { createContext, useContext, useState } from "react";
import SnackBarView from "../global-components/SnackBarView";
import AlertView from "../global-components/AlertView";

export interface IAlertViewData {
  title?: string;
  message: string;
  buttons: { text: string; onPress?: () => void }[];
}

export interface ISnackBarViewData {
  message: string;
  duration?: number;
  action?: { label: string; onPress: () => void };
}

type GlobalUIContextType = {
  showAlert: (params: IAlertViewData) => void;
  showSnackBar: (params: ISnackBarViewData) => void;
};

const GlobalUIContext = createContext<GlobalUIContextType | undefined>(
  undefined
);

export const GlobalUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [alertData, setAlertData] = useState<IAlertViewData>();
  const [snackBarData, setSnackBarData] = useState<ISnackBarViewData>();

  const hideAlert = () => setAlertData(undefined);
  const hideSnackBar = () => setSnackBarData(undefined);

  return (
    <GlobalUIContext.Provider
      value={{ showAlert: setAlertData, showSnackBar: setSnackBarData }}
    >
      {children}
      <SnackBarView
        hideSnackBar={hideSnackBar}
        snackBarViewData={snackBarData}
      />
      <AlertView hideAlert={hideAlert} alertViewData={alertData} />
    </GlobalUIContext.Provider>
  );
};

export const useGlobalUI = () => {
  const context = useContext(GlobalUIContext);
  if (!context)
    throw new Error("useGlobalUI must be used within GlobalUIProvider");
  return context;
};
