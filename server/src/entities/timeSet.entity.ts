import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export default abstract class TimeSet extends BaseEntity {
  @CreateDateColumn({ comment: "생성 일자", nullable: false })
  create_at: Date;

  @UpdateDateColumn({ comment: "수정 일자", nullable: true })
  update_at: Date | null;

  @DeleteDateColumn({ comment: "삭제 일자", nullable: true })
  delete_at: Date | null;
}
