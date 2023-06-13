import React, { PropsWithChildren } from "react";

export default function CardFormView(props: PropsWithChildren<{ title: string }>) {
  return (
    <>
      <div className="relative mb-6 flex min-h-screen-75 w-full min-w-0 flex-col break-words rounded-lg border-0 bg-blueGray-100 shadow-lg">
        <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
          <form>
            <h6 className="mt-3 mb-6 text-sm font-bold uppercase text-blueGray-400">
              {props.title}
            </h6>
            <div className="flex flex-wrap px-4">{props.children}</div>
          </form>
        </div>
      </div>
    </>
  );
}
