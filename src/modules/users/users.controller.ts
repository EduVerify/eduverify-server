import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { Users } from 'src/entities/users.entity';
import { UpdateUserDto } from './dtos/update_user.dto';
import { UpdatePasswordDto } from './dtos/update_password.dto';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  getMe(@User() user: Users) {
    return this.usersService.getMe(user.id);
  }

  @Put('/me')
  updateMe(@User() user: Users, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Put('/me/password')
  @HttpCode(200)
  updatePassword(
    @User() user: Users,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(user.id, updatePasswordDto);
  }

  @Delete('/me')
  deleteMe(@User() user: Users) {
    return this.usersService.delete(user.id);
  }
}
