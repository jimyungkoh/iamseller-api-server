import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { TYPEORM } from '../config';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      ...TYPEORM,
      entities: [__dirname + '/../../**/**/*.entity{.ts,.js}'],
      logging: true,
    };
  }
}
