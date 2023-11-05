export class CreatePostDto {
    readonly content: string
    readonly type: 'default' | 'poll' = "default"

}