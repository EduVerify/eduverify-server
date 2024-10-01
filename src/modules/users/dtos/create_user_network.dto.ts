import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateUserNetworkDto {
  @IsString()
  @IsOptional()
  token: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  social_id: string;

  @IsString()
  @IsNotEmpty()
  picture: string;
}
