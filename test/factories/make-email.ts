import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Email, EmailProps } from '@/domain/enterprise/entities/email'

export function makeEmail(
  override: Partial<EmailProps> = {},
  id?: UniqueEntityID
) {
  const email = Email.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      receiverId: new UniqueEntityID(),
      senderId: new UniqueEntityID(),
      ...override,
    },
    id
  )

  return email
}
