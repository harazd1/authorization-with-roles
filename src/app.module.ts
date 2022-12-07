import { Module } from '@nestjs/common';
import path from "path";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import {User} from "./users/users.model";
import {Post} from "./posts/posts.model";
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { PostsModule } from "./posts/posts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true
    }),
    UsersModule,
    PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
