import React, { useEffect } from "react";
import Router from "next/router";
import { ignorePromise } from "../ex/utils";

const _error = () => {
  useEffect(() => {
    return ignorePromise(() => Router.push("/"));
  }, []);

  return <div />;
};
