class Timer {    
    constructor(initial = 0, reverse = false) {
        this.initial = initial;
        this.current_ms = initial;        
        this.reverse = reverse;
        this.running = false;
    }

    start = () => {
        this.running = true;
        this.step();
    }

    stop = () => {
        this.running = false;
    }

    clear = () => {
        this.current_ms = this.initial;
    }

    onChange = c => console.log(c)

    onTimeout = () => console.log("timeout")

    step = () => {
        if(this.running) {            
            this.current_ms += this.reverse ? -100 : 100;
            this.onChange(this.current_ms);            
            if(this.reverse && this.current_ms <= 0){
                this.stop();
                this.onTimeout();
            }
            setTimeout(this.step, 100);
        }
    }
    
    setInitial(initial){
        this.initial = initial;
        if(!this.running)
            this.current_ms = initial;
    }
}

export default Timer;