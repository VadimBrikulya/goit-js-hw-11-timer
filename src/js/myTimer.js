export default
class CountdownTimer {
  constructor({
    selector,
    targetDate
  }) {
    this.targetDate = new Date(targetDate);
    this.daysSpan = document.querySelector(`${selector} .value[data-value="days"]`);
    this.hoursSpan = document.querySelector(`${selector} .value[data-value="hours"]`);
    this.minutesSpan = document.querySelector(`${selector} .value[data-value="mins"]`);
    this.secondsSpan = document.querySelector(`${selector} .value[data-value="secs"]`);

  }
  
  _padZero(value) {
    return value < 10 ? `0${value}` : value;
  }
  _countDowm() {
    const currentTime = new Date();
    this._createSpanValue(currentTime);
  }

  showTime() {
    setInterval(() => this._countDowm(), 1000);
  }

  _createSpanValue(currentTime) {
    const time = this.targetDate - currentTime;
    this.daysSpan.textContent = this._padZero(Math.floor(time / (1000 * 60 * 60 * 24)));
    this.hoursSpan.textContent = this._padZero(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.minutesSpan.textContent = this._padZero(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    this.secondsSpan.textContent = this._padZero(Math.floor((time % (1000 * 60)) / 1000));

  }
}
