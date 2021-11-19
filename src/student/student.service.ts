/* eslint-disable prefer-const */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    let student = this.studentRepository.create(createStudentInput);
    return await this.studentRepository.save(student);
  }

  async createBulk(
    createStudentInputBulk: CreateStudentInput[],
  ): Promise<Student[]> {
    let students = this.studentRepository.create(createStudentInputBulk);
    return await this.studentRepository.save(students);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    return await this.studentRepository.findOne(id);
  }

  async update(
    id: number,
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    let student = await this.studentRepository.findOne(id);
    if (student == null) {
      throw new NotFoundException('student not found');
    }

    let updateStudent = this.studentRepository.create(updateStudentInput);
    updateStudent.id = id;
    return await this.studentRepository.save(updateStudent);
  }

  async remove(id: number): Promise<Student> {
    let student = await this.studentRepository.findOne(id);
    if (student == null) {
      throw new NotFoundException('student not found');
    }

    return await this.studentRepository.remove(student);
  }
}
