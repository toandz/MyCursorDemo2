# Digital Planner

An interactive digital planner web application with calendar, productivity tools, habit tracking, and more.

## Features (Planned)

- 📅 Calendar Integration
- ✅ Task Management
- 📊 Habit Tracking
- 🎨 Customizable Templates
- 🏷️ Stickers and Decorations
- 💳 In-app Purchases
- 🔐 User Authentication
- 📱 Responsive Design

## Tech Stack

- Frontend: React with TypeScript
- UI Framework: Material-UI (MUI)
- State Management: Zustand
- Backend: Firebase
  - Authentication
  - Firestore Database
  - Storage
- Payment Processing: Stripe

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication related components
│   ├── calendar/      # Calendar related components
│   ├── habits/        # Habit tracking components
│   ├── planner/       # Planner template components
│   ├── shop/          # Store and in-app purchase components
│   └── common/        # Shared components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── store/             # Zustand store configurations
├── services/          # Firebase and API services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── styles/            # Global styles and themes
└── assets/            # Static assets
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Firebase and Stripe configurations:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

MIT 