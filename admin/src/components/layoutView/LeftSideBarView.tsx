import { UrlObject } from "url";
import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { isNil } from "lodash";
import { Urls } from "../../url/url.g";

interface MenuItem {
  name: string;
  url?: UrlObject;
  pathname: string;
  icon?: string;
  children?: MenuItem[];
}

const menu: MenuItem[] = [
  {
    name: "대시보드",
    url: Urls.index.url(),
    pathname: Urls.index.pathname,
    icon: "fa-chart-line",
  },
  {
    name: "사용자",
    url: Urls.account.index.url(),
    pathname: Urls.account.index.pathname,
    icon: "fa-users",
  },
  {
    name: "구독",
    pathname: Urls.subscribe.index.pathname,
    icon: "fa-paper-plane",
    children: [
      {
        name: "신청자",
        url: Urls.subscribe.index.url(),
        pathname: Urls.subscribe.index.pathname,
      },
      {
        name: "구독 메일 리스트",
        url: Urls.subscribe.history.index.url(),
        pathname: Urls.subscribe.history.index.pathname,
      },
    ],
  },
  {
    name: "상품",
    pathname: Urls.product.index.pathname,
    icon: "fa-tshirt",
    url: Urls.product.index.url(),
  },
];

export default function LeftSideBarView() {
  const [isShow, setIsShow] = useState(false);

  return (
    <aside
      id="default-sidebar"
      className="relative z-10 flex flex-wrap items-center justify-between bg-white py-4 px-6 shadow-xl md:fixed md:left-0 md:top-0 md:bottom-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto"
    >
      <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
        <button
          className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
          type="button"
          onClick={() => setIsShow(true)}
        >
          <i className="fas fa-bars" />
        </button>
        <Link
          href="/"
          className="mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase text-blueGray-600 md:block md:pb-2"
        >
          Admin
        </Link>
        <div
          className={classNames(
            "absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none",
            {
              "hidden": !isShow,
              "m-2 bg-white py-3 px-6": isShow,
            },
          )}
        >
          {/* Collapse header */}
          <div className="mb-4 block border-solid border-blueGray-200 pb-4 md:hidden md:min-w-full md:border-b">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link
                  href="/"
                  className="mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase text-blueGray-600 md:block md:pb-2"
                >
                  Admin
                </Link>
              </div>
              <div className="flex w-6/12 justify-end">
                <button
                  type="button"
                  className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                  onClick={() => setIsShow(false)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          </div>
          <hr className="my-4 md:min-w-full" />

          <ul className="flex list-none flex-col md:min-w-full md:flex-col">
            {menu.map((item, index) => {
              if (isNil(item.children)) {
                return <MenuItemOneDepthView key={`left-side-bar-menu-${index}`} item={item} />;
              }

              return <MenuItemTwoDepthView key={`left-side-bar-menu-${index}`} item={item} />;
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

const MenuItemOneDepthView = memo((props: { item: MenuItem }) => {
  const router = useRouter();
  const isIndex = props.item.pathname === "/";
  return (
    <li className="items-center">
      <Link
        href={props.item.url ?? props.item.pathname}
        className={classNames("block py-3 text-base font-bold uppercase", {
          "text-lightBlue-500 hover:text-lightBlue-600": isIndex
            ? router.pathname === props.item.pathname
            : router.pathname.includes(props.item.pathname),
          "text-blueGray-700 hover:text-blueGray-500": isIndex
            ? router.pathname !== props.item.pathname
            : !router.pathname.includes(props.item.pathname),
        })}
      >
        <i
          className={classNames(`fas ${props.item.icon} mr-2 text-sm`, {
            "opacity-75": router.pathname.includes(props.item.pathname),
            "text-blueGray-300": !router.pathname.includes(props.item.pathname),
          })}
        />{" "}
        {props.item.name}
      </Link>
    </li>
  );
});

const MenuItemTwoDepthView = memo((props: { item: MenuItem }) => {
  const router = useRouter();
  const [isDrop, setIsDrop] = useState(false);

  useEffect(() => {
    if (!router.pathname.includes(props.item.pathname)) {
      setIsDrop(false);
      return;
    }
    setIsDrop(true);
  }, [router]);

  return (
    <li className="items-center">
      <button
        type="button"
        className={classNames("group block w-full py-3 text-left text-base font-bold uppercase", {
          "text-lightBlue-500 hover:text-lightBlue-600": router.pathname.includes(
            props.item.pathname,
          ),
          "text-blueGray-700 hover:text-blueGray-500": !router.pathname.includes(
            props.item.pathname,
          ),
        })}
        onClick={() => {
          if (router.pathname.includes(props.item.pathname)) {
            return;
          }
          setIsDrop(!isDrop);
        }}
      >
        <i
          className={classNames(`fas ${props.item.icon} mr-2 text-base`, {
            "opacity-75": router.pathname.includes(props.item.pathname),
            "text-blueGray-300": !router.pathname.includes(props.item.pathname),
          })}
        />{" "}
        {props.item.name}
        <i
          className={classNames(
            "fas fa-caret-down ml-20 text-lg transition-all duration-300 ease-in-out",
            { "rotate-90": isDrop },
          )}
        />
      </button>
      <ul
        // style 로 작성한 이유는 tailwindcss 가 리렌더링 될때 해당 class 를 만들어내지 못한다.
        style={{ height: isDrop ? `${(props.item.children ?? []).length * 44}px` : "0px" }}
        className="space-y-2 overflow-hidden px-2 transition-all duration-300 ease-in-out"
      >
        {(props.item.children ?? []).map((child, index) => {
          return (
            <li key={`menu-item-${index}`} className="items-center">
              <Link
                href={child.url ?? child.pathname}
                className={classNames("block py-3 text-sm font-bold uppercase", {
                  "text-lightBlue-500 hover:text-lightBlue-600": router.pathname === child.pathname,
                  "text-blueGray-700 hover:text-blueGray-500": router.pathname !== child.pathname,
                  "pl-10": isNil(child.icon),
                })}
              >
                <i
                  className={classNames(`fas ${child.icon} mr-2 text-sm`, {
                    "opacity-75": router.pathname === child.pathname,
                    "text-blueGray-300": router.pathname !== child.pathname,
                  })}
                />{" "}
                {child.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
});
