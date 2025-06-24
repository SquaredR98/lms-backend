<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# LMS Backend (NestJS, TypeORM, Modular, RBAC/ABAC)

## Project Overview
This project is a modular, scalable backend for a Learning Management System (LMS), inspired by Moodle, built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/). It is designed for enterprise-grade extensibility, security, and maintainability.

## Key Features
- **Modular Architecture:** All features (users, courses, etc.) are implemented as independent modules under `src/modules`.
- **Strict Data Layer:** All database entities and repositories are encapsulated in `src/database/entities/<table>`, never exposed directly to services or controllers.
- **RBAC & ABAC:** Role-Based and Attribute-Based Access Control, with context-aware permissions and policies.
- **Screen/Feature Access:** Fine-grained control over which users can access which screens/features, mapped to permissions.
- **Migration-Ready:** All schema changes are managed via TypeORM migrations.
- **No Swagger:** The project is currently Swagger/OpenAPI free for maximum compatibility and clean startup.

## Architecture

```
src/
├── app.module.ts
├── main.ts
├── database/
│   └── entities/
│       ├── users/
│       │   ├── entity.ts
│       │   └── repository.ts
│       ├── roles/
│       ├── permissions/
│       ├── ...
│   └── database.module.ts
├── modules/
│   └── users/
│       ├── users.controller.ts
│       ├── users.service.ts
│       └── users.module.ts
│   └── ...
```

- **Entities/Repositories:** Only repositories interact with entities. Services use repositories, not entities.
- **Modules:** Each feature (users, courses, etc.) is a self-contained module.

## RBAC/ABAC Schema
- **users:** User accounts
- **roles:** Roles (admin, teacher, student, ...)
- **permissions:** Fine-grained permissions/capabilities
- **role_permissions:** Which permissions are granted to which roles
- **user_roles:** Which roles are assigned to which users (optionally per context)
- **contexts:** Contexts (system, course, module, ...)
- **attributes:** Attribute definitions for ABAC
- **user_attributes:** User-specific attribute values
- **policies:** ABAC policies (attribute-based rules)
- **screens:** Screens/features in the LMS
- **screen_permissions:** Map screens to permissions

## API Structure (Current Example: Users)

### Users Endpoints
- `POST /users` — Create a new user
- `GET /users` — List users (with filters)
- `GET /users/:id` — Get user by ID
- `PUT /users/:id` — Update user
- `DELETE /users/:id` — Delete user
- `PUT /users/:id/activate` — Activate user
- `PUT /users/:id/deactivate` — Deactivate user
- `GET /users/stats/active-count` — Count of active users
- `GET /users/stats/inactive-count` — Count of inactive users

> **Note:** All endpoints are protected by the service/repository pattern. No direct entity access in controllers/services.

## How We Got Here
- **Initial Setup:** Started with a clean NestJS project, added TypeORM, PostgreSQL, and modular structure.
- **Strict Data Layer:** Moved all entities and repositories to their own folders, enforced repository-only access.
- **RBAC/ABAC Schema:** Designed and implemented a scalable, context-aware schema for roles, permissions, attributes, and policies.
- **Screen Access:** Added tables and logic for mapping permissions to screens/features.
- **Swagger Removal:** Removed all Swagger/OpenAPI code and dependencies for a clean, error-free build.
- **Absolute Imports:** Configured `tsconfig.json` for `@database` and `@modules` aliases for clean, maintainable imports.

## Next Steps
- Implement the RBAC/ABAC engine (service/guard logic)
- Add more modules (courses, enrollments, etc.)
- Add migrations and seeders for initial data
- (Optional) Reintroduce API documentation with a compatible tool if needed

## Contributing
- Fork, branch, and PR as usual. Follow the modular and strict data layer patterns.

## License
MIT (or your preferred license)

## Features

- 🚀 NestJS framework
- 🗄️ TypeORM with PostgreSQL
- 📚 OpenAPI/Swagger documentation
- 🔄 Database migrations
- 🏗️ Modular architecture with repositories
- ✅ Input validation with class-validator

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lms-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=lms_backend

# Application Configuration
NODE_ENV=development
PORT=3000
```

5. Create the database:

```sql
CREATE DATABASE lms_backend;
```

## Database Setup

### Running Migrations

1. Generate a new migration:

```bash
npm run migration:generate -- src/database/migrations/MigrationName
```

2. Run migrations:

```bash
npm run migration:run
```

3. Revert last migration:

```bash
npm run migration:revert
```

4. Show migration status:

```bash
npm run migration:show
```

### Database Schema

- **Users Table**: Stores user information with authentication details
- All entities are located in `src/database/entities/`
- All repositories are located in `src/database/repositories/`

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

- **URL**: http://localhost:3000/api
- **Features**: Interactive API documentation with request/response examples

## Project Structure

```
src/
├── database/
│   ├── entities/          # TypeORM entities
│   ├── repositories/      # Custom repositories with business logic
│   ├── migrations/        # Database migrations
│   ├── database.config.ts # TypeORM configuration
│   └── database.module.ts # Database module
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## Adding New Entities

1. Create the entity in `src/database/entities/`
2. Create the repository in `src/database/repositories/`
3. Export both from their respective `index.ts` files
4. Generate and run migrations

## Available Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run tests
- `npm run migration:generate` - Generate new migration
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration
- `npm run migration:show` - Show migration status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
