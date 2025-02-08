import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { AllExceptionsFilter } from "./app/core/common/filters/all-exceptions.filter";
import "dotenv/config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CLIENT_HOST,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  });
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
