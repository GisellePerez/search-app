// Function returns checks if decimals are between 1 and 9 and adds a 0 before the number
// If the number is grater than 9, it will return said number

const formatDecimals = (num: number | undefined): string => {
  if (num !== undefined && num > 0) {
    return num < 10 ? `,0${num}` : `.${num}`;
  } else {
    return '';
  }
};

export default formatDecimals;
