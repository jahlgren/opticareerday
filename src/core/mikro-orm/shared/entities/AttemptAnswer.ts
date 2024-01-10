import { Entity, Property, PrimaryKey, OptionalProps, ManyToOne, Unique } from "@mikro-orm/core";
import uuid from "binary-uuid";
import { UuidBinaryType } from "../types/UuidBinaryType";
import Answer from "./Answer";
import Question from "./Question";

@Entity()
@Unique({ properties: ['attempt', 'question'] })
class AttemptAnswer {
  
  [OptionalProps]?: 'createdAt';

  @PrimaryKey({ type: UuidBinaryType })
  id: string = uuid().uuid;

  @ManyToOne({ entity: 'Attempt', onDelete: 'cascade' })
  attempt!: unknown;
  
  @ManyToOne()
  question!: Question;

  @ManyToOne()
  answer!: Answer;

  @Property()
  createdAt: Date = new Date();

}

export default AttemptAnswer;
