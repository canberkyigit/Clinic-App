# Clinic-App

A clinic management application for mobile devices, built with React Native and Expo.

## Features

- Patient and appointment management
- Calendar integration
- Firebase backend
- Cross-platform (iOS, Android)

## Tech Stack

- **React Native** with **Expo**
- **Firebase** for data and auth
- **React Navigation** (tabs)
- **react-native-maps**, **react-native-calendars**, **expo-image-picker**

## Setup

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/canberkyigit/Clinic-App.git
cd Clinic-App
npm install
```

2. Copy `.env.example` to `.env` and fill in your Firebase (and any other) configuration.

3. Start the app:

```bash
npm start
```

Then run on iOS simulator (`i`), Android emulator (`a`), or scan the QR code with Expo Go.

## Scripts

| Command    | Description              |
| ---------- | ------------------------ |
| `npm start` | Start Expo dev server    |
| `npm run ios` | Run on iOS simulator   |
| `npm run android` | Run on Android emulator |
| `npm run web` | Run in web browser     |

## License

Private project.
