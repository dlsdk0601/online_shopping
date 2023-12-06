import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { isNil } from "lodash";
import { api } from "../../api/url.g";
import { TableView } from "../../components/table/Table";
import { categoryEnumToLabel } from "../../api/enum";
import { d2 } from "../../ex/dateEx";
import { CreateButtonView } from "../../components/tailwindEx/EditButtonView";
import { Urls } from "../../url/url.g";
import { NEWPK, queryKeys } from "../../lib/contants";
import { Replace } from "../../layout/App";

const BannerListPage = () => {
  const router = useRouter();

  const { data: banners, isLoading } = useQuery([queryKeys.banner], () => api.bannerList({}));

  if (isLoading) {
    return <></>;
  }

  if (isNil(banners)) {
    return <Replace url={Urls.index.url()} />;
  }

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <div className="relative mb-6 flex min-h-screen-75 w-full flex-col overflow-hidden rounded bg-white shadow-lg">
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="w-full max-w-full px-4">
                <h3 className="text-lg font-semibold text-blueGray-700">배너 리스트</h3>
              </div>
            </div>
            <h5 className="my-2 px-4 font-semibold text-blueGray-700">
              Total : {banners.list.length}
            </h5>
          </div>
          <div className="block w-full">
            <TableView
              rows={banners.list.map((entry, index) => [
                ["No", index + 1],
                ["배너 이름", entry.title],
                ["카테고리", categoryEnumToLabel(entry.category)],
                ["생성 일자", d2(entry.createAt)],
              ])}
              links={banners.list.map((entry) => Urls.banner.edit["[pk]"].url({ pk: entry.pk }))}
            />
          </div>
        </div>
        <CreateButtonView
          onClick={() => router.push(Urls.banner.edit["[pk]"].url({ pk: NEWPK }))}
        />
      </div>
    </div>
  );
};

export default BannerListPage;
