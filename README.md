Hello!

# Spotify-Lingo Frontend 

Spotify-Lingo is a small language learning mini-game inspired by Spotify.

The idea of the app is that you can search for songs, listen to a short preview and practice language skills by guessing missing words from the lyrics.
This repository contains the **frontend part of the project**, built with **React and Vite**.

The frontend is the part the user interacts with. It shows the songs, allows the user to search, play music previews and play the mini-game.

The frontend communicates with the backend server, which gets the music data from the Jamendo API.

---

# How the Project Is Structured

The project has two parts.

The **frontend** (this repository) is a React application that runs in the browser.

The **backend** is a Node.js server that communicates with the Jamendo music API and sends the song data to the frontend.

The frontend sends requests to the backend server which runs on:

http://localhost:3001

---

# Project Folder Structure

Inside this repository you will mainly see these folders and files.

The **public** folder contains static files.

The **src** folder contains the main React code.

Important files inside the src folder:

• `main.jsx` – the entry point of the React app  
• `App.jsx` – main component of the application  
• `pages/` – pages used in the app  
• `assets/` – images or static resources  

Other important files in the root folder:

• `package.json` – contains project dependencies  
• `vite.config.js` – configuration for the Vite development server  

---

# Requirements

Before running the project you need to install **Node.js**.

Node.js includes **npm**, which is used to install the project dependencies.

You can download Node.js from:

https://nodejs.org

After installing Node.js you can check if everything works by running in your terminal:

node -v

npm -v

If both commands return a version number then Node.js and npm are installed correctly.

---

# Cloning the Repository

First clone the repository from GitHub.

Open a terminal and run:

git clone https://github.com/Oliwia-ui/spotify-lingo-frontend.git

Then go into the project folder:

cd spotify-lingo-frontend

---

# Installing Dependencies

Before starting the project you need to install the required packages.

Run:

npm install

This will install all dependencies listed in the **package.json** file.

---

# Running the Frontend

To start the development server run:

npm run dev

After running this command you should see something like this in the terminal:

VITE ready  
Local: http://localhost:5173

This means the development server is running.

---

# Opening the Application

Open your browser and go to:

http://localhost:5173

You should now see the Spotify-Lingo interface.

---

# Important

The frontend requires the backend server to be running.

The backend should run on:

http://localhost:3001

If the backend server is not running the app will not be able to load songs.

---

# How the Application Works

The basic flow of the application is:

1. The user searches for a song  
2. The frontend sends a request to the backend  
3. The backend requests data from the Jamendo API  
4. Jamendo returns song data  
5. The backend sends the data back to the frontend  
6. The user can listen to a preview of the song  
7. The game hides a word from the lyrics and the user guesses it  

---

# Git Workflow

For teamwork we use a simple Git workflow.

There are three main branches.

main – stable production version  
staging – testing branch  
develop – development branch  

Developers should always create a **feature branch** before starting work.

Example:

git checkout develop  
git pull  
git checkout -b feature/song-search

After finishing work commit the changes:

git add .  
git commit -m "Add song search component"

Then push the branch:

git push -u origin feature/song-search

After that a Pull Request can be opened from the feature branch to **develop**.

Once everything is tested the changes are merged into:

develop → staging  
staging → main

---

# Technologies Used

This project uses:

React  
Vite  
JavaScript  
CSS  

---

# Author

Spotify-Lingo Team

Lead developer  
Oliwia Jasionek
