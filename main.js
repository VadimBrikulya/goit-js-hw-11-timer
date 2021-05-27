

const refs = {
            startBtn: document.querySelector('#btnStart'),
            stopBtn: document.querySelector('#btnStop'),
            timer: document.querySelector('#timer-1')            
        };

class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
        this.init();
    }
    init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);

    };

    start() {
        if (this.isActive) {
            return;
        }
        const startTime = Date.now();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = this.getTimeComponents(deltaTime);

            this.onTick(time)
        }, 1000);
    }
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }
     getTimeComponents(time) {
     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
     
    return {days, hours, mins, secs};
};
  pad(value) {
    return String(value).padStart(2, '0');
};
}


const timer = new Timer({
    onTick: updateTimer,
});


refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));


   function updateTimer({ days, hours, mins, secs }) {
       refs.timer.textContent = `${days}:${hours}:${mins}:${secs}`;
        
    }


new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});
