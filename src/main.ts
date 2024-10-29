import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./application/pipes/validation.pipe";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  // Configuración CORS
  app.enableCors({
    origin: /^http:\/\/localhost:\d+$/,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  });
  const config = new DocumentBuilder()
  .setTitle('Integradora API')
  .setDescription('Aplicación de gestion de Inventario')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      shoRequestDuration: true,
    },
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
