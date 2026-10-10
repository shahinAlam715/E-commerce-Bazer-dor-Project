# 🛍️ Bazar Dor — E-commerce Platform

**Bazar Dor** is a modern e-commerce web application designed to provide users with a smooth and convenient online shopping experience. Users can explore products, view product details, and securely sign in using email or Google authentication.

## 🚀 Technologies Used

- **Next.js** — React framework for building the web application
- **React** — Component-based user interface
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive and modern styling
- **Better Auth** — Authentication and session management
- **MongoDB Atlas** — Database management
- **Google OAuth** — Google sign-in integration
- **Vercel** — Deployment and hosting

## ✨ Features

- 🛒 **Product Browsing:** Explore products in an easy-to-use interface.
- 🔍 **Product Details:** View detailed information about individual products.
- 🔐 **User Authentication:** Secure sign-up and sign-in functionality.
- 🌐 **Google Login:** Sign in using a Google account.
- 👤 **User Accounts:** Support for authenticated user sessions.
- 📱 **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- ⚡ **Modern UI:** Clean interface built with reusable React components.
- 🗄️ **Database Integration:** MongoDB Atlas integration for data storage.
- 🚀 **Live Deployment:** Hosted on Vercel for online access.

## 🛠️ Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and add your own credentials:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URL=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Make sure these environment variable names match your project's authentication and database configuration. Never commit real secrets to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Live Demo

**Live Website:** [Bazar Dor E-commerce](https://e-commerce-bazer-dor-project.vercel.app)

## 📂 Project Structure

```text
project/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   └── ...
│   ├── components/
│   └── lib/
├── .env.local
├── package.json
└── README.md
```

*Note: The folder structure above is a general example. Adjust it to match your actual project.*

## 🎯 Project Goal

The goal of Bazar Dor is to build a user-friendly online shopping platform using modern web technologies while learning authentication, database integration, responsive UI development, and deployment.

## 👨‍💻 Developer

**Shahin Alam**

- GitHub: [shahinAlam715](https://github.com/shahinAlam715)


