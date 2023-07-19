import React, { PropsWithChildren, useState } from "react";
import Head from "next/head";
import { useIsFetching, useIsMutating } from "react-query";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { isNil } from "lodash";
import Favicon from "../../public/favicon.ico";
import { Urls } from "../url/url.g";
import { tokenModel } from "../store/user";
import { isNotNil } from "../ex/utils";
import SignOutButtonView from "../view/account/SignOutButtonView";

// 로그인 유저가 보는 화면 (ex 어드민 메인화면)
export const LayoutView = (props: PropsWithChildren) => {
  return (
    <>
      <HeaderView />
      {props.children}
      <BlockView />
      <FooterView />
    </>
  );
};

// 비로그인 유저가 보는 화면 (ex 어드민에서 로그인 화면)
export const DefaultLayoutView = (props: PropsWithChildren<Record<never, any>>) => {
  // noinspection HtmlRequiredTitleElement
  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href={Favicon.src} />
      </Head>
      {props.children}
    </>
  );
};

const headerMenuList = [
  { name: "Men's", path: Urls.mens.index.pathname },
  {
    name: "Women's",
    path: Urls.womens.index.pathname,
  },
  { name: "Kid's", path: Urls.kids.index.pathname },
];

export const HeaderView = () => {
  const router = useRouter();
  const token = useRecoilValue(tokenModel);
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
                  <li key={`header-menu-${menu.name}`} className="scroll-to-section">
                    <Link
                      href={menu.path}
                      className={classNames({
                        active:
                          router.pathname !== Urls.index.pathname &&
                          menu.path.startsWith(router.pathname),
                      })}
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
                <li className="scroll-to-section">
                  <Link
                    // TODO :: token 있을 때는 마이페이지로
                    href={isNil(token) ? Urls.auth.signIn.url() : Urls.auth.signIn.url()}
                    className={classNames({
                      active:
                        router.pathname !== Urls.index.pathname &&
                        router.pathname.startsWith("/auth"),
                    })}
                  >
                    {isNil(token) ? "LogIn" : "MyPage"}
                  </Link>
                </li>
                {isNotNil(token) && (
                  <li className="scroll-to-section">
                    <SignOutButtonView label="LogOut" className="sign-out" />
                  </li>
                )}
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

const FooterView = () => {
  return (
    <footer>
      <div className="container">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="col-lg-3">
            <div className="first-item">
              <div className="logo">
                <img
                  src="/images/white-logo.png"
                  alt="hexashop-ecommerce-templatemo"
                  style={{ width: "100%" }}
                />
              </div>
              <ul>
                <li>
                  <span>16501 Collins Ave, Sunny Isles Beach, FL 33160, United States</span>
                </li>
                <li>
                  <Link href="mailto:inajung7008@gmail.com">inajung7008@gmail.com</Link>
                </li>
                <li>
                  <Link href="tel:+821065675303">010-6567-5303</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <h4>Shopping &amp; Categories</h4>
            <ul>
              <li>
                <Link href={Urls.mens.index.url()}>Men’s Shopping</Link>
              </li>
              <li>
                <Link href={Urls.womens.index.url()}>Women’s Shopping</Link>
              </li>
              <li>
                <Link href={Urls.kids.index.url()}>Kid's Shopping</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <Link href={Urls.index.url()}>Homepage</Link>
              </li>
              <li>
                <Link href={Urls.about.index.url()}>About Us</Link>
              </li>
              <li>
                <Link href={Urls.contact.index.url()}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-12">
            <div className="under-footer">
              <p>
                Copyright © 2022 HexaShop Co., Ltd. All Rights Reserved.
                <br />
                Design:{" "}
                <a href="https://templatemo.com" target="_parent" title="free css templates">
                  TemplateMo
                </a>
                <br />
                Distributed By:
                <a
                  href="https://themewagon.com"
                  target="_blank"
                  title="free & premium responsive templates"
                  rel="noreferrer"
                >
                  ThemeWagon
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BlockView = () => {
  const postLoadingCount = useIsMutating();
  const getLoadingCount = useIsFetching();
  const isLocked = getLoadingCount + postLoadingCount > 0;
  return (
    <div id="preloader" className={classNames({ show: isLocked })}>
      <div className="jumper">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
