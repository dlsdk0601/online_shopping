import React, { PropsWithChildren } from "react";
import Head from "next/head";
import { ClipLoader } from "react-spinners";
import { useIsMutating } from "react-query";
import Favicon from "../../public/favicon.ico";

// 로그인 유저가 보는 화면 (ex 어드민 메인화면)
export const LayoutView = (props: PropsWithChildren) => {
  return (
    <>
      {/* <LeftSideBarView /> */}
      {/* <div className="relative bg-blueGray-100 md:ml-64"> */}
      {/*  <HeaderView /> */}
      {/*  <Cards /> */}
      {/*  <div className="-m-24 mx-auto w-full px-4 md:px-10"> */}
      {props.children}
      <BlockView />
      {/*    <FooterView /> */}
      {/*  </div> */}
      {/* </div> */}
      {/* <BlockView /> */}
    </>
  );
};

// 비로그인 유저가 보는 화면 (ex 어드민에서 로그인 화면)
export const DefaultLayoutView = (props: PropsWithChildren<Record<never, any>>) => {
  // noinspection HtmlRequiredTitleElement
  return (
    <>
      <Head>
        {/* TODO :: Favicon 변경 */}
        <link rel="shortcut icon" type="image/x-icon" href={Favicon.src} />
      </Head>
      {props.children}
    </>
  );
};

const BlockView = () => {
  const loadingCount = useIsMutating();
  const isLocked = loadingCount > 0;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: isLocked ? "auto" : "none",
        opacity: isLocked ? 1 : 0,
        transition: "opacity .3s .1s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ClipLoader />
    </div>
  );
};
