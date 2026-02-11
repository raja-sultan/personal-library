import React from "react";

import { Schedule } from "@components/dashboard";
import { useGetScheduleListQuery } from "@services/sso-admin-dashboard-api";
import dayjs from "dayjs";

export function ScheduleSection(): JSX.Element {
  const dateFilter: string = dayjs().format("YYYY-MM-DD");
  const { data: schedules } = useGetScheduleListQuery({
    year: dayjs(dateFilter).format("YYYY"),
    month: dayjs(dateFilter).format("MM"),
  });

  return <Schedule data={schedules?.data} />;
}
