import "reflect-metadata"
import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from "@nestjs/common";
import {AppModule} from './app.module';
import {dataSource} from "./data-source"


declare const module: any;


(async () => {
    const logger = new Logger('bootstrap')
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())

    try {
        await dataSource.initialize()
        logger.log('Database successfully initialized')
    } catch (e) {
        logger.error(`DB initialization failed: ${e}`)
    }

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
})()
