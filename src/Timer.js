export class Timer {
    static time = 0;
    static interval = null;

    static onSecond() {

    }

    static onEnd() {

    }

    static setNewTime(t) {
        this.pause();
        this.time = t;
    }

    static pause() {
        clearInterval(this.interval);
    }

    static tick() {
        if (this.time > 0) {
            this.time--;
            this.onSecond(this.time);
        } else {
            this.pause();
            this.onEnd();
        }
    }

    static start() {
        this.pause();
        this.interval = setInterval(() => this.tick(), 1000);
    }
}