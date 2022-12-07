import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";

import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User

}
