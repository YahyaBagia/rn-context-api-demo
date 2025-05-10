import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Button, Card, Divider, List } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

import ScreenWrapper from "@/src/components/ScreenWrapper";

import { useAuth, User } from "@/src/context/AuthContext";
import { useGlobalUI } from "@/src/context/GlobalUIContext";

const UserList = () => {
  const { userList } = useAuth();

  return (
    <ScreenWrapper>
      <FlatList
        data={userList}
        renderItem={({ item }) => <UserItem user={item} />}
      />
    </ScreenWrapper>
  );
};

export interface IconUserItemProps {
  user: User;
}

const UserItem: React.FC<IconUserItemProps> = (props) => {
  const { user } = props;
  const { id, name, email, password } = user;

  const { deleteUser } = useAuth();
  const { showAlert } = useGlobalUI();

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const copyToClipboard = (text: string) => Clipboard.setStringAsync(text);

  const onDeleteUser = () => {
    showAlert({
      title: "Delete User",
      message: "Are you sure you want to delete this user?",
      buttons: [
        { text: "Yes", onPress: () => deleteUser(id) },
        { text: "Cancel" },
      ],
    });
  };

  return (
    <Card style={styles.userItemCard}>
      <List.Item
        title={name}
        left={() => <List.Icon icon="account" style={styles.listLeftIcon} />}
        right={() => <List.Icon icon="chevron-down" />}
        onPress={toggleExpand}
      />
      {isExpanded && (
        <View>
          <Divider />
          <List.Item
            title={"Email"}
            description={email}
            left={() => (
              <List.Icon icon="email-outline" style={styles.listLeftIcon} />
            )}
            right={() => <List.Icon icon="clipboard-outline" />}
            onPress={() => copyToClipboard(email)}
          />
          <List.Item
            title={"Password"}
            description={password}
            left={() => (
              <List.Icon icon="lock-outline" style={styles.listLeftIcon} />
            )}
            right={() => <List.Icon icon="clipboard-outline" />}
            onPress={() => copyToClipboard(password)}
          />
          <Divider />
          <Button
            mode="contained"
            icon={"delete"}
            style={styles.deleteButton}
            onPress={onDeleteUser}
          >
            Delete
          </Button>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  userItemCard: {
    marginVertical: 8,
  },
  listLeftIcon: {
    marginLeft: 12,
  },
  deleteButton: {
    margin: 8,
  },
});

export default UserList;
