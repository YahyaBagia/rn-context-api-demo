import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // stored in plaintext for simplicity
};

type PublicUser = Omit<User, "password">;

type AuthContextType = {
  user: PublicUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  changePassword: (
    oldPassword: string,
    newPassword: string
  ) => Promise<boolean>;
  userList: User[];
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const USER_STORAGE_KEY = "auth:user" as const;
export const USER_LIST_STORAGE_KEY = "auth:user_list" as const;

const initialUsers: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", password: "123456" },
  { id: "2", name: "Bob", email: "bob@example.com", password: "abcdef" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedUser, storedUserList] = await Promise.all([
          AsyncStorage.getItem(USER_STORAGE_KEY),
          AsyncStorage.getItem(USER_LIST_STORAGE_KEY),
        ]);

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedUserList) {
          setUserList(JSON.parse(storedUserList));
        } else {
          // First-time init of user list
          await AsyncStorage.setItem(
            USER_LIST_STORAGE_KEY,
            JSON.stringify(initialUsers)
          );
          setUserList(initialUsers);
        }
      } catch (e) {
        console.error("AuthContext load error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const existingUser = userList.find(
      (u) => u.email === email && u.password === password
    );
    if (!existingUser) return false;

    const publicUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    setUser(publicUser);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(publicUser));

    return true;
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const existingUser = userList.find((u) => u.email === email);
    if (existingUser) return false;

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    const updatedUserList = [...userList, newUser];
    setUserList(updatedUserList);
    await AsyncStorage.setItem(
      USER_LIST_STORAGE_KEY,
      JSON.stringify(updatedUserList)
    );

    const publicUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    setUser(publicUser);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(publicUser));
    return true;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  };

  const deleteUser = async (id: string) => {
    const updatedUserList = userList.filter((u) => u.id !== id);
    setUserList(updatedUserList);
    await AsyncStorage.setItem(
      USER_LIST_STORAGE_KEY,
      JSON.stringify(updatedUserList)
    );
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    const foundUser = userList.find(
      (u) => u.id === user?.id && u.password === oldPassword
    );

    if (!foundUser) return false;

    const updatedUserList = userList.map((u) => {
      if (u.id === user?.id) {
        return { ...u, password: newPassword };
      }
      return u;
    });

    setUserList(updatedUserList);
    await AsyncStorage.setItem(
      USER_LIST_STORAGE_KEY,
      JSON.stringify(updatedUserList)
    );
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        deleteUser,
        userList,
        loading,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
