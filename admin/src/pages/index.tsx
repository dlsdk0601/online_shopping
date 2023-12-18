import React from "react";
import CardStats from "../components/tailwindEx/CardView";

export default function DashboardPage() {
  return (
    <>
      <div className=" flex flex-wrap pt-28">
        <div className="mb-10 w-full px-4">
          <CardStats
            statSubtitle="TRAFFIC"
            statTitle="350,897"
            statArrow="up"
            statPercent="3.48"
            statPercentColor="text-emerald-500"
            statDescription="Since last month"
            statIconName="far fa-chart-bar"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="mb-12 w-full px-4 ">
          <CardStats
            statSubtitle="NEW USERS"
            statTitle="2,356"
            statArrow="down"
            statPercent="3.48"
            statPercentColor="text-red-500"
            statDescription="Since last week"
            statIconName="fas fa-chart-pie"
            statIconColor="bg-orange-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <CardStats
            statSubtitle="NEW USERS"
            statTitle="2,356"
            statArrow="down"
            statPercent="3.48"
            statPercentColor="text-red-500"
            statDescription="Since last week"
            statIconName="fas fa-chart-pie"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="mb-12 w-full px-4">
          <CardStats
            statSubtitle="NEW USERS"
            statTitle="2,356"
            statArrow="down"
            statPercent="3.48"
            statPercentColor="text-red-500"
            statDescription="Since last week"
            statIconName="fas fa-chart-pie"
            statIconColor="bg-orange-500"
          />
        </div>
      </div>
    </>
  );
}
