import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { UserCreateInput } from '~/types/user';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const input: UserCreateInput = await readBody(event);

    const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
    });

    

    if (existingUser) {
        console.error('Пользователь с таким email уже существует:', input.email);
        throw createError({ statusCode: 400, message: 'User with this email already exists' });
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

    console.log('Пользователь успешно создан:', user);

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            userType: user.userType,
        },
    };
});
