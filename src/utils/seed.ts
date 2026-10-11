import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { prisma } from '../db/prisma'


async function main() {
  const name = process.env.ADMIN_NAME
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!name || !email || !password) {
    throw new Error('Missing admin seed environment variables')
  }

  if (password.length < 12) {
    throw new Error('Admin password must be at least 12 characters')
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: 'ADMIN',
      isActive: true,
      deletedAt: null,
    },
    create: {
      name,
      email,
      passwordHash,
      role: 'ADMIN',
    },
  })

  console.log(`Demo admin seeded: ${email}`)
}

main()
  .catch((error: unknown) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
