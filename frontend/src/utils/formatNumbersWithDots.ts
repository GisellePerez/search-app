/**
 * Function used to separate item price by thousands with dots
 * @param   {number} num the number received
 *
 * @returns {string} number separated by dots accordingly
 */
const formatNumbersWithDots = (num: number | undefined): string => {
  if (num !== undefined) {
    const stringNum = "" + num;
    return stringNum.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return "";
  }
};

export default formatNumbersWithDots;
