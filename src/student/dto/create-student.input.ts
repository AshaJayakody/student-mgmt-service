import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field(() => Date)
  dateOfBirth: Date;
}
