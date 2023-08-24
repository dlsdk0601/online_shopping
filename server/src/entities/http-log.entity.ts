import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import TimeSet from "./timeSet.entity";

@Entity("http_service_log")
export class HttpServiceLog extends TimeSet {
  @PrimaryGeneratedColumn({ comment: "pk" })
  pk: number;

  // request
  @Column({ type: "text", nullable: false, comment: "url" })
  request_url: string;

  @Column({ type: "text", nullable: false, comment: "method" })
  request_method: string;

  @Column({ type: "jsonb", nullable: false, comment: "request - headers" })
  request_headers: any; // 헤더는 각각 달라서 any 로 정의

  @Column({ type: "text", nullable: false, comment: "request - query", default: "" })
  request_query: string;

  @Column({ type: "text", nullable: false, comment: "request - body", default: "" })
  request_body: string;

  // response
  @Column({ type: "int", nullable: false, comment: "status code" })
  response_status_code: number;

  @Column({ type: "jsonb", nullable: false, comment: "response - headers" })
  response_headers: any;

  @Column({ type: "text", nullable: false, comment: "respose - body" })
  response_body: string;

  @Column({ type: "int8", nullable: false, comment: "걸린 시간" })
  response_duration_ms: number;

  // error
  @Column({ type: "text", nullable: false, comment: "에러 메시지", default: "" })
  exception: string;
}
