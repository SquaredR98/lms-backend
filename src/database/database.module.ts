import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './database.config';
import * as fs from 'fs';
import * as path from 'path';

function discoverEntitiesAndRepositories() {
  const entitiesRoot = path.join(__dirname, 'entities');
  const entityClasses = [];
  const repositoryClasses = [];

  if (fs.existsSync(entitiesRoot)) {
    fs.readdirSync(entitiesRoot, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .forEach(dirent => {
        const entityPath = path.join(entitiesRoot, dirent.name, 'entity');
        const repositoryPath = path.join(entitiesRoot, dirent.name, 'repository');
        if (fs.existsSync(entityPath + '.ts') || fs.existsSync(entityPath + '.js')) {
          const entityModule = require(entityPath);
          const entityClass = Object.values(entityModule)[0];
          entityClasses.push(entityClass);
        }
        if (fs.existsSync(repositoryPath + '.ts') || fs.existsSync(repositoryPath + '.js')) {
          const repoModule = require(repositoryPath);
          const repoClass = Object.values(repoModule)[0];
          repositoryClasses.push(repoClass);
        }
      });
  }

  return { entityClasses, repositoryClasses };
}

const { entityClasses, repositoryClasses } = discoverEntitiesAndRepositories();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(entityClasses),
  ],
  providers: [...repositoryClasses],
  exports: [...repositoryClasses],
})
export class DatabaseModule {} 