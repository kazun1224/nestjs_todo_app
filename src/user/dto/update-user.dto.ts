import { IsOptional, IsString } from 'class-validator';

// ユーザーの内容を変更する際のデータのDTO
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nickName?: string;
}
