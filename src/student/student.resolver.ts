import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student, { name: 'createStudent' })
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.create(createStudentInput);
  }

  @Mutation(() => [Student], { name: 'createBulkStudents' })
  createBulkStudents(
    @Args({ name: 'createStudentInputBulk', type: () => [CreateStudentInput] })
    createStudentInputBulk: CreateStudentInput[],
  ) {
    return this.studentService.createBulk(createStudentInputBulk);
  }

  @Query(() => [Student], { name: 'getAllStudent' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => Student, { name: 'getStudent' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    return this.studentService.update(
      updateStudentInput.id,
      updateStudentInput,
    );
  }

  @Mutation(() => Student, { name: 'removeStudent' })
  removeStudent(@Args('id', { type: () => Number }) id: number) {
    return this.studentService.remove(id);
  }
}
