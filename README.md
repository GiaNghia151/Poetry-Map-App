# Poetry Map App

## Overview
The Poetry Map App is an interactive web application that allows users to explore a global map, add poems to specific destinations, and save their favorite poems in collections. This project combines the beauty of poetry with the exploration of geography, providing a unique platform for users to share and discover literary works.

## Features
- **Interactive Global Map**: Users can navigate a world map and interact with destination pins.
- **Poem Submission**: Users can submit poems associated with specific locations on the map.
- **User Authentication**: Secure sign-in and account management for users to save their favorite poems.
- **Collections**: Users can view and manage their collections of saved poems.

## Technologies Used
- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (or any preferred database)

## Project Structure
```
poetry-map-app
├── client
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── Map.tsx
│   │   │   ├── PoemForm.tsx
│   │   │   ├── Auth.tsx
│   │   │   └── Collection.tsx
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── server
│   ├── src
│   │   ├── config
│   │   │   └── db.ts
│   │   ├── controllers
│   │   │   ├── auth.ts
│   │   │   └── poems.ts
│   │   ├── models
│   │   │   ├── User.ts
│   │   │   └── Poem.ts
│   │   ├── routes
│   │   │   └── index.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB (or preferred database)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the client directory and install dependencies:
   ```
   cd poetry-map-app/client
   npm install
   ```
3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

### Running the Application
1. Start the server:
   ```
   cd server
   npm start
   ```
2. Start the client:
   ```
   cd ../client
   npm start
   ```

### Usage
- Visit `http://localhost:3000` to access the application.
- Sign up or log in to start adding poems and saving your favorites.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.