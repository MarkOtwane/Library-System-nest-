import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from 'src/api-response/api-response.interface';
import { CreateMemberDto } from './Dto/create';
import { UpdateMemberDto } from './Dto/update';
import { Members } from './interface/members.interface';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateMemberDto): ApiResponse<Members> {
    try {
      const member = this.membersService.create(data);
      return {
        success: true,
        message: 'Member registered successfully',
        data: member,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to register member',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string): ApiResponse<Members> {
    try {
      const member = this.membersService.findByEmail(email);
      return {
        success: true,
        message: 'Member by email found',
        data: member,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Member with email not found',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }

  @Patch(':memberID')
  update(
    @Param('memberID') memberID: string,
    @Body() data: UpdateMemberDto,
  ): ApiResponse<Members> {
    try {
      const member = this.membersService.update(memberID, data);
      return {
        success: true,
        message: 'Member info updated successfully',
        data: member,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Member info failed to update',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }

  @Delete(':memberID')
  remove(@Param('memberID') memberID: string): ApiResponse<null> {
    try {
      const result = this.membersService.remove(memberID);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete',
        error: error instanceof Error ? error.message : 'unknown error',
      };
    }
  }
}
