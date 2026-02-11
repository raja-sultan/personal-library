"use client";
import { LaunchPraiseWall } from "@sections/settings/feedback/settings/launch-praise-wall";
import { useSearchParams } from "next/navigation";

 function LaunchPraiseWallPage(): JSX.Element {
  const params = useSearchParams();
  const startDate: string = params.get("startDate") || "";
  const endDate: string = params.get("endDate") || "";
  const slidesCount: any = params.get("slidesCount") || "";
  const isRedirect: any = params.get("isRedireact") || "";

  return (
    <LaunchPraiseWall
      startDate={startDate}
      endDate={endDate}
      slidesCount={slidesCount}
      isRedirect={isRedirect}
    />
  );
}
export default LaunchPraiseWallPage;