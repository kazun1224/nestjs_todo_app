import { Controller, UseGuards, Body, Get, Patch, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

// UseGuards(AuthGuard())を使用するとjWTでプロテクトできる
// 下記でuserの全てのエンドポイントでプロテクトできる
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginUser(@Req() req: Request): Omit<User, 'hashedPassword'> {
    return req.user;
  }

  @Patch()
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }
}
