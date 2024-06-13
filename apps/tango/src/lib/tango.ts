import { Dispatch, SetStateAction } from 'react';

export interface Action {
  type: 'UPDATE' | 'DELETE';
  payload?: any;
}
export interface Store {
  [key: string]: any;
}
class Tango {
  private static instance: Tango;
  private state: Store = {};
  private subscribers: Set<Dispatch<SetStateAction<any>>> = new Set();

  // private constructor() {}

  public static getInstance(): Tango {
    if (!Tango.instance) {
      Tango.instance = new Tango();
    }
    return Tango.instance;
  }

  public getState(): Store {
    return this.state;
  }

  public dispatch(action: Action): void {
    if (action)
      switch (action.type) {
        case 'UPDATE':
          this.state = { ...this.state, ...action.payload };
          break;
        case 'DELETE':
          delete this.state[action.payload as string];
          break;
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
    this.notifyAll();
  }

  private unsubscribe(subscriber: React.Dispatch<React.SetStateAction<any>>) {
    this.subscribers.delete(subscriber);
  }
  public subscribe(subscriber: React.Dispatch<React.SetStateAction<any>>) {
    this.subscribers.add(subscriber);
    return () => this.unsubscribe(subscriber);
  }

  private notifyAll(): void {
    this.subscribers.forEach((subscriber) => subscriber(this.state));
  }
}
export default Tango;
