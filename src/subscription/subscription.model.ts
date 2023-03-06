import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsDateString,
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export enum EmailStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  ERROR = 'ERROR',
}

export class PagedResults<T> {

  count: number;

  results: T[];
}

export class SubscriptionDTO {

  @ApiProperty({
    type: String,
    description: 'newsletter id'
  })
  id?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'email'
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'fist name'
  })
  firstName?: string;

  @ApiProperty({
    type: String,
    description: 'last name'
  })
  lastName?: string;

  @ApiProperty({
    type: String,
    description: 'gender'
  })
  gender?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: String,
    description: 'date of bith'
  })
  dateOfBirth: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'consent'
  })
  consent: boolean;

  @IsNotEmpty()
  @IsString()
    @ApiProperty({
    type: String,
    description: 'newsletter id'
  })
  newsletterId: string;

  @ApiProperty({
    type: EmailStatus,
    description: 'email status'
  })
  emailNotificationStatus?: EmailStatus;

  @ApiProperty({
    type: String,
    description: 'created at'
  })
  createdAt?: string;

  @ApiProperty({
    type: String,
    description: 'updated at'
  })
  updatedAt?: string;
}

export class CreateSubscriptionDTO extends OmitType(SubscriptionDTO, [
  'id',
  'emailNotificationStatus',
  'createdAt',
  'updatedAt',
]) {}
