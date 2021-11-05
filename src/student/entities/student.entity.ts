import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  firstName: string;
  @Field()
  @Column()
  lastName: string;
  @Field()
  @Column()
  email: string;
  @Field(() => Date)
  @Column()
  dateOfBirth: Date;
}
