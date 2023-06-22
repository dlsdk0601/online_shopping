import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

// history X user secondary
@Entity("subscribe_history_user")
export class SubscribeHistoryUser extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  // @ManyToOne(() => SubscribeHistory, (history) => history.historyUsers)
  // history: SubscribeHistory;
  //
  // @ManyToOne(() => User, { onDelete: "CASCADE" })
  // user: User;
}
