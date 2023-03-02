import { IsEmail, IsNotEmpty } from 'class-validator'

export class GoogleUserDto {
  @IsNotEmpty()
  displayName: string
  @IsEmail()
  email: string
}
