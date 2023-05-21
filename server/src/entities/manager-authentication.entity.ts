import { Entity, ManyToOne } from "typeorm";
import Manager from "./manager.entity";
import Auth from "./authentication.entity";

@Entity("authentication")
export default class Authentication extends Auth {
  @ManyToOne(() => Manager, (manager) => manager.authentications, { onDelete: "CASCADE" })
  manager: Manager;
}
