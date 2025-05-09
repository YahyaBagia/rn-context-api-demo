import { Button, Card, List } from "react-native-paper";

import ScreenWrapper from "@/src/components/ScreenWrapper";

import { useAuth } from "@/src/context/AuthContext";
import { useGlobalUI } from "@/src/context/GlobalUIContext";

const Home = () => {
  const { user, logout } = useAuth();
  const { showAlert } = useGlobalUI();

  const _onLogoutPressed = () => {
    showAlert({
      title: "Logout",
      message: "Are you sure you want to logout?",
      buttons: [{ text: "Yes", onPress: logout }, { text: "Cancel" }],
    });
  };

  return (
    <ScreenWrapper style={{ justifyContent: "space-between" }}>
      <Card>
        <List.Item
          title={user?.name}
          description={user?.email}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
      </Card>
      <Button icon={"logout"} mode="contained" onPress={_onLogoutPressed}>
        Logout
      </Button>
    </ScreenWrapper>
  );
};

export default Home;
