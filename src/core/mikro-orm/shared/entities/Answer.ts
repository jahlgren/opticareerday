import { Entity, Property, PrimaryKey, JsonType, ManyToOne } from "@mikro-orm/core";
import { Cascade } from "@mikro-orm/core/enums";
import uuid from "binary-uuid";
import { UuidBinaryType } from "../types/UuidBinaryType";
import Question from "./Question";

@Entity()
class Answer {
  
  @PrimaryKey({ type: UuidBinaryType })
  id: string = uuid().uuid;

  @Property({ type: JsonType })
  content!: { sv: string, fi: string };
  
  @Property()
  isCorrect!: boolean;

  @ManyToOne({ onDelete: 'cascade' })
  question!: Question;

}

export default Answer;
