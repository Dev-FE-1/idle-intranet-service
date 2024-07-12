import dayjs from 'dayjs';

export default class CurrentTime {
  constructor() {
    this.$time = document.querySelector('.work-hour-time.current');
    this.timeout = null;
    this.timer = null;
  }

  updateTime() {
    const currentTime = dayjs().format('HH:mm');
    if (this.$time) {
      this.$time.setAttribute('datetime', currentTime);
      this.$time.innerText = currentTime;
    }
  }

  getNextUpdateDelay() {
    const now = dayjs();
    const nextMinuteStart = now.add(1, 'minute').startOf('minute');
    const delay = nextMinuteStart.diff(now);

    return delay;
  }

  cleanUp() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    this.updateTime();

    if (!this.timer) {
      const delay = this.getNextUpdateDelay();

      const updateNextTime = () => {
        this.updateTime();
        const nextDelay = this.getNextUpdateDelay();
        this.timer = setTimeout(updateNextTime, nextDelay);
      };

      this.timeout = setTimeout(updateNextTime, delay);
    }
  }
}
