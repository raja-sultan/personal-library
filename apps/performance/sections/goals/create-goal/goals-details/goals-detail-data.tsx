

interface TimelineType {
    id?: string;
    title?: string;
    subTitle?: string;
    progress?: string;
}
interface OwnerGoalType {
    id?: string;
    title?: string;
    date?: string;
}


export const ownerGoalsData: OwnerGoalType[] = [
    {
        id: "1",
        title: "Created",
        date: "Mar 15,2023",
    },
    {
        id: "1",
        title: "Start",
        date: "Mar 15,2023",
    },
    {
        id: "1",
        title: "Due",
        date: "Mar 15,2023",
    },
    {
        id: "1",
        title: "Type",
        date: "Individual",
    },
    {
        id: "1",
        title: "Cycle",
        date: "Q2 2023",
    },

]
export const timelineData: TimelineType[] = [
    {
        id: "1",
        title: "Triple communication open rate in-product from 6% to 18%",
        subTitle: "Marilyn Monroe",
        progress: "35"
    },
    {
        id: "2",
        title: "Increase sales up to $10,000",
        subTitle: "Marilyn Monroe",
        progress: "54"
    },
    {
        id: "3",
        title: "Reduce response time",
        subTitle: "Marilyn Monroe",
        progress: "55"
    },

]

export const keyResultData = [
    {
        id: "1",
        title: "Increase sales up to $10,000",
        Usd: "USD 1150",
        progress: 25
    },
    {
        id: "2",
        title: "Triple communication open rate in-product from 6% to 18%",
        percentage: "35%",
        progress: 35
    },
    {
        id: "3",
        title: "Reduce response time",
        binary: "1",
        progress: 15
    },
    {
        id: "4",
        title: "Achieve service quality rating of 10 or higher",
        number: "7",
        progress: 60
    },

]