

class CountdownTimer {
    constructor({selector, targetDate}) {
        this.selector = document.querySelector(selector);
        this.targetDate = targetDate;
        this.intervalId = null;
        this.refs = {
            days: this.selector.querySelector('[data-value="days"]'),
            hours: this.selector.querySelector('[data-value="hours"]'),
            mins: this.selector.querySelector('[data-value="mins"]'),
            secs: this.selector.querySelector('[data-value="secs"]'),
        }
        this.init();
        this.start();
    }

    init() {
        const timeParts = this.getTimeParts(0);
        this.renderRefs(timeParts);
    }

    start() {
        this.intervalId = setInterval(() => {
            const time = this.targetDate - Date.now();
            if (time <= 0) {
                clearInterval(this.intervalId);
                return;
            }

            const timeParts = this.getTimeParts(time);
            this.renderRefs(timeParts);
        }, 1000)
    }

    renderRefs({days, hours, mins, secs}){
        this.refs.days.textContent = days;
        this.refs.hours.textContent = hours;
        this.refs.mins.textContent = mins;
        this.refs.secs.textContent = secs;
    }

    getTimeParts(time)
    {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return {days, hours, mins, secs};
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}





new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
});