import { Snackbar, Text } from "react-native-paper";

import { ISnackBarViewData } from "@/src/context/GlobalUIContext";
import useIsDarkMode from "../hooks/useIsDarkMode";

export interface ISnackBarViewProps {
  snackBarViewData?: ISnackBarViewData;
  hideSnackBar: () => void;
}

const SnackBarView: React.FC<ISnackBarViewProps> = (props) => {
  const { snackBarViewData, hideSnackBar } = props;

  const {
    message = "",
    action = { label: "OK", onPress: () => {} },
    duration,
  } = snackBarViewData || {};

  const isDarkMode = useIsDarkMode();

  return (
    <Snackbar
      visible={!!message}
      duration={duration}
      onDismiss={hideSnackBar}
      action={action}
      style={{ backgroundColor: isDarkMode ? "#191919" : "white" }}
    >
      <Text>{message}</Text>
    </Snackbar>
  );
};

export default SnackBarView;
