import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Urls } from "../../url/url.g";

export default function LeftSideBarView() {
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

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
            <li className="items-center">
              <Link
                href={Urls.index.url()}
                className={classNames("block py-3 text-xs font-bold uppercase", {
                  "text-lightBlue-500 hover:text-lightBlue-600":
                    router.pathname === Urls.index.pathname,
                  "text-blueGray-700 hover:text-blueGray-500":
                    router.pathname !== Urls.index.pathname,
                })}
              >
                <i
                  className={classNames("fas fa-chart-line mr-2 text-sm", {
                    "opacity-75": router.pathname === Urls.index.pathname,
                    "text-blueGray-300": router.pathname !== Urls.index.pathname,
                  })}
                />{" "}
                Dashboard
              </Link>
            </li>

            <li className="items-center">
              <Link
                href={Urls.account.index.url()}
                className={classNames("block py-3 text-xs font-bold uppercase", {
                  "text-lightBlue-500 hover:text-lightBlue-600": router.pathname.includes(
                    Urls.account.index.pathname,
                  ),
                  "text-blueGray-700 hover:text-blueGray-500": !router.pathname.includes(
                    Urls.account.index.pathname,
                  ),
                })}
              >
                <i
                  className={classNames("fas fa-users mr-2 text-sm", {
                    "opacity-75": router.pathname.includes(Urls.account.index.pathname),
                    "text-blueGray-300": !router.pathname.includes(Urls.account.index.pathname),
                  })}
                />{" "}
                Users
              </Link>
            </li>
            <li className="items-center">
              <button
                type="button"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                className={classNames(
                  "group block w-full py-3 text-left text-xs font-bold uppercase",
                  {
                    "text-lightBlue-500 hover:text-lightBlue-600": router.pathname.includes(
                      Urls.subscribe.index.pathname,
                    ),
                    "text-blueGray-700 hover:text-blueGray-500": !router.pathname.includes(
                      Urls.subscribe.index.pathname,
                    ),
                  },
                )}
              >
                <i
                  className={classNames("fas fa-paper-plane mr-2 text-sm", {
                    "opacity-75": router.pathname.includes(Urls.subscribe.index.pathname),
                    "text-blueGray-300": !router.pathname.includes(Urls.subscribe.index.pathname),
                  })}
                />{" "}
                Subscribe
              </button>
              <ul id="dropdown-example" className="space-y-2 px-2">
                <li className="items-center">
                  <Link
                    href={Urls.subscribe.index.url()}
                    className={classNames("block py-3 text-xs font-bold uppercase", {
                      "text-lightBlue-500 hover:text-lightBlue-600": router.pathname.includes(
                        Urls.subscribe.index.pathname,
                      ),
                      "text-blueGray-700 hover:text-blueGray-500": !router.pathname.includes(
                        Urls.subscribe.index.pathname,
                      ),
                    })}
                  >
                    <i
                      className={classNames("fas fa-paper-plane mr-2 text-sm", {
                        "opacity-75": router.pathname.includes(Urls.subscribe.index.pathname),
                        "text-blueGray-300": !router.pathname.includes(
                          Urls.subscribe.index.pathname,
                        ),
                      })}
                    />{" "}
                    subscriber
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
