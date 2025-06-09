import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorsService } from '../Authors/authors.service';
import { CreateAuthorDto } from '../Authors/Dto/create';
import { UpdateAuthorDto } from '../Authors/Dto/update';
import { Authors } from '../Authors/interfaces/authors.interface';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  // Create a new author
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Authors {
    return this.authorsService.create(createAuthorDto);
  }

  // Get all authors
  @Get()
  findAll(): Authors[] {
    return this.authorsService.findAll();
  }

  // Get a single author by name
  @Get(':name')
  findOne(@Param('name') name: string): Authors {
    return this.authorsService.findOne(name);
  }

  // Update an author by name
  @Put(':name')
  update(
    @Param('name') name: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Authors {
    return this.authorsService.update(name, updateAuthorDto);
  }

  // Delete an author (soft delete / remove)
  @Delete('remove/:name')
  remove(@Param('name') name: string): { message: string } {
    return this.authorsService.remove(name);
  }

  // Delete an author permanently
  @Delete('delete/:name')
  delete(@Param('name') name: string): { message: string } {
    return this.authorsService.delete(name);
  }
}
export { AuthorsService };
