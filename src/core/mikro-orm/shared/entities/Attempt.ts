import { Entity, Property, PrimaryKey, OptionalProps, ManyToOne, OneToMany, Collection } from "@mikro-orm/core";
import uuid from "binary-uuid";
import { UuidBinaryType } from "../types/UuidBinaryType";
import AttemptAnswer from "./AttemptAnswer";
import Question from "./Question";

@Entity()
class Attempt {
  
  [OptionalProps]?: 'createdAt'|'nextQuestion';
  
  @PrimaryKey({ type: UuidBinaryType })
  id: string = uuid().uuid;

  @Property()
  createdAt: Date = new Date();
  
  @Property({nullable: true})
  endedAt?: Date;

  @Property({length: 64})
  name!: string;
  
  @Property()
  email!: string;

  @ManyToOne({ nullable: true, onDelete: 'set null', default: null })
  nextQuestion?: Question;
  
  @OneToMany({ entity: () => AttemptAnswer, mappedBy: 'attempt', orphanRemoval: true })
  attemptAnswers = new Collection<AttemptAnswer>(this);
}

export default Attempt;
