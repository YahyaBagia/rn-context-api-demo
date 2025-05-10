# rn-context-api-demo

## Description

React Native Context API Demo for Authentication

This demo app showcases how to implement authentication using React's Context API in a React Native environment. It uses `AsyncStorage` for persisting the user session and demonstrates login, signup, and logout flows with basic navigation.

---

## 📸 Screenshots

| Login                                          | Signup                                          | Home                                          |
| ---------------------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| ![Login](readme_assets/screenshots/Dark1.png)  | ![Signup](readme_assets/screenshots/Dark2.png)  | ![Home](readme_assets/screenshots/Dark3.png)  |
| ![Login](readme_assets/screenshots/Light1.PNG) | ![Signup](readme_assets/screenshots/Light2.PNG) | ![Home](readme_assets/screenshots/Light3.PNG) |

---

## 🎥 Screen Recordings

| Light Mode                                  | Dark Mode                                    |
| ------------------------------------------- | -------------------------------------------- |
| ![Light Mode](readme_assets/gifs/Light.gif) | ![Session Demo](readme_assets/gifs/Dark.gif) |

---

## ⚙️ Key Technologies Used

| Technology                                                                  | Description                                                                                               |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [React Native](https://reactnative.dev/)                                    | A framework for building native mobile apps using JavaScript and React.                                   |
| [Expo](https://expo.dev)                                                    | A development platform that streamlines building and deploying React Native apps.                         |
| [React Navigation](https://reactnavigation.org)                             | A routing and navigation library for React Native apps.                                                   |
| [AsyncStorage](https://github.com/react-native-async-storage/async-storage) | A simple, unencrypted, asynchronous key-value storage system for persisting data locally in React Native. |
| [Context API](https://react.dev/reference/react/createContext)              | A built-in React feature for managing global state across components.                                     |
| [React Native Paper](https://reactnativepaper.com/)                         | A cross-platform UI component library that follows Material Design guidelines.                            |

---

## 🖥️ Environment setup

### ✅ Quick steps:

- Install [NodeJS](https://nodejs.org/en/)
- Install [expo-cli](https://docs.expo.dev/more/expo-cli/) (`npm install -g expo-cli`)

---

## 🛠️ Setup Instructions

### ⬇️ Clone repo

```bash
git clone https://github.com/YahyaBagia/rn-context-api-demo.git
```

### 🏁 Start Project

```bash
yarn start
```

### 📱 Run on iOS

```bash
yarn ios
```

### 📱 Run on Android

```bash
yarn android
```

---

## 🧩 Explanation

### 🔐 Authentication Features

- **Login:** Validates user credentials from a local in-memory list stored in `AsyncStorage`.
- **Signup:** Registers a new user (if not already existing) and appends them to the user list in `AsyncStorage`.
- **Logout:** Clears the session and navigates back to the auth screens.
- **Auto-login on App Launch:** Loads the persisted session if a user was previously logged in.

### 🧠 Context API Integration

- Auth state (`user`) and auth actions (`login`, `signup`, `logout`) are globally managed using React's Context API.
- Auth state is accessible from any component via the `useAuth` hook.

### 🧭 Navigation Flow

- Uses React Navigation stack:
  - `Login` and `Signup` when user is not logged in.
  - `Home` screen once the user logs in or signs up.
- Conditional rendering is handled in `RootNavigator`.

---

## 📌 Notes

- This app does **not** use any backend or API. All user data is stored locally.
- Passwords are stored in plaintext for demonstration purposes only.
