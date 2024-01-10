import { Entity, Property, PrimaryKey, JsonType, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import uuid from "binary-uuid";
import { UuidBinaryType } from "../types/UuidBinaryType";
import Answer from "./Answer";

@Entity()
class Question {
  
  @PrimaryKey({ type: UuidBinaryType })
  id: string = uuid().uuid;

  @Property({ type: JsonType })
  content!: { sv: string, fi: string };
  
  @OneToMany(() => Answer, answer => answer.question, { orphanRemoval: true })
  answers = new Collection<Answer>(this);

}

export default Question;
