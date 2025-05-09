import { Button, Dialog, Portal, Text } from "react-native-paper";

import { IAlertViewData } from "@/src/context/GlobalUIContext";

export interface IAlertViewProps {
  alertViewData?: IAlertViewData;
  hideAlert: () => void;
}

const AlertView: React.FC<IAlertViewProps> = (props) => {
  const { alertViewData, hideAlert } = props;

  const { title, message, buttons = [] } = alertViewData || {};

  const visible = !!alertViewData;

  const hideDialog = () => {
    hideAlert();
  };

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          {buttons.map(({ text, onPress }) => (
            <Button
              key={text}
              onPress={() => {
                onPress && onPress();
                hideDialog();
              }}
            >
              {text}
            </Button>
          ))}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AlertView;
