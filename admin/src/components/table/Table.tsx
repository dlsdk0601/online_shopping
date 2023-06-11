import { UrlObject } from "url";
import React, { ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";
import { isNil } from "lodash";
import Router, { useRouter } from "next/router";
import { Pagination } from "../../api/schema";

type TableViewRowItem = [string, ReactNode];
type TableViewRow = TableViewRowItem[];

export function TableView(props: { rows: TableViewRow[]; links: UrlObject[] }) {
  const router = useRouter();
  return (
    <table className="w-full">
      <thead>
        <tr>
          {(props.rows[0] ?? []).map(([header, _], index) => {
            return (
              <th
                key={index}
                className="border-blueGray-100 bg-blueGray-50 px-6 py-3 text-xs font-semibold uppercase text-blueGray-500"
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="cursor-pointer border-b text-center hover:bg-blueGray-200"
            onClick={() => router.push(props.links[rowIndex])}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {row.map(([_, data], dataIndex) => {
              return (
                <td key={dataIndex} className="p-4 px-6 text-xs">
                  {data}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PaginationTableView<T>(props: {
  title: string;
  pagination: Pagination<T> | null;
  mapper: (item: T) => TableViewRow;
  links: UrlObject[];
}) {
  if (isNil(props.pagination)) {
    return <div style={{ height: "600px" }} />;
  }

  if (props.pagination.total === 0) {
    return (
      <div className="relative mb-6 flex min-h-screen-75 w-full flex-col overflow-hidden rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="w-full max-w-full px-4">
              <h3 className="text-lg font-semibold text-blueGray-700">{props.title}</h3>
            </div>
          </div>
          <h5 className="my-2 px-4 font-semibold text-blueGray-700">
            Total : {props.pagination.total}
          </h5>
        </div>
        <div className="w-full">
          <p className="mt-5 text-center text-blueGray-700">조회된 데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative mb-6 flex min-h-screen-75 w-full flex-col overflow-hidden rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="w-full max-w-full px-4">
              <h3 className="text-lg font-semibold text-blueGray-700">{props.title}</h3>
            </div>
          </div>
          <h5 className="my-2 px-4 font-semibold text-blueGray-700">
            Total : {props.pagination.total}
          </h5>
        </div>
        <div className="block w-full">
          <TableView
            rows={props.pagination.rows.map((entry, index) => [
              ["No", index + 1],
              ...props.mapper(entry),
            ])}
            links={props.links}
          />
        </div>
        <PaginationView pagination={props.pagination} />
      </div>
    </>
  );
}

export const PaginationView = (props: { pagination: Pagination<any> }) => {
  const router = useRouter();
  // const href = (page: number) => mergedUrl(props.query, { page });
  const href = (page: number) => ({ pathname: router.pathname, query: { ...router.query, page } });

  const pusher = (page: number) => Router.push(href(page));

  return (
    <div className="py-4">
      <nav>
        <ul className="flex list-none flex-wrap justify-center rounded pl-0">
          {/* 더블 prev 버튼 */}
          {/* <li> */}
          {/*  <Link */}
          {/*    href={href(props.pagination.navPrev)} */}
          {/*    className={classNames( */}
          {/*      "flex h-8 w-8 items-center justify-center rounded-full border border-solid border-blueGray-500 p-0 text-xs", */}
          {/*      { */}
          {/*        "bg-blueGray-600 text-white": props.pagination.hasNavPrev, */}
          {/*        "bg-white text-blueGray-200": !props.pagination.hasNavPrev, */}
          {/*      }, */}
          {/*    )} */}
          {/*  > */}
          {/*    <i className="fas fa-chevron-left -ml-px" /> */}
          {/*    <i className="fas fa-chevron-left -ml-px" /> */}
          {/*  </Link> */}
          {/* </li> */}
          <li>
            <button
              type="button"
              onClick={() => pusher(props.pagination.prevPage)}
              disabled={!props.pagination.hasPrev}
              className={classNames(
                "ml-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-blueGray-500 p-0 text-xs",
                {
                  "bg-blueGray-600 text-white": props.pagination.hasPrev,
                  "cursor-default bg-white text-blueGray-200": !props.pagination.hasPrev,
                },
              )}
            >
              <i className="fas fa-chevron-left -ml-px" />
            </button>
          </li>
          {props.pagination.pages.map((page, index) => {
            return (
              <li key={index}>
                <Link
                  href={href(page)}
                  className={classNames(
                    "ml-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-blueGray-500 p-0 text-xs",
                    {
                      "bg-blueGray-600 text-white": page === props.pagination.page,
                      "bg-white text-blueGray-200": page !== props.pagination.page,
                    },
                  )}
                >
                  {page}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => pusher(props.pagination.nextPage)}
              disabled={!props.pagination.hasNext}
              className={classNames(
                "ml-1 mr-1 flex h-8 w-8 items-center justify-center rounded-full border border-solid border-blueGray-500 p-0 text-xs",
                {
                  "bg-blueGray-600 text-white": props.pagination.hasNext,
                  "cursor-default bg-white text-blueGray-200": !props.pagination.hasNext,
                },
              )}
            >
              <i className="fas fa-chevron-right -mr-px" />
            </button>
          </li>
          {/* 더블 next 버튼 */}
          {/* <li> */}
          {/*  <Link */}
          {/*    href={href(props.pagination.navNext)} */}
          {/*    className={classNames( */}
          {/*      "flex h-8 w-8 items-center justify-center rounded-full border border-solid border-blueGray-500 p-0 text-xs", */}
          {/*      { */}
          {/*        "bg-white text-blueGray-200": !props.pagination.hasNavNext, */}
          {/*        "bg-blueGray-600 text-white": props.pagination.hasNavNext, */}
          {/*      }, */}
          {/*    )} */}
          {/*  > */}
          {/*    <i className="fas fa-chevron-right -mr-px" /> */}
          {/*    <i className="fas fa-chevron-right -mr-px" /> */}
          {/*  </Link> */}
          {/* </li> */}
        </ul>
      </nav>
    </div>
  );
};
