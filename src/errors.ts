import {HttpException, HttpStatus} from "@nestjs/common";

/**
 * Любая ошибка в приложении, которую следует передать клиенту
 */
export class AppError extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}