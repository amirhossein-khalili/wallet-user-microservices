// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';

// @ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
// export class IsUniqueConstraint implements ValidatorConstraintInterface {
//   async validate(
//     value: any,
//     validationArguments?: ValidationArguments,
//   ): Promise<boolean> {
//     // Perform your async validation logic here
//     // Example: Check if value is unique in the database
//     return true; // Replace with actual validation logic
//   }

//   defaultMessage(validationArguments?: ValidationArguments): string {
//     return 'A user with this ID already exists.';
//   }
// }

// export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
//   return function (object: any, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsUniqueConstraint,
//     });
//   };
// }
