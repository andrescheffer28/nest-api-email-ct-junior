import { InMemoryEmailsRepository } from 'test/repositories/in-memory-emails-repository'
import { makeEmail } from 'test/factories/make-email'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchEmailByIdUseCase } from './fetch-email-by-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryEmailsRepository: InMemoryEmailsRepository
let sut: FetchEmailByIdUseCase

describe('Fetch Email by Id', () => {
  beforeEach(() => {
    inMemoryEmailsRepository = new InMemoryEmailsRepository();
    sut = new FetchEmailByIdUseCase(inMemoryEmailsRepository);
  })

  it('should be able to fetch an email', async () => {
    await inMemoryEmailsRepository.create(
      makeEmail(
        {
          receiverId: new UniqueEntityID('123456'),
        },
        new UniqueEntityID('email-01')
      )
    )

    const result = await sut.execute({
      userId: '123456',
      emailId: 'email-01',
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to fetch an email using wrong credentials', async () => {
    await inMemoryEmailsRepository.create(
      makeEmail(
        {
          senderId: new UniqueEntityID('123456'),
        },
        new UniqueEntityID('email-01')
      )
    )

    const result = await sut.execute({
      userId: 'wrong',
      emailId: 'email-01',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should be able to update the email view status when searching by id', async () => {
    await inMemoryEmailsRepository.create(
      makeEmail(
        {
          receiverId: new UniqueEntityID('123456'),
        },
        new UniqueEntityID('email-01')
      )
    )

    await inMemoryEmailsRepository.create(
      makeEmail(
        {
          receiverId: new UniqueEntityID('123456'),
        },
        new UniqueEntityID('email-02')
      )
    )

    const result = await sut.execute({
      userId: '123456',
      emailId: 'email-01',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryEmailsRepository.items[0].isSeen).toBe(true)
    expect(inMemoryEmailsRepository.items[1].isSeen).toBe(false)
  })
})
