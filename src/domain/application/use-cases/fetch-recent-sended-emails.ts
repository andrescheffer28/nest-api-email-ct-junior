import { Either, right } from "@/core/either"
import { Email } from "@/domain/enterprise/entities/email"
import { EmailsRepository } from "../repositories/emails-repository"

interface FetchRecentSendedEmailsUseCaseRequest {
    senderId: string
}

type FetchRecentSendedEmailsUseCaseResponse = Either<
    null,
    {
        emails: Email[]
    }
>

export class FetchRecentSendedEmailsUseCase {
    constructor(
        private emailsRepository: EmailsRepository,
    ) {}

    async execute({
        senderId,
    }: FetchRecentSendedEmailsUseCaseRequest): Promise<FetchRecentSendedEmailsUseCaseResponse> {

        const emails = await this.emailsRepository.findManyBySenderId(senderId)
        
        return right({
            emails,
        })
    }
}
