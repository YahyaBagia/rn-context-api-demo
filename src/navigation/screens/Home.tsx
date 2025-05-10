import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

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
    <ScreenWrapper style={styles.screenWrapper}>
      <Card>
        <Card.Content style={styles.cardContent}>
          <Avatar.Icon size={104} icon="account" />
          <Text variant="headlineLarge" style={styles.nameText}>
            {user?.name}
          </Text>
          <Text variant="titleMedium">{user?.email}</Text>
        </Card.Content>
      </Card>
      <Button icon={"logout"} mode="contained" onPress={_onLogoutPressed}>
        Logout
      </Button>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    justifyContent: "space-between",
  },
  cardContent: {
    alignItems: "center",
  },
  nameText: {
    marginVertical: 8,
  },
});

export default Home;
