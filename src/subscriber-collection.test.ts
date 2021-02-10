/* eslint-disable dot-notation */
import { SubscriberCollection } from './subscriber-collection';

interface Event {
  name: string;
}

describe('Subcriber', () => {
  let subscriberCollection: SubscriberCollection<Event>;

  beforeEach(() => {
    subscriberCollection = new SubscriberCollection();
  });

  describe('constructor()', () => {
    test('should initialize subscribers to empty array', () => {
      expect(subscriberCollection['subscribers']).toHaveLength(0);
    });
  });

  describe('subscribe()', () => {
    const subscriber = (event: Event) => undefined;
    test('should add a subscribers to the subcribers collection', () => {
      subscriberCollection.subscribe(subscriber);
      expect(subscriberCollection['subscribers']).toContain(subscriber);
    });

    test('should return a function to remove the subscriber', () => {
      const remove = subscriberCollection.subscribe(subscriber);
      remove();
      expect(subscriberCollection['subscribers']).not.toContain(subscriber);
    });
  });

  describe('notify()', () => {
    const spySubscribers = [jest.fn(), jest.fn()];

    beforeEach(() => {
      spySubscribers.forEach(spy => {
        spy.mockClear();
      });
    });

    test('should notify all subscribers', () => {
      spySubscribers.forEach(spy => {
        subscriberCollection.subscribe(spy);
      });

      const event = {
        name: 'test',
      };
      subscriberCollection.notify(event);
      spySubscribers.forEach(spy => {
        expect(spy).toHaveBeenCalledWith(event);
      });
    });
  });
});
