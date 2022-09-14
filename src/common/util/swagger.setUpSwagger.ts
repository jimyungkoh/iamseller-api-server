import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setUpSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('iamseller api')
    .setDescription('쇼핑몰 관리 페이지의 REST 서버 API 입니다!')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
