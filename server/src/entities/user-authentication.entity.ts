import { Entity, ManyToOne } from "typeorm";
import Auth from "./authentication.entity";
import { LocalUser } from "./local-user.entity";
import { GoogleUser } from "./google-user.entity";
import { KakaoUser } from "./kakao-user.entity";
import { NaverUser } from "./naver-user.entity";

@Entity("local_authentication")
export class LocalAuthentication extends Auth {
  @ManyToOne(() => LocalUser, (localUser) => localUser.auth, { onDelete: "CASCADE" })
  local_user: LocalUser;
}

@Entity("google_authentication")
export class GoogleAuthentication extends Auth {
  @ManyToOne(() => GoogleUser, (googleUser) => googleUser.auth, { onDelete: "CASCADE" })
  google_user: GoogleUser;
}

@Entity("kakao_authentication")
export class KakaoAuthentication extends Auth {
  @ManyToOne(() => KakaoUser, (kakaoUser) => kakaoUser.auth, { onDelete: "CASCADE" })
  kakao_user: KakaoUser;
}

@Entity("naver_authentication")
export class NaverAuthentication extends Auth {
  @ManyToOne(() => NaverUser, (naverUser) => naverUser.auth, { onDelete: "CASCADE" })
  naver_user: NaverUser;
}
