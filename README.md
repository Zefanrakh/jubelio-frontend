# How to Run the Application

This document provides step-by-step instructions for setting up, running, and testing the `jubelio-frontend` Next.js application.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (Node Package Manager) or **yarn**

---

## Setup

### 1. Clone the Repository

Run the following command to clone the repository and navigate to its directory:

```bash
git clone <repository-url>
cd jubelio-frontend
```

### 2. Install Dependencies

Install the required packages:

```bash
npm install
```

### 3. Set Up Environment Variables (if needed)

Create a `.env.local` file in the root directory for any required environment variables. Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Replace `http://localhost:3000/api` with the base URL of your API.

---

## Running the Application

### Development Mode

To start the application in development mode, run:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Mode

To build and run the application in production mode:

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Additional Scripts

### Linting

To check for coding standards and errors:

```bash
npm run lint
```

### Testing

To run tests (if implemented):

```bash
npm test
```

---

## Project Structure

- `pages/`: Contains Next.js page components.
- `components/`: Contains reusable UI components.
- `styles/`: Contains global and modular CSS or SCSS files.
- `stores/`: Contains Zustand store configuration for state management.
- `public/`: Contains static assets like images.

---

## Notes

- Ensure the API server is running if your application depends on external data.
- Update the `NEXT_PUBLIC_API_URL` environment variable to match the correct API endpoint.
- If you encounter any issues, refer to the official Next.js [documentation](https://nextjs.org/docs).

---

## Troubleshooting

- **Port Already in Use**: Stop any processes using the port or start the app on a different port using:

  ```bash
  PORT=3000 npm run dev
  ```

- **Dependency Issues**: Delete `node_modules` and `package-lock.json`, then reinstall:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

