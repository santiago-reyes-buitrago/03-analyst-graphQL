import {join} from "path";
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {ApolloServerPluginLandingPageLocalDefault} from "@apollo/server/plugin/landingPage/default";
import {ItemsModule} from './items/items.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {JwtService} from "@nestjs/jwt";


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: (jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({req}) => {
          const token: string = req.headers.authorization?.replace('Bearer','').trim()
          if (!token) throw new Error('No token provided');
          const payload = jwtService.decode(token);
          if (!payload) throw new Error('Invalid token');
        },
      }),

    }),
    ItemsModule,
    UsersModule,
    AuthModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
