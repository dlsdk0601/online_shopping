import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { isArray } from "lodash";
import { useMutation } from "react-query";
import { UserListReq, UserListRes, UserListResUser } from "../../api/type.g";
import { UserSearchType, UserType } from "../../api/enum.g";
import { api } from "../../api/url.g";
import SearchBarView from "../../components/table/searchBarView";
import { PaginationTableView } from "../../components/table/Table";
import { Urls } from "../../url/url.g";
import { d2 } from "../../ex/dateEx";
import useIsReady from "../../hooks/useIsReady";
import UseValueField from "../../hooks/useValueField";
import GoogleIcon from "../../components/icons/Google";
import LocalIcon from "../../components/icons/LocalIcon";
import { UserSearchTypeEnumToLabel } from "../../api/enum";
import { ignorePromise } from "../../ex/utils";

const UserListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = UseValueField("", "검색어");
  const [searchType, setSearchType] = useState<UserSearchType | null>(null);
  const [paginationUserList, setPaginationUserList] = useState<UserListRes | null>(null);

  const onSearch = useCallback(() => {
    const query = {
      page: 1,
      search: search.value,
      searchType,
    };

    ignorePromise(() => router.push({ pathname: router.pathname, query }));
  }, [page, search, searchType]);

  const typeToIcon = (type: UserType) => {
    switch (type) {
      case UserType.GOOGLE:
        return <GoogleIcon />;
      case UserType.LOCAL:
      default:
        return <LocalIcon />;
    }
  };

  const { mutate } = useMutation((req: UserListReq) => api.userList(req), {
    onSuccess: (res) => {
      setPaginationUserList({ ...res });
    },
  });

  useIsReady(() => {
    const { page, search, searchType } = router.query;

    if (isArray(page) || isArray(search) || isArray(searchType)) {
      return;
    }

    setPage(Number(page ?? 1));
    setSearch.set(search ?? "");
    setSearchType(UserSearchTypeEnumToLabel(searchType) ?? null);
    mutate({
      page: Number(page ?? 1),
      search: search ?? "",
      searchType: UserSearchTypeEnumToLabel(searchType) ?? null,
    });
  });

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView<UserSearchType>
          onSubmit={() => onSearch()}
          searchType={searchType}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
          onChangeType={(type) => setSearchType(type)}
          options={[
            [null, "전체"],
            [UserSearchType.NAME, "이름"],
            [UserSearchType.PHONE, "휴대폰"],
          ]}
        />
        <PaginationTableView<UserListResUser>
          pagination={paginationUserList ?? null}
          links={(paginationUserList?.rows ?? []).map((item) =>
            Urls.account.edit["[pk]"].url({ pk: item.pk }),
          )}
          mapper={(value) => [
            ["이름", value.name],
            ["핸드폰", value.phone],
            ["가입유형", typeToIcon(value.type as UserType)],
            ["가입 날짜", d2(value.create_at)],
          ]}
        />
      </div>
    </div>
  );
};

export default UserListPage;
