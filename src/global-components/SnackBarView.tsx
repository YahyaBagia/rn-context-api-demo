import { Snackbar } from "react-native-paper";

import { ISnackBarViewData } from "@/src/context/GlobalUIContext";

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

  return (
    <Snackbar
      visible={!!message}
      duration={duration}
      onDismiss={hideSnackBar}
      action={action}
    >
      {message}
    </Snackbar>
  );
};

export default SnackBarView;
