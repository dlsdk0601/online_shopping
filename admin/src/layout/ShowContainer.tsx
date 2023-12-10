import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { isNil } from "lodash";
import { useQuery } from "react-query";
import React, { ComponentType } from "react";
import { isNotNil, validatePk } from "../ex/utils";
import { isGlobalLoading } from "../store/loading";

function ShowContainer<T>(props: {
  queryKey: string;
  api: (req: { pk: number }) => Promise<T>;
  // eslint-disable-next-line react/no-unused-prop-types
  Component: ComponentType<{ data: T | undefined }>;
}) {
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
    return <props.Component data={undefined} />;
  }

  const { data, isLoading } = useQuery([props.queryKey, pk], () => props.api({ pk }), {
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

  return <props.Component data={data} />;
}

export default ShowContainer;
