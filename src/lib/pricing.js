const monthly = 14.99;
const yearly = 99.0;

export const pricing = {
  monthly,
  yearly,
  yearlyOriginal: Number((monthly * 12).toFixed(2)),
  yearlySavings: (monthly * 12 - yearly).toFixed(2),
};
