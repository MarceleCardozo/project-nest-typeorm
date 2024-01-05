import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDTO) {
    const { username, email, password } = createUserDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      id: randomUUID(),
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return {
      message: 'Usuário Criado com sucesso',
      data: user,
    };
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    return user;
  }

  async update(id: string, updateUserDTO: UserDTO) {
    const { username, email, password } = updateUserDTO;

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    await this.userRepository.remove(user);

    return {
      message: 'Usuário deletado com sucesso.',
      data: user,
    };
  }
}
