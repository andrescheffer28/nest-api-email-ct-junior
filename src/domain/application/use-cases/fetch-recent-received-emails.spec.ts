import { InMemoryEmailsRepository } from "test/repositories/in-memory-emails-repository"
import { FetchRecentReceivedEmailsUseCase } from "./fetch-recent-received-emails"
import { makeEmail } from "test/factories/make-email"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

let inMemoryEmailsRepository: InMemoryEmailsRepository
let sut: FetchRecentReceivedEmailsUseCase

describe('Fetch Recent Received Emails', () => {
    beforeEach(() => {
        inMemoryEmailsRepository = new InMemoryEmailsRepository(),
        sut = new FetchRecentReceivedEmailsUseCase(
            inMemoryEmailsRepository,
        )
    })

    it('should be able to fetch recent received emails', async () => {

        await inMemoryEmailsRepository.create(
            makeEmail({
                receiverId: new UniqueEntityID('123456'),
                createdAt: new Date(2024, 9, 3),
            })
        )

        await inMemoryEmailsRepository.create(
            makeEmail({
                receiverId: new UniqueEntityID('123456'),
                createdAt: new Date(2024, 9, 4),
            })
        )

        await inMemoryEmailsRepository.create(
            makeEmail({
                receiverId: new UniqueEntityID('123456'),
                createdAt: new Date(2024, 9, 5),
            })
        )

        const result = await sut.execute({
            receiverId: '123456',
        })

        expect(result.value?.emails).toEqual([
            expect.objectContaining({ createdAt: new Date(2024, 9, 5)}),
            expect.objectContaining({ createdAt: new Date(2024, 9, 4)}),
            expect.objectContaining({ createdAt: new Date(2024, 9, 3)}),
        ])
    })
})