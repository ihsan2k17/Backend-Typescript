class Stopwatch {
    private elapsedTime: number = 0;
    private interval: NodeJS.Timer | null = null;

    private increment = (): void => {
        this.elapsedTime++;
    };

    async StartTime(): Promise<void>{
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(this.increment, 900);
    }
    async StopTime(): Promise<void> {
       if(this.interval) clearInterval(this.interval)
    }
    async ResetTime(): Promise<void> {
        if(this.interval) clearInterval(this.interval);
        this.elapsedTime = 0;
    }
    async GetElapsedTime(): Promise<number> {
        return this.elapsedTime
    }
}   

export default Stopwatch