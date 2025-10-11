import { InMemoryEmailsRepository } from 'test/repositories/in-memory-emails-repository'
import { FetchRecentSendedEmailsUseCase } from './fetch-recent-sended-emails'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeEmail } from 'test/factories/make-email'

let inMemoryEmailsRepository: InMemoryEmailsRepository
let sut: FetchRecentSendedEmailsUseCase

describe('Fetch Recent Sended Emails', () => {
  beforeEach(() => {
    inMemoryEmailsRepository = new InMemoryEmailsRepository();
    sut = new FetchRecentSendedEmailsUseCase(inMemoryEmailsRepository);
  })

  it('should be able to fetch recent sended emails', async () => {
    await inMemoryEmailsRepository.create(
      makeEmail({
        senderId: new UniqueEntityID('123456'),
        createdAt: new Date(2024, 9, 3),
      })
    )

    await inMemoryEmailsRepository.create(
      makeEmail({
        senderId: new UniqueEntityID('123456'),
        createdAt: new Date(2024, 9, 4),
      })
    )

    await inMemoryEmailsRepository.create(
      makeEmail({
        senderId: new UniqueEntityID('123456'),
        createdAt: new Date(2024, 9, 5),
      })
    )

    const result = await sut.execute({
      senderId: '123456',
    })

    expect(result.value?.emails).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 9, 5) }),
      expect.objectContaining({ createdAt: new Date(2024, 9, 4) }),
      expect.objectContaining({ createdAt: new Date(2024, 9, 3) }),
    ])
  })
})
