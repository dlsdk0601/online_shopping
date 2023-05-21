import { useCallback } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { api } from "../api/url.g";
import { Urls } from "../url/url.g";
import { useUser } from "../hooks/useUser";
import { SignOutReq, SignOutRes } from "../api/type.g";

const SignOutButtonView = (props: { label?: string; className?: string }) => {
  const router = useRouter();
  const { clearUser } = useUser();

  const { mutate } = useMutation((req: SignOutReq) => api.signOut(req), {
    onSuccess: (res: SignOutRes) => {
      if (!res.result) {
        return alert("로그아웃에 실패 했습니다.");
      }

      clearUser();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ignore = router.push(Urls.index);
    },
  });

  const onSignOut = useCallback(async () => {
    mutate({});
  }, []);

  return (
    <button type="button" className={props.className ?? ""} onClick={() => onSignOut()}>
      {props.label ?? "로그아웃"}
    </button>
  );
};

export default SignOutButtonView;
