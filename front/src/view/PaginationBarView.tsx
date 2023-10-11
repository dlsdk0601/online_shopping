import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { PaginationType } from "../api/enum.g";

const PaginationBarView = <T extends PaginationType>(props: { pagination: T }) => {
  const router = useRouter();

  return (
    <div className="col-lg-12">
      <div className="pagination">
        <ul>
          {props.pagination.hasPrev && (
            <li>
              <Link
                href={{
                  pathname: router.pathname,
                  query: { ...router.query, page: props.pagination.prevPage },
                }}
              >
                -
              </Link>
            </li>
          )}
          {props.pagination.pages.map((page) => {
            return (
              <li
                key={`product-women-list-page-${page}`}
                className={classNames({ active: props.pagination.page === page })}
              >
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query, page },
                  }}
                >
                  {page}
                </Link>
              </li>
            );
          })}
          {props.pagination.hasNext && (
            <li>
              <Link
                href={{
                  pathname: router.pathname,
                  query: { ...router.query, page: props.pagination.nextPage },
                }}
              >
                +
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PaginationBarView;
