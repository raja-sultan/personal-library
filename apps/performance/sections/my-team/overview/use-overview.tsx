import { BadActiveIcon, GoodActiveIcon, GreatActiveIcon, OkayActiveIcon, TerribleActiveIcon } from "@assets/icons";
import { useMyTeamOverviewQuery } from "@services/my-team/my-team-api";
// import dayjs from 'dayjs';

interface IconType {
  width: string;
  height: string;
}

interface IconObject {
  Great: React.ReactElement<IconType>;
  Good: React.ReactElement<IconType>;
  Okay: React.ReactElement<IconType>;
  Bad: React.ReactElement<IconType>;
  Terrible: React.ReactElement<IconType>;
}

interface ReturnType {
  series: {
    name: string;
    data: number[];
    color: string;
    score: number;
  }[];
  options: any;
  icons: IconObject;
  isLoading: boolean;
  isError: boolean;
}

export function useOverview(): ReturnType {
  const { data, isLoading, isError } = useMyTeamOverviewQuery({});

  const icons: IconObject = {
    Great: <GreatActiveIcon width="24" height="24" />,
    Good: <GoodActiveIcon width="24" height="24" />,
    Okay: <OkayActiveIcon width="24" height="24" />,
    Bad: <BadActiveIcon width="24" height="24" />,
    Terrible: <TerribleActiveIcon width="24" height="24" />,
  };

  const getColor = (score: string) => {
    switch (score) {
      case "1":
        return "#FDB022"; // Great
      case "2":
        return "#9B8AFB"; // Good
      case "3":
        return "#F670C7"; // Okay
      case "4":
        return "#717BBC"; // Bad
      case "5":
        return "#FEA3B4"; // Terrible
      default:
        return "#E9ECEF"; // Default color
    }
  };

  const scoreToNameMap = {
    "5": "Great",
    "4": "Good",
    "3": "Okay",
    "2": "Bad",
    "1": "Terrible",
  };

  const scoreOverview = data?.data?.scoreOverview || {};
  // Ensure all performance levels are included (Great, Good, Okay, Bad, Terrible)
  const allPerformanceLevels = ["5", "4", "3", "2", "1"];

  const series = allPerformanceLevels.map((score) => {
    const getScore: any = Object.keys(scoreToNameMap).find((item) => item === score);
    const count = scoreOverview[score] || 0;

    return {
      name: scoreToNameMap[getScore],
      data: [Number(count)],
      color: getColor(score),
      score: Number(score),
    };
  });


  const latestDate = Object.keys(data?.data?.overview || {});

  const xaxisCategories = latestDate.length > 0 ? [latestDate] : [];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "6%",
        endingShape: "rounded",
        borderRadius: '8px 8px 0px 0px',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 7,
      colors: ["transparent"],
    },
    xaxis: {
      categories: xaxisCategories,
    },
    yaxis: {
      min: 0,
      max: 5,
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },

  };

  return {
    series,
    options,
    icons,
    isLoading,
    isError
  };
}
