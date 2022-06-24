// This is the total number of minutes in a day and in one hour
const Min_In_A_Day = 1440;
const Min_In_1HR = 60;
// pads clock digits become 09h6m becomes "09:06"
const clockDig = (digits) => `${digits}`.padStart(2, "0");
// the constant absMod is the absolute value of modulo
// define the paramaters as divident and divisor
// if you take the (divisor + (divident % divisor)) % divisor you can get a range of values
// ex (1200 + (400 % 1200)) % 1200 = 400 or (400 + (1200 % 400)) % 400 = 0 or (-1200 + (400 % -1200)) % -1200 = 800
const absMod = (divident, divisor) =>
  (divisor + (divident % divisor)) % divisor;
// return both the result of division and modulus
const divmod = (n, divisor) => [Math.floor(n / divisor), n % divisor];
export class Clock {
  //this should allow the clock to roll backwards once the time hits 23:59 it should become 00:00
  //and it works in the range of 0 to 1439
  constructor(hrs = 0, mins = 0) {
    this.mins = absMod(mins + hrs * Min_In_1HR, Min_In_A_Day);
  }
  // will return the hrs and min in the 00:00 format once the fucntion is called
  toString() {
    const [nowHour, nowMin] = divmod(this.mins, Min_In_1HR);
    return `${clockDig(nowHour)}:${clockDig(nowMin)}`;
  }
  // adds minutes from a given input value to the new clock time then returns the clocks updated value
  plus(mins) {
    return new Clock(0, this.mins + mins);
  }
  // subtracts minutes from a given input value from the clock time then returns the clocks updated value
  minus(mins) {
    return new Clock(0, this.mins - mins);
  }
  // will return true only if this.time is equal to the secondary newClock.time else it will be false
  // the strict equality operator is used instead of the equality operator so that an attemped conversion of the operands is not done before the comparison
  equals(newClock) {
    return this.mins === newClock.mins;
  }
}
