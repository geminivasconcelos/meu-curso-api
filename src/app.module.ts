import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { InstitutionModule } from './institution/institution.module';
import { CourseModule } from './course/course.module';


@Module({
  imports: [
    CourseModule,
    UserModule,
    InstitutionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
