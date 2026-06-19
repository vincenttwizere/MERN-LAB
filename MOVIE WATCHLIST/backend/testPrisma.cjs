const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    console.log('Testing prisma.user.findUnique');
    const u = await prisma.user.findUnique({ where: { email: 'cliuser2@example.com' } });
    console.log('Result:', u);
  } catch (e) {
    console.error('Prisma error:', e);
  } finally {
    await prisma.$disconnect();
  }
})();
