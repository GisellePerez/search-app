/**
 * Function that checks if decimals are between 1 and 9 and adds a 0 after the number.
 * If the number is grater than 9, it will return said number.
 * @param   {number} num the number received
 *
 * @returns {string} the number formatted accordingly
 */

const formatDecimals = (num: number | undefined): string => {
  if (num !== undefined && num > 0) {
    return num < 10 ? `,${num}0` : `.${num}`;
  } else {
    return "";
  }
};

export default formatDecimals;
