import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as yaml from 'yaml';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;
  app.enableCors();

  const __dirname = path.resolve();
  const path_yaml = path.join(__dirname, 'doc', 'api.yaml');
  const yamlString = fs.readFileSync(path_yaml, 'utf-8');
  const docYaml = yaml.parse(yamlString);
  SwaggerModule.setup('doc', app, docYaml);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
