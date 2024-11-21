# Build an LMS Platform: Next.js 13.4.12, React 18.2.0, Node 18.18.0, Typescript 5.2.2, Tailwind 3.3.3, Prisma 5.3.0, PostgreSQL, Docker, DjangoRestFramework(API)

![Project Screenshot](./img/lms_screenshot.gif)

This repository is an ongoing enhancement of the original LMS platform created by CodeWithAntonio with the goal to decouple & implement extra features

- 📊 Dashboard Display with RBAC between Students, Teachers & the general Public (Anonymous)
- 🚫 Decouple Dependency on Clerk for Api Authentication to enable custom backend apis like DRF, Spring, Expressjs ✅
- 🌐 DB Connection from online hosted platforms to local Instance support. ✅
- 💳 Integrate more Payment Processing Platforms like (Flutterwave, Paystack)
- 🎥 Include extra Video Streaming Platforms like YouTube & Vimeo
- 🐳 Implement Docker & Kubernetes for dependency isolation and scaling.
- 🌍 Include Localization Support for students in multiple countries
- 📂 Include extra file upload platforms like S3
- 🧠 Live Classroom Collaboration Between students for Brainstorming, Debates and Presentations.
- 📈 Advanced Logging System with Grafana & Apache Kafka for anomaly detection in login & payments.
- ⭐ Course Rating System

[Tutorial](https://www.youtube.com/watch?v=Big_aFLmekI)

Key Features:

- 🔍 Browse & Filter Courses
- 💳 Purchase Courses using Stripe
- ✔️ Mark Chapters as Completed or Uncompleted
- 📊 Progress Calculation of each Course
- 👩‍🎓 Student Dashboard
- 👨‍🏫 Teacher Mode
- ➕ Create New Courses
- 📚 Create New Chapters
- 🔄 Easily Reorder Chapter Position with Drag n’ Drop
- 📤 Upload Thumbnails, Attachments, and Videos using UploadThing
- 🎬 Video Processing using Mux
- ▶️ HLS Video Player using Mux
- 📝 Rich Text Editor for Chapter Description
- 🔐 Authentication
- 🔗 ORM using Prisma
- 🗄️ Postgres Database

## Prerequisites

### Cloning the repository

```shell
git clone https://github.com/MrChike/LMS.git
```

### Install packages

```shell
npm install
```

### Setup .env file

```bash
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_TEACHER_ID=
NEXT_PUBLIC_BACKEND_API_URL=
DATABASE_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
STRIPE_WEBHOOK_SECRET=
STRIPE_API_KEY=
```

### Setup Prisma

```shell
npx prisma migrate reset
npx prisma generate
npx prisma db push
npx prisma studio
```

### Start the app

```shell
npm run dev # For Local Interactive Development
npm run build # For Production Environment Simulation
npm run export # For Static Files Build
npm start # For Running your application
```