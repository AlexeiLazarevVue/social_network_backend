import "reflect-metadata"
import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from "@nestjs/common";
import {AppModule} from './app.module';


declare const module: any;


(async () => {
    const logger = new Logger('bootstrap')
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
})()
