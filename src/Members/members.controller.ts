import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpCode,
  // HttpStatus,
  Param,
  // Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMemberDto } from './Dto/create';
import { UpdateMemberDto } from './Dto/update';
import { Members } from './interface/members.interface';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateMemberDto): Members {
    return this.membersService.create(data);
    // try {
    //   const member = this.membersService.create(data);
    //   return {
    //     success: true,
    //     message: 'Member registered successfully',
    //     data: member,
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: 'Failed to register member',
    //     error: error instanceof Error ? error.message : 'unknown error',
    //   };
    // }
  }

  // find all
  @Get()
  findAll(): Members[] {
    return this.membersService.findAll();
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string): Members {
    return this.membersService.findByEmail(email);
    // try {
    //   const member = this.membersService.findByEmail(email);
    //   return {
    //     success: true,
    //     message: 'Member by email found',
    //     data: member,
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: 'Member with email not found',
    //     error: error instanceof Error ? error.message : 'unknown error',
    //   };
    // }
  }
  @Put('email:email')
  // @Patch('memberID:memberID')
  update(
    @Param('email') email: string,
    @Body() data: UpdateMemberDto,
  ): Members {
    return this.membersService.update(email, data);
    //   return {
    //     success: true,
    //     message: 'Member info updated successfully',
    //     data: member,
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     message: 'Member info failed to update',
    //     error: error instanceof Error ? error.message : 'unknown error',
    //   };
    // }
  }

  @Delete('delete/:email')
  delete(@Param('email') email: string): { message: string } {
    return this.membersService.delete(email);
  }
}
export { MembersService };
