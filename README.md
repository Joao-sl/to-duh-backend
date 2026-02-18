<div align="center">
  <h1 align="center" >TO DUH - BACKEND</h3>
</div>
<p align="center" style="font-style: italic">To Duh is a task management backend built with <a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer">NestJS</a> and
<a href="https://typeorm.io/" target="_blank" rel="noopener noreferrer">TypeORM</a> using PostgreSQL. It provides a robust API for user authentication, project, section, and task management.</p>

---

## Features

- **User Management:** Register, login (JWT), update, and delete users.
- **Authentication:** JWT-based authentication, refresh tokens, and protected
  routes.
- **Projects:** CRUD operations for projects, with support for favorites and
  archiving.
- **Sections:** Organize projects into sections, with full CRUD support.
- **Tasks:** Manage tasks within sections/projects, including priorities,
  completion, and due dates.
- **Rate Limiting & Security:** Throttling and security headers (Helmet) in
  production.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database (recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Joao-sl/to-duh-backend.git
   cd to-duh-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment:**
   ```bash
   # Copy `.env-example` to `.env` and fill the variables.
   ```
4. **Run the development server:**
   ```bash
   npm run start:dev
   ```
   The API will be available at `http://localhost:3000` (or the port you set in
   `.env`).

---

## Scripts

- `npm run start` — Start server
- `npm run start:dev` — Start server in watch mode
- `npm run start:prod` — Start production server
- `npm run lint` — Lint code

---

## API Overview

### Auth & User

- `POST /users/register` — Register a new user
- `POST /users/login` — Login and receive JWT
- `POST /users/refresh` — Refresh JWT token
- `GET /users/me` — Get current user info (auth required)
- `PATCH /users/update` — Update user info (auth required)
- `DELETE /users/delete` — Delete user (auth required)

### Projects

- `GET /projects` — List all projects (auth required)
- `GET /projects/:id` — Get project by ID (auth required)
- `POST /projects` — Create a new project (auth required)
- `PATCH /projects/:id` — Update a project (auth required)
- `DELETE /projects/:id` — Delete a project (auth required)

### Sections

- `GET /sections` — List all sections (auth required)
- `GET /sections/:id` — Get section by ID (auth required)
- `POST /sections` — Create a new section (auth required)
- `PATCH /sections/:id` — Update a section (auth required)
- `DELETE /sections/:id` — Delete a section (auth required)

### Tasks

- `GET /tasks` — List all tasks (auth required)
- `GET /tasks/:id` — Get task by ID (auth required)
- `POST /tasks` — Create a new task (auth required)
- `PATCH /tasks/:id` — Update a task (auth required)
- `DELETE /tasks/:id` — Delete a task (auth required)

---

## Tech Stack

[![Static Badge](https://img.shields.io/badge/NestJS-%5E11.0.0-000?style=for-the-badge&logo=nestjs&logoColor=E0234E&labelColor=1d293d&color=E0234E)](https://nestjs.com/)
&nbsp;&nbsp;&nbsp;
[![Static Badge](https://img.shields.io/badge/TypeORM-%5E11.0.0-000?style=for-the-badge&logo=typeorm&logoColor=FE0803&labelColor=1d293d&color=FE0803)](https://typeorm.io/)
&nbsp;&nbsp;&nbsp;
[![Static Badge](https://img.shields.io/badge/JWT-%5E11.0.0-000?style=for-the-badge&logo=json-web-tokens&logoColor=white&labelColor=1d293d&color=cccccc)](https://jwt.io/)
&nbsp;&nbsp;&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E5-000?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=1d293d&&color=3178C6)](https://www.typescriptlang.org/)
&nbsp;&nbsp;&nbsp;
[![Static Badge](https://img.shields.io/badge/Postgres-%5E18.0.0-000?style=for-the-badge&logo=postgresql&logoColor=4169E1&labelColor=1d293d&color=4169E1)](https://www.postgresql.org/)
&nbsp;&nbsp;&nbsp;
[![Static Badge](https://img.shields.io/badge/Zod-%5E4.3.0-000?style=for-the-badge&logo=zod&logoColor=3E67B1&labelColor=1d293d&color=3E67B1)](https://zod.dev/)

---

## License

To Duh is
[MIT licensed](https://github.com/Joao-sl/to-duh-backend/blob/main/LICENSE).
