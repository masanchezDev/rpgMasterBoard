# RPG Master Board

A web application for managing tabletop RPG sessions with real-time synchronization between Game Master and Player views.

## Features

- **Dual View System**: Control panel for GM and display view for players
- **Real-time Sync**: Instant updates via Socket.io
- **Layer System**: Backgrounds, characters, objects, events, and blackout layers
- **Audio Support**: Background music with volume control and sound effects
- **Dark Mode UI**: Easy on the eyes during long sessions

## Project Structure

```
rpgMasterBoard/
├── assets/
│   ├── backgrounds/    # Background images
│   ├── characters/     # Character images (PNG with transparency)
│   ├── objects/        # Object images
│   ├── events/         # Event overlay images
│   ├── music/          # Background music files
│   └── sounds/         # Sound effect files
├── client/             # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── control/    # GM panel components
│       │   └── player/     # Player view layers
│       ├── hooks/          # Custom hooks (socket)
│       ├── pages/          # Route pages
│       └── store/          # Zustand state
└── server/             # Express + Socket.io backend
```

## Installation

```bash
pnpm run install:all
```

## Running the Application

```bash
pnpm run dev
```

This starts both the server (port 3001) and client (port 5173) concurrently.

## Usage

1. Open `http://localhost:5173/control` for the GM Control Panel
2. Click "Open Player View" or navigate to `http://localhost:5173/player`
3. Place the player view on a second monitor/TV
4. Control everything from the GM panel

## Adding Assets

Simply drop files into the corresponding folders in `/assets`:

- **backgrounds**: JPG, PNG, WebP images
- **characters**: PNG images with transparency
- **objects**: PNG images with transparency
- **events**: Full-screen overlay images
- **music**: MP3, OGG, WAV files (loops automatically)
- **sounds**: MP3, OGG, WAV files (plays once)

The server scans these folders on startup and serves them to the frontend.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Backend**: Node.js + Express
- **Real-time**: Socket.io
