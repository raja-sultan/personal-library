import { useGetPublicPraiseWallQuery } from "@services/settings/feedback/settings/settings-api";
import { useRouter } from "next/navigation";
import type { LaunchPraiseWallProps } from "./launch-praise-wall-types";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

export function useLaunchPraiseWall({
  startDate,
  endDate,
  isRedirect,
  slidesCount,
}: LaunchPraiseWallProps): any {
  const [slide, setSlide] = useState<boolean>(false);
  const router = useRouter();
  const { data: launchPraiseWallData } = useGetPublicPraiseWallQuery({
    startDate,
    endDate,

  });

  const count =
    Number(slidesCount) * launchPraiseWallData?.data?.meta.total * 1000;
 
  useEffect(() => {
    if (launchPraiseWallData?.data) {
      setSlide(true);
    }
  }, [launchPraiseWallData?.data]);

useEffect(() => {
  setTimeout(() => {
    if (!isNaN(count)) {
      if (isRedirect) {
        router.push("/settings/feedback/settings");
      } else {
        router.push("/dashboard");
      }
    }
  }, count);
}, [count]);

  return { launchPraiseWallData, router, slide };
}
