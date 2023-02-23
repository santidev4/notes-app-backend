import { IsNotEmpty } from 'class-validator'

export class UserLoginDto {
  @IsNotEmpty()
  email: string
  password: string
}
