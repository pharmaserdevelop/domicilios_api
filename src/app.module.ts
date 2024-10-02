import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { ZonesModule } from './zones/zones.module';
import { AddressessModule } from './addresses/addresses.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { ValidationModule } from './validation/validation.module';
import { DebtsModule } from './debts/debts.module';
import { StatusAddressesModule } from './status-addresses/status-addresses.module';
import { StateHistoryModule } from './state_history/state_history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT, 10),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    RolesModule,
    UsersModule,
    StatusAddressesModule,
    ZonesModule,
    AddressessModule,
    DebtsModule,
    AuthModule,
    SeedModule,
    ValidationModule,
    StateHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
