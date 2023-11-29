import { useCallback, useState } from "react";
import { useRouter } from "next/router";
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
import { userSearchTypeEnumToLabel } from "../../api/enum";
import { ignorePromise, queryFilter, validatePageQuery } from "../../ex/utils";
import SelectView from "../../view/SelectView";

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

  const typeToIconSrc = (type: UserType) => {
    switch (type) {
      case UserType.GOOGLE:
        return "/img/logo/google.png";
      case UserType.APPLE:
        return "/img/logo/apple.png";
      case UserType.NAVER:
        return "/img/logo/naver.png";
      case UserType.KAKAO:
        return "/img/logo/kakao.png";
      default:
        return "/img/logo/local.png";
    }
  };

  const { mutate } = useMutation((req: UserListReq) => api.userList(req), {
    onSuccess: (res) => {
      setPaginationUserList({ ...res });
    },
  });

  useIsReady(() => {
    const { page, search, searchType } = router.query;

    const parsePage = validatePageQuery(page) ?? 1;
    const parseSearch = queryFilter(search);
    const parseSearchType = queryFilter(searchType);

    setPage(parsePage ?? 1);
    setSearch.set(parseSearch);
    setSearchType(userSearchTypeEnumToLabel(parseSearchType) ?? null);
    mutate({
      page: parsePage ?? 1,
      search: parseSearch ?? "",
      searchType: userSearchTypeEnumToLabel(parseSearchType) ?? null,
    });
  });

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView
          onSubmit={() => onSearch()}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
        >
          <SelectView<UserSearchType>
            searchType={searchType}
            onChangeType={(type) => setSearchType(type)}
            options={[
              [null, "전체"],
              [UserSearchType.NAME, "이름"],
              [UserSearchType.PHONE, "휴대폰"],
            ]}
          />
        </SearchBarView>
        <PaginationTableView<UserListResUser>
          title="User List"
          pagination={paginationUserList ?? null}
          links={(paginationUserList?.rows ?? []).map((item) =>
            Urls.account.edit["[pk]"].url({ pk: item.pk }),
          )}
          mapper={(value) => [
            ["이름", value.name],
            ["핸드폰", value.phone],
            [
              "가입유형",
              <div className="mx-auto h-[24px] w-[24px]">
                <img
                  className="h-full w-full"
                  src={typeToIconSrc(value.type as UserType)}
                  alt="카카오 로고"
                />
              </div>,
            ],
            ["가입 날짜", d2(value.create_at)],
          ]}
        />
      </div>
    </div>
  );
};

export default UserListPage;
