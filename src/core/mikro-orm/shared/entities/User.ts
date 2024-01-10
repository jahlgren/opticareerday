import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import uuid from "binary-uuid";
import { UuidBinaryType } from "../types/UuidBinaryType";

@Entity({ 
  tableName: 'app_user',
})
class User {
  
  @PrimaryKey({ type: UuidBinaryType })
  id: string = uuid().uuid

  @Property({ length: 64 })
  name!: string;

  @Property({ length: 64, unique: true })
  username!: string;

  @Property({ length: 60 })
  password!: string;
  
}

export default User;
