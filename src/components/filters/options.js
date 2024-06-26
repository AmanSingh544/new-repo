export const monthOptions = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sept" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

export const quarterOptions = [
  { value: 1, label: "Q1" },
  { value: 2, label: "Q2" },
  { value: 3, label: "Q3" },
  { value: 4, label: "Q4" },
];

export const yearOptions = () => {
  let startYearArr = []
  let currentYear = new Date().getFullYear()
  let startYear = currentYear - 5

  for (let i = 0; i < 12; i++) {
    startYearArr.push({ value: (startYear + i), label: `${(startYear + i)}` })
  }
  return startYearArr
};

