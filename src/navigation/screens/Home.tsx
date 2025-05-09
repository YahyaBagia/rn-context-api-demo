import { Button, Card, List } from "react-native-paper";

import ScreenWrapper from "@/src/components/ScreenWrapper";
import { useAuth } from "@/src/context/AuthContext";
import { Alert } from "react-native";

const Home = () => {
  const { user, logout } = useAuth();

  const _onLogoutPressed = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: logout },
      ],
      { cancelable: false }
    );
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
