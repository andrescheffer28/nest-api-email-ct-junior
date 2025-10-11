import { InMemoryEmailsRepository } from 'test/repositories/in-memory-emails-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { SendEmailUseCase } from './send-email'
import { makeUser } from 'test/factories/make-user'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryEmailsRepository: InMemoryEmailsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: SendEmailUseCase

describe('Send Email', () => {
  beforeEach(() => {
    inMemoryEmailsRepository = new InMemoryEmailsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new SendEmailUseCase(
      inMemoryEmailsRepository,
      inMemoryUsersRepository
    )
  })

  it('should be able to send an email to an existing user', async () => {
    const sender = makeUser()
    const receiver = makeUser()

    inMemoryUsersRepository.items.push(sender)
    inMemoryUsersRepository.items.push(receiver)

    const result = await sut.execute({
      title: 'Alienista',
      content: 'Email content',
      senderId: sender.id.toString(),
      receiverId: receiver.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      email: inMemoryEmailsRepository.items[0],
    })
  })

  it('should not be able to send an email to a not existing user', async () => {
    const sender = makeUser()

    inMemoryUsersRepository.items.push(sender)

    const result = await sut.execute({
      title: 'Alienista',
      content: 'Email content',
      senderId: sender.id.toString(),
      receiverId: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
