import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Logger } from '@nestjs/common';

@Resolver(() => Student)
export class StudentResolver {
  private readonly logger = new Logger(StudentService.name);
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => Student, { name: 'createStudent' })
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    try {
      return this.studentService.create(createStudentInput);
    } catch (e) {
      this.logger.error(new Date().toUTCString() + '\n' + e.message);
    }
  }

  @Mutation(() => [Student], { name: 'createBulkStudents' })
  createBulkStudents(
    @Args({ name: 'createStudentInputBulk', type: () => [CreateStudentInput] })
    createStudentInputBulk: CreateStudentInput[],
  ) {
    try {
      return this.studentService.createBulk(createStudentInputBulk);
    } catch (e) {
      this.logger.error(new Date().toUTCString() + '-' + e.message);
    }
  }

  @Query(() => [Student], { name: 'getAllStudent' })
  findAll() {
    try {
      return this.studentService.findAll();
    } catch (e) {
      this.logger.error(new Date().toUTCString() + '-' + e.message);
    }
  }

  @Query(() => Student, { name: 'getStudent' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    try{
      return this.studentService.findOne(id);
    } catch (e) {
      this.logger.error(new Date().toUTCString() + '-' + e.message);
    }
  }

  @Mutation(() => Student, { name: 'updateStudent' })
  updateStudent(
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
  ) {
    try{
      return this.studentService.update(
        updateStudentInput.id,
        updateStudentInput,
      );
    }catch (e) {
      this.logger.error(new Date().toUTCString() + '-' + e.message);
    }
  }

  @Mutation(() => Student, { name: 'removeStudent' })
  removeStudent(@Args('id', { type: () => Number }) id: number) {
    try{
      return this.studentService.remove(id);
    }catch (e) {
      this.logger.error(new Date().toUTCString() + '\n' + e.message);
    }
  }
}
