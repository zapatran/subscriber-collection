# @zapatran/subscriber-collection

This is a tiny package to subscribe for events

## Instalation

```bash
npm install @zapatran/subscriber-collection
```

## Usage

This package export a class `SubscriberCollection` and has two methods;

- `subscribe` where you can add a subscriber following the interface `Subscriber`

- `notify` where will call all the subcribers

## Example

using in React

** Counter.ts **

```typescript
import { Subscriber, SubscriberCollection, Subscription } from '@zapatran/subscriber-collection';

export class Counter {
  value: number;
  private subscribers = new SubscriberCollection<Counter>();

  constructor() {
    this.value = 0;
  }

  subscribeToUpdates(subscriber: Subscriber<Counter>): Subscription {
    return this.subscribers.subscribe(subscriber);
  }

  private notifySubscribers(): void {
    this.subscribers.notify(this);
  }

  increment() {
    this.value++;
    this.notifySubscribers();
  }

  decrement() {
    this.value--;
    this.notifySubscribers();
  }
}
```

** Store.ts **

```ts
import React, { useContext } from 'react';
import { Counter } from './Counter';

class Store {
  counter: Counter;

  constructor() {
    this.counter = new Counter();
  }
}

const defaultStore = new Store();

export const StoreContext = React.createContext(defaultStore);

export function useCounterStore() {
  const { counter } = useContext(StoreContext);
  return counter;
}
```

** useCounter.tsx **

```ts
import { useEffect, useState } from 'react';
import { Counter } from './Counter';
import { useCounterStore } from './store';

export function useCounter(): Counter {
  const counter = useCounterStore();
  const [state, setState] = useState<{ counter: Counter }>({ counter });

  useEffect(() => {
    return counter.subscribeToUpdates((updatedCounter: Counter): void => {
      setState({ counter: updatedCounter });
    });
  }, [counter]);

  return state.counter;
}
```

** Component **

```ts
import { useCounter } from './useCounter';

function Component() {
  const counter = useCounter();

  const handleIncrement = () => {
    counter.increment();
  };

  return (
    <div>
      <header>
        <p>{counter.value}</p>
        <button onClick={handleIncrement}>increment</button>
      </header>
    </div>
  );
}

export default Component;
```
