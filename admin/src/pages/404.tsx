import React, { useEffect } from "react";
import Router from "next/router";
import { ignorePromise } from "../ex/utils";

const Error404 = () => {
  useEffect(() => {
    return ignorePromise(() => Router.push("/"));
  }, []);
  return <div />;
};

export default Error404;
