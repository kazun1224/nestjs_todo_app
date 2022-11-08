import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // アプリケーションすべてに適応させる
  // whitelistはauth.dto.tsで記述した値以外は省いてくれる仕様になる
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // backendのサービスにアクセスするフロントエンドのドメインを設定
  app.enableCors({
    // cookieでやり取りするのでtrue
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  // cookieを解析するための処理
  app.use(cookieParser());
  // csrfを読み込む処理
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: false,
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    }),
  );
  // 本番環境は環境変数を使用する(process.env.PORT)
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
