import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'lms_backend',
  entities: ['src/database/entities/**/*.entity.ts'],
  migrations: ['src/database/entities/**/migrations/*.{ts,js}'],
  synchronize: false,
}); 