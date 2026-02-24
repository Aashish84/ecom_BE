// This is your runtime Prisma client, used inside your app.
const { PrismaClient } = require('../../generated/prisma/client');
const { PrismaPg } = require("@prisma/adapter-pg");
require('dotenv').config();

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;