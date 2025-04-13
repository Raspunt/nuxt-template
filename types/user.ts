import type { UserType } from '@prisma/client';




export interface UserCreateInput {
    email: string;
    firstName?: string | null;
    secondName?: string | null;
    lastName?: string | null;
    password: string;
    userType: UserType;
    companyName?: string | null;
    bin?: string | null;
    legalAddress?: string | null;
    createdAt?: Date;
}
