# TanStack Router + Mantine

A modern React application with TanStack Router, Mantine UI, and a multi-step wizard with conditional logic.

## ✨ Features

- Type-safe file-based routing with TanStack Router
- Modern UI components with Mantine v8
- Multi-step wizard with conditional logic and validation
- Form validation with Mantine Form
- PostCSS with Mantine preset
- TypeScript throughout

## 🚀 Quick Start

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build
```

## 🐳 Docker

Build and run the app in a Docker container with nginx:

```bash
# Build the Docker image
docker build -t wizard-app .

# Run the container
docker run -d -p 8080:80 --name wizard-container wizard-app

# Access the app at http://localhost:8080
```

**Manage the container:**

```bash
# Stop the container
docker stop wizard-container

# Start the container
docker start wizard-container

# View logs
docker logs wizard-container

# Remove the container
docker rm wizard-container
```

## 📁 Project Structure

```
src/
├── features/Wizard/
│   ├── components/
│   ├── types/
│   └── utils/
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   └── wizard.tsx
└── main.tsx
```

## 🛠️ Tech Stack

- **Framework:** React 19
- **Routing:** TanStack Router v1
- **UI:** Mantine v8
- **Forms:** Mantine Form + Zod
- **Build:** Vite 7
- **Language:** TypeScript 5
- **CSS:** PostCSS
- **Testing:** Vitest
