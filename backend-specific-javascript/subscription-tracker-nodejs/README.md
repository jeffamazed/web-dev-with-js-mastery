# 📊 Subscription Tracker API

A robust, secure API for managing subscriptions, complete with authentication, **access tokens**, **refresh tokens**, and **admin role management**. Inspired by [JS Mastery](https://www.youtube.com/c/jsmastery), this project provides a clean, scalable backend for subscription-based applications.

## 🚀 Tech Stack

- **Node.js & Express** – Fast, minimalist server-side framework
- **MongoDB & Mongoose** – NoSQL database with schema-based modeling
- **JWT (JSON Web Tokens)** – Secure authentication with access and refresh tokens
- **Bcrypt** – Password hashing for security
- **Nodemailer** – Sending reminder emails for upcoming subscriptions
- **Upstash Workflow** – Serverless workflow orchestration
- **ArcJet** – Rate limiting to protect endpoints from abuse
- **Middleware** – Role-based access control and route protection

## ⚡ Features

- **User Authentication** – Sign up, sign in, and secure token handling
- **Access & Refresh Tokens** – Short-lived access tokens with refresh tokens for persistent sessions
- **Subscription Management** – CRUD operations for user subscriptions
- **Admin Role** – View all subscriptions, manage users, and monitor upcoming renewals
- **Email Reminders** – Automatic reminders for upcoming subscription renewals
- **Rate Limiting** – Protect API endpoints from excessive requests
- **Error Handling** – Centralized API error handling with descriptive messages

## 💻 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/jeffamazed/web-dev-with-js-mastery.git
cd backend-specific-javascript/subscription-tracker-nodejs
npm install
npm run dev
```

Create .env.development.local for configuration, check [sample.env](./sample.env).

## 🔥 Inspiration

Built with guidance and tutorials from:

- [JS Mastery](https://www.youtube.com/c/jsmastery) — For teaching modern backend best practices

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
