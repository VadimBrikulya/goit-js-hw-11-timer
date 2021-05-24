

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
    }
    start() {
        if (this.isActive) {
            return;
        }
        const startTime = Date.now();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currenTime = Date.now();
            const deltaTime = currenTime - startTime;
            const time = getTimeComponents(deltaTime);

            this.onTick(time)
            // updateTimer(time);

        }, 1000);
    }
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    }
}


const timer = new Timer({
    onTick: updateTimer
});


refs.startBtn.addEventListener('click', () => {
    timer.start();
});

refs.stopBtn.addEventListener('click', () => {
    timer.stop();
});


   function updateTimer({ days, hours, mins, secs }) {
       refs.timer.textContent = `${days}:${hours}:${mins}:${secs}`;
        
    }
    

  function pad(value) {
    return String(value).padStart(2, '0');
};

 function getTimeComponents(time) {
     const days = pad(
         Math.floor(time / (1000 * 60 * 60 * 24))
     );
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
     const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
     
    return {days, hours, mins, secs};
    };