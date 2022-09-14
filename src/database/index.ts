import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TYPEORM } from '../config';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      ...TYPEORM,
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
      // logging: true,
    };
  }
}
