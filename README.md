# Real Time Whiteboard Study Web Application

> This is a Real Time web application build with socket.IO, ReactJS, ExpressJS and Firebase

### View Live Demo: https://real-time-study.netlify.app/

## Features

- Create session system
- Multiple user can joined in the session
- Generate a link for every session
- Session link share with other users
- Session creator can drawing in whiteboard
- Real time messaging system
- User can leave from session
- Show participate list in a session

### Hide Folder is Client Side

Create a folder in src folder then a file -> firebase/firebase.js

```
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

// update user info in firebase
export const updateUserInfo = (info) => {
  const user = firebase.auth().currentUser;
  return user.updateProfile({
    displayName: info.name,
    photoURL: info.photoURL,
  });
};

// firebase collections
const sessionHistory = firebase.firestore().collection("");

// add a new session in firebase
export const createNewSession = ({
  sessionName,
  sessionDescription,
  email,
  link,
}) => {
  sessionHistory
    .add({
      name: sessionName,
      description: sessionDescription,
      email,
      link,
      time: Date.now(),
    })
    .then(() => console.log("New Session Create Successfully"));
};

// get user session create list
export const getUserSessionList = (user) => {
  return sessionHistory.where("email", "==", user).get();
};

```

### Install Dependencies (client & server)

```
npm install
```

## Copyright

Copyright (c) 2021 Nabed Khan
