import { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { isArray, isNil } from "lodash";
import { UserListRes, UserListResUser } from "../../api/type.g";
import { UserSearchType } from "../../api/enum.g";
import { api } from "../../api/url.g";
import SearchBarView from "../../components/table/searchBarView";
import { PaginationTableView } from "../../components/table/Table";
import { Urls } from "../../url/url.g";
import { d2 } from "../../ex/dateEx";

const UserListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<UserSearchType>(UserSearchType.NAME);
  const [paginationUserList, setPaginationUserList] = useState<UserListRes | null>(null);

  const onInit = useCallback(async () => {
    const res = await api.userList({
      page,
      search,
      searchType,
    });

    if (isNil(res)) {
      return;
    }

    setPaginationUserList({ ...res });
  }, [page, search, searchType]);

  const onSearch = useCallback(() => {
    const query = {
      page,
      search,
      searchType,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ignore = router.push({ ...router, query });
  }, [page, search, searchType]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { page, search, searchType } = router.query;

    if (isArray(page) || isArray(search) || isArray(searchType)) {
      return;
    }

    setPage(Number(page ?? 1));
    setSearch(search ?? "");
    setSearchType((searchType as UserSearchType) ?? null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ignore = onInit();
  }, [router.isReady]);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        {/* TODO :: 검색 바 만들기 */}
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
          pagination={paginationUserList}
          links={(paginationUserList?.rows ?? []).map(
            (item) => () =>
              Router.push({ pathname: Urls.account.edit["[pk]"], query: { pk: item.pk } }),
          )}
          mapper={(value) => [
            ["name", value.name],
            ["phone", value.phone],
            ["email", value.email],
            ["create", d2(value.created_at)],
          ]}
        />
      </div>
    </div>
  );
};

export default UserListPage;
