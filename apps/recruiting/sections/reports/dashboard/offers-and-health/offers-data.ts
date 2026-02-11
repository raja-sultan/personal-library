export const creatingAreaOptions: any = (color) => {
  return {
    chart: {
      height: 200,
      type: "area",
      zoom: {
        // enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    menu: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      lineCap: "round", // Round the line cap
      width: [0, 2], // Set width for all except the top border
    },
    grid: {
      show: false,
    },
    yaxis: {
      show: true,
      lines: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: [color],
  };
};

export const tableHeaderDetails: any = [
  {
    type: "multiselect",
    FieldProps: {
      name: "office",
      label: "All office",
    },
    options: [
      {
        label: "UxBridge, London",
        value: "UxBridge, London",
      },
      {
        label: "office 2",
        value: "office 2",
      },
    ],
  },
  {
    type: "multiselect",
    FieldProps: {
      name: "department",
      label: "All Departments",
    },
    options: [
      {
        label: "Finance",
        value: "Finance",
      },
    ],
  },
  {
    type: "multiselect",
    FieldProps: {
      name: "recruiters",
      label: "All primary recruiters",
    },
    options: [
      {
        label: "recruiters 1",
        value: "recruiters 2",
      },
    ],
  },
  {
    type: "multiselect",
    FieldProps: {
      name: "managers",
      label: "All hiring managers",
    },
    options: [
      {
        label: "managers 1",
        value: "managers 2",
      },
    ],
  },
];

export const options: any = {
  chart: {
    width: 250,
    type: "pie",
  },
  labels: ["No Interested", "Offer Rejected", "Not Available", "Other"],
  dataLabels: {
    enabled: false, // Set to false to remove data labels
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "start",
    markers: {
      width: 12,
      height: 12,
    },
    itemMargin: {
      //horizontal: 10,
      vertical: 10,
    },
    offsetY: 10,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 250,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  colors: ["#97BE8A", "#FA7167", "#FDDA35", "#30A6E2"],
};

export const createOpeningOptions: any = (values, colors) => {
  return {
    chart: {
      height: 120,
      type: "bar",
      zoom: {
        // enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    menu: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      lines: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      lines: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
      },
    },
    colors: [
      ({ value }) => {
        if (value < 30) {
          return "#98A2B3";
        }
        return colors;
      },
    ],
  };
};

export const monthsData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
