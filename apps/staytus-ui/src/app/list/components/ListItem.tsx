'use client';
import { useTango } from '@staytus/tango';
import React from 'react';

const ListItem = () => {
  const [state] = useTango();
  return (
    <div>
      <h1>{JSON.stringify(state)}</h1>
    </div>
  );
};

export default ListItem;
