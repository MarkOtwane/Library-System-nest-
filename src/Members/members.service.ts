import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './Dto/create';
import { UpdateMemberDto } from './Dto/update';
import { Members } from './interface/members.interface';

@Injectable()
export class MembersService {
  private members: Members[] = [
    {
      name: 'Mark Otwane',
      email: 'otwanemark254@gmail.com',
      memberID: 'MOJK1',
      phone: '+25411111111',
    },
    {
      name: 'Joe Kelvin',
      email: 'joekelvin254@gmail.com',
      memberID: 'JKK1',
      phone: '+2540000000',
    },
    {
      name: 'John Doe',
      email: 'johndoe254@gmail.com',
      memberID: 'JDK1',
      phone: '+2540000001',
    },
  ];

  create(data: CreateMemberDto): Members {
    const availableMembers = this.members.find(
      (member) => member.email === data.email,
    );

    if (availableMembers) {
      throw new ConflictException(
        `Member with this email ${data.email} already exists`,
      );
    }

    const newMember: Members = {
      name: data.name,
      email: data.email,
      memberID: data.memberID,
      phone: data.phone,
    };
    this.members.push(newMember);
    return newMember;
  }

  findAll(): Members[] {
    return this.members;
  }

  findOne(id: string): Members {
    const member = this.members.find((member) => member.memberID === id);
    if (!member) {
      throw new ConflictException(`Member with ID ${id} not found`);
    }
    return member;
  }

  findByEmail(email: string): Members {
    const member = this.members.find((member) => member.email === email);
    if (!member) {
      throw new ConflictException(`Member with email ${email} not found`);
    }
    return member;
  }

  update(memberID: string, data: UpdateMemberDto): Members {
    const memberIndex = this.members.findIndex(
      (member) => member.memberID === memberID,
    );

    if (memberIndex === -1) {
      throw new NotFoundException(`Member with id ${memberID} not found`);
    }

    if (data.email) {
      const existingMember = this.members.find(
        (member) => member.email === data.email && member.memberID !== memberID,
      );

      if (existingMember) {
        throw new ConflictException('Another Member with this email exists');
      }
    }

    this.members[memberIndex] = {
      ...this.members[memberIndex],
      ...data,
    };

    return this.members[memberIndex];
  }

  remove(memberID: string): { message: string } {
    const memberIndex = this.members.findIndex(
      (member) => member.memberID === memberID,
    );
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with id ${memberID} not found`);
    }

    return {
      message: `Member ${this.members[memberIndex].name} checked out successfully`,
    };
  }

  delete(memberID: string): { message: string } {
    const memberIndex = this.members.findIndex(
      (member) => member.memberID === memberID,
    );
    if (memberIndex === -1) {
      throw new NotFoundException(`Member with id ${memberID} not found`);
    }
    const deletemember = this.members.splice(memberIndex, 1)[0];

    return {
      message: `Member ${deletemember.name} permanently deleted`,
    };
  }
}
