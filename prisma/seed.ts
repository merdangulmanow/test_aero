import { PrismaClient } from '@prisma/client'
import { users } from './data'

const prisma = new PrismaClient();

async function main() {
  for(let user of users){
    await prisma.users.create({data: user})
  }
}

main().catch(err=>{
  console.log(err)
  process.exit(1)
}).finally(()=>{
  prisma.$disconnect()
})