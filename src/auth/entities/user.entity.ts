import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

import { ObjectID } from 'mongodb'


@Entity('users')
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

}
