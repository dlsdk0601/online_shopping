import React from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { isNil } from "lodash";
import CardStats from "../components/tailwindEx/CardView";
import { queryKeys } from "../lib/contants";
import { api } from "../api/url.g";
import { isGlobalLoading } from "../store/loading";
import { mf1 } from "../ex/numberEx";

export default function DashboardPage() {
  const setIsLoading = useSetRecoilState(isGlobalLoading);
  const { data, isLoading } = useQuery([queryKeys.index], () => api.home({}), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setIsLoading(false);
    },
  });

  if (isNil(data)) {
    setIsLoading(true);
    return <></>;
  }

  if (isLoading) {
    setIsLoading(isLoading);
    return <></>;
  }

  return (
    <>
      <div className=" flex flex-wrap pt-28">
        <div className="mb-10 w-full px-4">
          <CardStats
            statSubtitle="NEW USERS"
            statTitle={mf1(data.newUserCount)}
            statArrow={data.newUserRate > 100 ? "up" : "down"}
            statPercent={data.newUserRate.toString()}
            statPercentColor="text-red-500"
            statDescription="Since last week"
            statIconName="fas fa-users"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="mb-12 w-full px-4 ">
          <CardStats
            statSubtitle="SALES"
            statTitle={mf1(data.newSalesCount)}
            statArrow={data.newSaleRate > 100 ? "up" : "down"}
            statPercent={data.newSaleRate.toString()}
            statPercentColor="text-orange-500"
            statDescription="Since last week"
            statIconName="fas fa-chart-pie"
            statIconColor="bg-pink-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <CardStats
            statSubtitle="NEW Subscribe"
            statTitle={mf1(data.newSubscribeCount)}
            statArrow={data.newSubscribeRate > 100 ? "up" : "down"}
            statPercent={data.newSubscribeRate.toString()}
            statPercentColor="text-red-500"
            statDescription="Since last week"
            statIconName="fas fa-paper-plane"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="mb-12 w-full px-4">
          <CardStats
            statSubtitle="NEW REFUND"
            statTitle={mf1(data.newRefundCount)}
            statArrow={data.newRefundRate > 100 ? "up" : "down"}
            statPercent={data.newRefundRate.toString()}
            statPercentColor="text-red-500"
            statDescription="Since last week"
            statIconName="fas fa-ban"
            statIconColor="bg-orange-500"
          />
        </div>
      </div>
    </>
  );
}
