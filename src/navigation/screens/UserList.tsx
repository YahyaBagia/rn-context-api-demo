import { useState } from "react";
import { Alert, FlatList, View } from "react-native";
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
    <Card style={{ marginVertical: 8 }}>
      <List.Item
        title={name}
        left={() => <List.Icon icon="account" style={{ marginLeft: 12 }} />}
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
              <List.Icon icon="email-outline" style={{ marginLeft: 12 }} />
            )}
            right={() => <List.Icon icon="clipboard-outline" />}
            onPress={() => copyToClipboard(email)}
          />
          <List.Item
            title={"Password"}
            description={password}
            left={() => (
              <List.Icon icon="lock-outline" style={{ marginLeft: 12 }} />
            )}
            right={() => <List.Icon icon="clipboard-outline" />}
            onPress={() => copyToClipboard(password)}
          />
          <Divider />
          <Button
            mode="contained"
            icon={"delete"}
            style={{ margin: 8 }}
            onPress={onDeleteUser}
          >
            Delete
          </Button>
        </View>
      )}
    </Card>
  );
};

export default UserList;
