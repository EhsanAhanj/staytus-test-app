'use client';

import { useTango } from '@staytus/tango';
import { ChangeEvent } from 'react';

export default function Index() {
  const [state, dispatch] = useTango();

  const updateState = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE',
      payload: { someStateValue: e.target.value },
    });
  };

  return (
    <div className="flex gap-4 h-screen flex-col w-screen items-center justify-center overflow-hidden bg-blue-100">
      <h1>List</h1>

      <div className="text-7xl text-red-500">{JSON.stringify(state)}</div>

      <input className="shadow" onChange={updateState} />
    </div>
  );
}
