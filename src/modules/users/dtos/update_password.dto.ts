import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsOptional()
  @IsString()
  old_password: string;

  @IsNotEmpty()
  @IsString()
  new_password: string;

  @IsNotEmpty()
  @IsBoolean()
  isOauth: boolean;
}
