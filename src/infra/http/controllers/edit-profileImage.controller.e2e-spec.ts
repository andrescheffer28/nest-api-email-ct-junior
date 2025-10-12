import { AppModule } from "@/infra/app.module"
import { DataBaseModule } from "@/infra/database/database.module"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { UserFactory } from "test/factories/make-user"
import request from 'supertest'

describe('Edit Profile Image (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DataBaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /my-image', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .patch('/my-image')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        profileImage: 'New Profile Image',
      })

    expect(response.statusCode).toBe(204)

    const questionOnDatabase = await prisma.user.findFirst({
      where: {
        profileImage: 'New Profile Image',
      },
    })
  })
})
