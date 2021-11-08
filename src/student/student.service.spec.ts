import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let studentService: StudentService;
  const createStudentInputOne: CreateStudentInput = {
    firstName: 'test1',
    lastName: 'lastName',
    email: 'test1@gmail.com',
    dateOfBirth: new Date('1992-08-04'),
  };

  const createStudentInputTwo: CreateStudentInput = {
    firstName: 'test2',
    lastName: 'lastName',
    email: 'test2@gmail.com',
    dateOfBirth: new Date('1992-08-05'),
  };

  const updateStudentInput: UpdateStudentInput = {
    id: 1,
    firstName: 'test2',
    lastName: 'lastName',
    email: 'test2updated@gmail.com',
    dateOfBirth: new Date('1992-08-05'),
  };

  const studentOne: Student = {
    id: 1,
    firstName: 'test1',
    lastName: 'lastName',
    email: 'test1@gmail.com',
    dateOfBirth: new Date('1992-08-04'),
  };

  const studentTwo: Student = {
    id: 2,
    firstName: 'test2',
    lastName: 'lastName',
    email: 'test2@gmail.com',
    dateOfBirth: new Date('1992-08-05'),
  };

  const updatedStudent: Student = {
    id: 1,
    firstName: 'test2',
    lastName: 'lastName',
    email: 'test2updated@gmail.com',
    dateOfBirth: new Date('1992-08-05'),
  };

  const studentRepository = {
    create: jest
      .fn()
      .mockImplementation(() => Promise.resolve(studentOne))
      .mockImplementation(() => Promise.resolve([studentOne, studentTwo])),
    findOne: jest.fn(() => {
      return {
        ...createStudentInputOne,
      };
    }),
    find: jest.fn().mockImplementation(() => Promise.resolve([studentOne])),
    remove: jest.fn().mockImplementation(() => studentOne),
    save: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(studentOne))
      .mockImplementationOnce(() => Promise.resolve([studentOne, studentTwo]))
      .mockImplementationOnce(() => Promise.resolve(updatedStudent)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepository,
        },
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  it('should return create students', async () => {
    expect(await studentService.create(createStudentInputOne)).toEqual(
      studentOne,
    );
  });

  it('should return all students', async () => {
    expect(await studentService.findAll()).toEqual([studentOne]);
  });

  it('should delete student', async () => {
    expect(await studentService.remove(1)).toEqual({ ...studentOne });
  });

  it('should return create bulk students', async () => {
    expect(
      await studentService.createBulk([
        createStudentInputOne,
        createStudentInputTwo,
      ]),
    ).toEqual([studentOne, studentTwo]);
  });

  it('should return updated students', async () => {
    expect(await studentService.update(1, updateStudentInput)).toEqual(
      updatedStudent,
    );
  });
});
