import { useCallback, useState } from "react";
import Router, { useRouter } from "next/router";
import { isArray } from "lodash";
import { useQuery } from "react-query";
import { UserListResUser } from "../../api/type.g";
import { UserSearchType } from "../../api/enum.g";
import { api } from "../../api/url.g";
import SearchBarView from "../../components/table/searchBarView";
import { PaginationTableView } from "../../components/table/Table";
import { Urls } from "../../url/url.g";
import { d2 } from "../../ex/dateEx";
import useIsReady from "../../hooks/useIsReady";
import { queryKeys } from "../../lib/contants";

const UserListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<UserSearchType | null>(null);

  const onSearch = useCallback(() => {
    const query = {
      page,
      search,
      searchType,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ignore = router.push({ pathname: router.pathname, query });
  }, [page, search, searchType]);

  const enumToLabel = useCallback(
    (type: string | undefined): UserSearchType | undefined => {
      switch (type) {
        case "NAME":
          return UserSearchType.NAME;
        case "PHONE":
          return UserSearchType.PHONE;
        default:
      }
    },
    [searchType],
  );

  useIsReady(() => {
    const { page, search, searchType } = router.query;

    if (isArray(page) || isArray(search) || isArray(searchType)) {
      return;
    }

    setPage(Number(page ?? 1));
    setSearch(search ?? "");
    setSearchType(enumToLabel(searchType) ?? null);
  });

  const { data: paginationUserList } = useQuery(
    [queryKeys.userList, page],
    () => api.userList({ page, search, searchType }),
    {
      keepPreviousData: true,
    },
  );

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView<UserSearchType>
          onSubmit={() => onSearch()}
          searchType={searchType}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onChangeType={(type) => setSearchType(type)}
          options={[
            [null, "전체"],
            [UserSearchType.NAME, "이름"],
            [UserSearchType.PHONE, "휴대폰"],
          ]}
        />
        <PaginationTableView<UserListResUser>
          pagination={paginationUserList ?? null}
          links={(paginationUserList?.rows ?? []).map(
            (item) => () =>
              Router.push({ pathname: Urls.account.edit["[pk]"], query: { pk: item.pk } }),
          )}
          mapper={(value) => [
            ["name", value.name],
            ["phone", value.phone],
            ["email", value.type],
            ["create", d2(value.create_at)],
          ]}
        />
      </div>
    </div>
  );
};

export default UserListPage;
