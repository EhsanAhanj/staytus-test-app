import { useEffect, useState } from 'react';
import Tango, { Action, Store } from './tango';

export function useTango(): [Store, (action: Action) => void] {
  const tango = Tango.getInstance();
  const [state, setState] = useState(tango.getState());

  useEffect(() => {
    const subscriber: React.Dispatch<React.SetStateAction<any>> = (
      newState: Store
    ) => {
      setState(newState);
    };

    const subscribe = tango.subscribe(subscriber);
    return () => {
      subscribe();
    };
  }, [tango]);

  return [state, tango.dispatch.bind(tango)];
}
