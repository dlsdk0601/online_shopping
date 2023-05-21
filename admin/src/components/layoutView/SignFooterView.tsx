import React from "react";
import classNames from "classnames";
import Link from "next/link";

export default function SignFooterView(props: { absolute: boolean }) {
  return (
    <>
      <footer
        className={classNames("pb-6", {
          "absolute bottom-0 w-full bg-blueGray-800": props.absolute,
          "relative": !props.absolute,
        })}
      >
        <div className="container mx-auto px-4">
          <hr className="border-b-1 mb-6 border-blueGray-600" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-4 md:w-4/12">
              <div className="py-1 text-center text-sm font-semibold text-blueGray-500 md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <Link
                  href="https://www.creative-tim.com?ref=nnjs-footer-small"
                  className="py-1 text-sm font-semibold text-white hover:text-blueGray-300"
                >
                  Creative Tim
                </Link>
              </div>
            </div>
            <div className="w-full px-4 md:w-8/12">
              <ul className="flex list-none flex-wrap justify-center  md:justify-end">
                <li>
                  <Link
                    href="https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer-small"
                    className="block py-1 px-3 text-sm font-semibold text-white hover:text-blueGray-300"
                  >
                    MIT License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
