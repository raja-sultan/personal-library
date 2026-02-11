import { useGetDashboardAnalyticsQuery } from "@services/dashboard/dashboard-api";
import { useGetProfileQuery } from "@services/profile/profile-api";

interface IProps {
  barSeries: ApexAxisChartSeries;
  months: string[];
  isLoading: boolean;
}

export function useReviews(): IProps {
  const { data: analytics, isLoading } = useGetDashboardAnalyticsQuery({});
  const { data: userProfile } = useGetProfileQuery({});

  const getReviewCountByType = (type: string) => {
    return analytics?.data?.reviews
      .filter((item: { type: string }) => item.type === type)
      .map((item: { count: string | number }) => item.count);
  }

  const selfReview = getReviewCountByType("self_review");
  const peerReview = getReviewCountByType("peer_review");
  const downWardReview = getReviewCountByType("downward_review");
  const upWardReview = getReviewCountByType("upward_review");

  const months: string[] = [];

  analytics?.data?.reviews?.forEach((review: any) => {
    const monthAbbrev: any = review.monthAbbrev;
    if (!months.includes(monthAbbrev)) {
      months.push(monthAbbrev);
    }
  });

  const barSeries =
    userProfile?.data?.defaultRole === "COMPANY_ADMIN" ||
      userProfile?.data?.defaultRole === "SUPER_ADMIN"
      ? [
        {
          name: "Upward Reviews",
          data: upWardReview,
        },
        {
          name: "Downward Reviews",
          data: downWardReview,
        },
        {
          name: "Self Reviews",
          data: selfReview,
        },
      ]
      : [
        {
          name: "Peer Reviews",
          data: peerReview,
        },
        {
          name: "Upward Reviews",
          data: upWardReview,
        },
        {
          name: "Self Reviews",
          data: selfReview,
        },
      ];
      
  return {
    barSeries,
    months,
    isLoading
  };
}
