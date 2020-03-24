import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Min, Max } from 'class-validator';

@ObjectType()
@Entity()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ type: 'float' })
  amount: number;

  @Field()
  @Column({ default: false })
  pending: boolean;

  @Field()
  @Column({ name: 'due_month', nullable: false })
  @Min(1)
  @Max(12)
  dueMonth: number;

  @Field()
  @Column({ name: 'due_year', nullable: false })
  dueYear: number;
}
