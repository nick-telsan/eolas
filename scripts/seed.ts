import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/api'

export default async () => {
  try {
    const [hashedPassword, salt] = hashPassword('password')

    await db.user.createMany({
      data: [
        {
          email: 'nick@telsanstudios.com',
          hashedPassword,
          salt,
          roles: 'admin',
        },
        {
          email: 'nick+user@telsanstudios.com',
          hashedPassword,
          salt,
          roles: 'user',
        },
      ],
    })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
