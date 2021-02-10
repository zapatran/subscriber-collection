import remove from 'lodash.remove';

export interface Subscriber<T> {
  (event: T): void;
}

export interface Subscription {
  (): void;
}

export class SubscriberCollection<T> {
  private subscribers: Subscriber<T>[] = [];

  subscribe(subscriber: Subscriber<T>): Subscription {
    this.subscribers.push(subscriber);
    return () => remove(this.subscribers, element => element === subscriber);
  }

  notify(event: T): void {
    this.subscribers.forEach(subscriber => subscriber(event));
  }
}
