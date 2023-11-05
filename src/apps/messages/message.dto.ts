export class CreateMessageDTO {
    readonly targetUserId: number
    readonly content: string
}

export class EditMessageDTO {
    readonly content: string
}