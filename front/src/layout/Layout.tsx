import React, { PropsWithChildren, useState } from "react";
import Head from "next/head";
import { useIsMutating } from "react-query";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Favicon from "../../public/favicon.ico";
import { Urls } from "../url/url.g";

// 로그인 유저가 보는 화면 (ex 어드민 메인화면)
export const LayoutView = (props: PropsWithChildren) => {
  return (
    <>
      {/* <LeftSideBarView /> */}
      {/* <div className="relative bg-blueGray-100 md:ml-64"> */}
      <HeaderView />
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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>
      {props.children}
    </>
  );
};

const headerMenuList = [
  { name: "Men's", path: Urls.mens.index },
  {
    name: "Women's",
    path: Urls.womens.index,
  },
  { name: "Kid's", path: Urls.kids.index },
  { name: "Account", path: Urls.auth.signIn },
];
export const HeaderView = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link href="/" className="logo">
                <img src="/images/logo.png" alt="" style={{ height: "90px" }} />
              </Link>
              <ul className={classNames("nav", { show: isOpen })}>
                {headerMenuList.map((menu) => (
                  <li className="scroll-to-section">
                    <Link
                      href={menu.path}
                      className={classNames({
                        active:
                          router.pathname !== Urls.index && menu.path.startsWith(router.pathname),
                      })}
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={classNames("menu-trigger", { active: isOpen })}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>Menu</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

const BlockView = () => {
  const loadingCount = useIsMutating();
  const isLocked = loadingCount > 0;
  return (
    <div
      id="preloader"
      // style={{ visibility: isLocked ? "visible" : "hidden", display: isLocked ? "block" : "none" }}
      className={classNames({ show: isLocked })}
    >
      <div className="jumper">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
