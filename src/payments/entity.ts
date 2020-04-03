import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ObjectType()
@Entity()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  description: string;

  @Field()
  @Column({ type: 'float', nullable: false })
  amount: number;

  @Field()
  @Column({ default: true })
  pending: boolean;

  @Field()
  @Column({ name: 'due_month', nullable: false })
  @Min(1)
  @Max(12)
  dueMonth: number;

  @Field()
  @Column({ name: 'due_year', nullable: false })
  dueYear: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
