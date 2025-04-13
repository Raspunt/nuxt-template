import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { UserCreateInput } from '~/types/user';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const input: UserCreateInput = await readBody(event);

    console.log(input)

    if (!input.email || !input.password || !input.userType) {
        throw createError({ statusCode: 400, message: 'Email, password, and userType are required' });
    }


    const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
    });

    if (existingUser) {
        throw createError({ statusCode: 400, message: 'User with this email already exists' });
    }

    if (input.userType === 'LEGAL') {
        if (!input.companyName || !input.bin || !input.legalAddress) {
            throw createError({
                statusCode: 400,
                message: 'Company name, BIN, and legal address are required for legal users',
            });
        }
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
        data: {
            email: input.email,
            firstName: input.firstName,
            secondName: input.secondName,
            lastName: input.lastName,
            password: hashedPassword,
            userType: input.userType,
            companyName: input.companyName,
            bin: input.bin,
            legalAddress: input.legalAddress,
            createdAt: input.createdAt ?? new Date(),
        },
    });

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            userType: user.userType,
        },
    };
});
