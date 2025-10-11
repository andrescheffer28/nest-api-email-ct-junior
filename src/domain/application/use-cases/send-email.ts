import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Email } from '@/domain/enterprise/entities/email'
import { EmailsRepository } from '../repositories/emails-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepository } from '../repositories/users-repository'

interface SendEmailUseCaseRequest {
  senderId: string
  receiverId: string
  title: string
  content: string
}

type SendEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    email: Email
  }
>

export class SendEmailUseCase {
  constructor(
    private emailsRepository: EmailsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    title,
    content,
    senderId,
    receiverId,
  }: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse> {
    const receiverExists = await this.usersRepository.findById(receiverId)

    if (!receiverExists) {
      return left(new ResourceNotFoundError())
    }

    const email = Email.create({
      title,
      content,
      senderId: new UniqueEntityID(senderId),
      receiverId: new UniqueEntityID(receiverId),
      isSeen: false,
    })

    await this.emailsRepository.create(email)

    return right({
      email,
    })
  }
}
