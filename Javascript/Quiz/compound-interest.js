/**
 * When you deposit a mount of money x1 in a one year,
 * then you get amount of money x2 in n years later.
 * the interest rate R, x1 and x2 is known, calculate n.
 * The rate is compound interest rate.
 *
 * compound rate => x1 * (1 + R)^n = x2
 * @author Sebastian Kim
 */

function getYears(x1, x2, R) {
  return (Math.log(x2 / x1) / Math.log(1 + R)).toFixed(2);
}