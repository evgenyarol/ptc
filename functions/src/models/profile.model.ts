import {Gender} from './enums/gender.enum';

export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    birthday: number;
    gender: Gender;
    createdAt: number;
    phone: string;
    email: string;
    street: string;
    city: string;
    country: string;
    runningClub: string;
    uid: string;
    parentId: string;
    subUsers: SubUser [];
}

export interface SubUser {
    id: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    birthday: number;
    gender: Gender;
    createdAt: number;
    phone: string;
    email: string;
    street: string;
    city: string;
    country: string;
    runningClub: string;
    uid: string;
    parentId: string;
}