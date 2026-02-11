'use client'
import { ReviewProgress } from "@components/review-progress";

export function ReviewCycleProgress({ data }): JSX.Element {

    function calculatePercentage(part: number, whole: number): number {
        return (part / whole) * 100;
    }

    return (
        <>
            {/* total reviews count */}
            <ReviewProgress
                key={data?.title}
                title={data?.title}
                reviewSubmitted={{
                    outOf: data?.totalCompletedCount ?? 0,
                    total: data?.totalCount ?? 0,
                    percentage: data?.totalCompletedCount ? calculatePercentage(data?.totalCompletedCount, data?.totalCount) : 0
                }}
                completed={{
                    percentage: data?.totalCompletedCount ? calculatePercentage(data?.totalCompletedCount, data?.totalCount) : 0,
                    totalReviews: data?.totalCompletedCount ?? 0
                }}
                notStarted={{
                    percentage: data?.totalNotStartedCount ? calculatePercentage(data?.totalNotStartedCount, data?.totalCount) : 0,
                    totalReviews: data?.totalNotStartedCount ?? 0
                }}
            />
            {data?.groups?.map((group) => <ReviewProgress
                key={group?.title}
                title={group?.title}
                reviewSubmitted={{
                    outOf: group?.totalCompletedCount ?? 0,
                    total: data?.totalCount ?? 0,
                    percentage: data?.totalCompletedCount ? calculatePercentage(data?.totalCompletedCount, data?.totalCount) : 0
                }}
                completed={{
                    percentage: group?.totalCompletedCount ? calculatePercentage(group?.totalCompletedCount, group?.totalCount) : 0,
                    totalReviews: group?.totalCompletedCount ?? 0
                }}
                notStarted={{
                    percentage: group?.totalNotStartedCount ? calculatePercentage(group?.totalNotStartedCount, group?.totalCount) : 0,
                    totalReviews: group?.totalNotStartedCount ?? 0
                }}
            />
            )}
        </>
    )
}