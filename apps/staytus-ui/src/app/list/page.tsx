'use client';

import { ListItem } from '@staytus/base';
import { useTango } from '@staytus/tango';
import { Film, Planet, Response, Specie } from '@staytus/types';
import { useFetch, useFetchAll } from '@staytus/utils';

export default function Index() {
  const [state, dispatch] = useTango();

  const { error, isLoading, data } = useFetchAll<
    [Response<Planet>, Response<Film>, Response<Specie>]
  >([{ url: 'planets' }, { url: 'films' }, { url: 'species' }]);

  return (
    <div className="flex gap-4 h-screen flex-col w-screen items-center justify-center overflow-hidden bg-blue-100">
      <h1>List</h1>

      <div className="text-7xl text-red-500">{JSON.stringify(state)}</div>
      <ListItem></ListItem>
    </div>
  );
}
