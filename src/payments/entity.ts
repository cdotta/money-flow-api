import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

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

  @Column({ default: false })
  pending: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'paid_at', nullable: true })
  paidAt: Date;
}
