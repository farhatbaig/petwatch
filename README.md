# Pet Adoption App

A beautiful React Native (Expo) app for browsing, viewing, and adopting pets, with real-time location and dark/light mode support.

## Features
- Browse a list of pets (local JSON data)
- View pet details and simulate adoption with a payment screen
- Real-time device location with simulated map
- Global dark/light mode toggle (in the app header)
- Modern, responsive UI

## Screens
- **Home:** List of pets, location button, dark/light toggle
- **Pet Details:** Pet info, image, and "Adopt" button
- **Adopt:** Simulated payment/adoption process
- **Location:** Shows your coordinates and a map simulation

## How to Run Locally
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the Expo server:
   ```sh
   npm start
   ```
3. Scan the QR code with Expo Go (iOS/Android) or run on an emulator.

## Test the Android Build
You can test the latest Android build using Expo:

👉 [Download/Test Android Build](https://expo.dev/accounts/farhat12/projects/pet-adoption-app/builds/4ee99a6f-61b1-4a33-bd19-9b802eef1a49)

## Dark/Light Mode
- Toggle dark/light mode from the app header (top right)
- All screens update instantly

## Tech Stack
- React Native (Expo)
- Expo Router
- expo-location
- @expo/vector-icons

## Project Structure
```
app/
  _layout.tsx         # Root layout, dark mode context
  Home.jsx            # Home screen (pet list)
  PetDetail.jsx       # Pet details screen
  Adopt.jsx           # Adoption/payment screen
  Location.jsx        # Location/map screen
assets/
  pets.json           # Local pet data
```

## License
MIT
