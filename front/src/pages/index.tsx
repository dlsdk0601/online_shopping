import Link from "next/link";
import { useRecoilValue } from "recoil";
import { Urls } from "../url/url.g";
import { tokenModel } from "../store/user";
import { isNotNil } from "../ex/utils";
import SignOutButtonView from "../view/SignOutButtonView";

export default function Home() {
  const token = useRecoilValue(tokenModel);
  return (
    <div>
      {isNotNil(token) ? (
        <SignOutButtonView />
      ) : (
        <>
          <div className="m-2">
            <Link href={Urls.auth.signIn}>로그인 하러 가기</Link>
          </div>
          <div className="m-2">
            <Link href={Urls.auth.signUp}>회워가입 하러 가기</Link>
          </div>
          <div className="m-2">
            <Link href={Urls.file.upload}>파일 업로드 하러 가기</Link>
          </div>
        </>
      )}
    </div>
  );
}
