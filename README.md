1. Create database tables (with a schema migration)
Next, you need to create the tables in your database. You can do this by creating and executing a schema migration with the following command of the Prisma CLI:

  npx prisma migrate dev --name init

2. Generer les entites:

  npx prisma generate

3. Lancement serveur Local:

  npx ts-node src/server.ts