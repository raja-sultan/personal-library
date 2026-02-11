export const breadcrumbs = [
  { key: "1", value: "Home", link: "/dashboard" },
  { key: "2", value: "Reports", link: "/reports" },
  { key: "3", value: "Essential Reports", link: "" },
];

export const creatingAreaOptions: any = (stageLabels) => {
  return {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: stageLabels,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
  };
};
