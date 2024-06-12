class Singleton {
    private static instance: Singleton;

    constructor() {
        if (Singleton.instance) {
            throw new Error("Error - use Singleton.getInstance()");
        }
        this.member = 0;
    }

    static getInstance(): Singleton {
        Singleton.instance = Singleton.instance || new Singleton();
        return Singleton.instance;
    }

    member: number;
}


export default Singleton