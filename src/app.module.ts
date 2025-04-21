// ====== src/app.module.ts ======
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

// Feature Modules
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { UserController } from './user/user.controller';
import { TaskController } from './task/task.controller';

// Entities
import { User } from './user/entities/user.entity';
import { Task } from './task/entities/task.entity';

// Middleware
import { AuthMiddleware } from './auth/auth.middleware';
import { SocketModule } from './websocket/socket.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST!,
      port: parseInt(process.env.POSTGRES_PORT!) || 5432,
      username: process.env.POSTGRES_USER!,
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DB!,
      autoLoadEntities: true,
      entities: [User, Task],
      synchronize: true, // Set to false in production
      extra: {
        ssl: {
          rejectUnauthorized: false, // Needed for `pg` driver as well
        },
      },
    }),
    MongooseModule.forRoot(
      (() => {
        if (!process.env.MONGO_URI) {
          throw new Error('MONGO_URI is not defined in .env');
        }
        return process.env.MONGO_URI;
      })(),
    ),
    RedisModule,
    AuthModule,
    UserModule,
    TaskModule,
    SocketModule,
    LogsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController, TaskController);
  }
}
