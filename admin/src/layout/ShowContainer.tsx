import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { isArray, isNil } from "lodash";
import { useQuery } from "react-query";
import React, { isValidElement, PropsWithChildren } from "react";
import { isNotNil, validatePk } from "../ex/utils";
import { isGlobalLoading } from "../store/loading";

function ShowContainer<T>(
  props: PropsWithChildren<{ key: string; api: (req: { pk: number }) => Promise<T> }>,
) {
  const router = useRouter();
  const pk = validatePk(router.query.pk);
  const setIsLoading = useSetRecoilState(isGlobalLoading);

  if (!router.isReady) {
    setIsLoading(true);
    return <></>;
  }

  // new
  if (isNil(pk)) {
    setIsLoading(false);
    return <></>;
  }

  const { data, isLoading } = useQuery([props.key, pk], () => props.api({ pk }), {
    enabled: router.isReady && isNotNil(pk),
    onSuccess: (res) => {
      if (isNil(res)) {
        router.back();
      }
    },
  });

  if (isLoading) {
    setIsLoading(true);
    return <></>;
  }

  setIsLoading(false);

  return (
    <>
      {props.children &&
        isValidElement(props.children) &&
        isArray(props.children) &&
        props.children.map((child) => React.cloneElement(child, { data }))}
    </>
  );
}

export default ShowContainer;
