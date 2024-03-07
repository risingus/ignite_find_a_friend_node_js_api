import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '@/repositories/orgs-repository'


export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email
      }
    })
    return org
  }
}
