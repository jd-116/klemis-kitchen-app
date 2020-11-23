# Klemis Kitchen App
`Klemis Kitchen App` is a multiplatform React Native iOS and Android App allowing Georgia Tech Klemis Kitchen members to access inventory for different Klemis Kitchen pantry locations and view announcements posted by administrators.  
Created as part of Georgia Tech’s Junior Design class in collaboration with Klemis Kitchen.  
<img src="screenshot.png" />

## 📝 Release Notes
Version 1.0  
New features: Home Screen, Drawer, Locations, Announcements, Inventory for every location  
Known Bugs: Login is not always working as expected, and on Android the status bar has extra padding when navigating out of the homescreen.

## 🚀 Usage
The app is (or will be soon) available on the iOS App Store and Google Play Store under the name `Klemis Kitchen`. First install `node.js` and `yarn` and clone the project from github. To run it locally for development, within the project directory use  
```
yarn install
yarn start
```
A browser window will open with the Expo dashboard. From there, you can choose to run the app in a browser window, or on an Android/iOS device via an emulator or the [Expo](https://expo.io/) app.

## 🔧 Configuration
The default (production) configuration of the app points to `api.klemis-kitchen.com` to retrieve pantry information from. This server runs `Klemis Kitchen API` on a Georgia Tech-hosted platform.  
To change where to fetch data from, edit `APIFETCHLOCATION` in `constants.tsx`
