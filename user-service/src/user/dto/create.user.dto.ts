import {
  IsString,
  IsEnum,
  Length,
  // Validate,
  IsOptional,
} from 'class-validator';
// import {
//   IsUniqueConstraint,
//   IsUserAlreadyExist,
// } from 'src/user/validation/isUnique.validation';

export class CreateUserDto {
  @IsString()
  @Length(5, 20)
  // @Validate(IsUniqueConstraint)
  // @IsUserAlreadyExist({ message: 'کاربری با این آیدی وجود دارد ' })
  userName: string;

  // @IsString()
  // id: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  // @IsString()
  // @IsEmail()
  // @IsDefined()
  // email?: string;
}
