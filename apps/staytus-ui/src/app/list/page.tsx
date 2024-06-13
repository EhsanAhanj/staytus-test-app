'use client';

import { PlanetCard, Skeleton } from '@staytus/base';
import { useTango } from '@staytus/tango';
import { Film, Planet, Specie } from '@staytus/types';
import { fetchAll } from '@staytus/utils';
import { useEffect, useState } from 'react';

export default function Index() {
  const [state, dispatch] = useTango();
  const [isLoading, setIsLoading] = useState(false);

  async function planetsWithPeoplesWhoHasReptile() {
    let result: Planet[] = [];

    const planets: Planet[] = [];
    const species: Specie[] = [];

    await Promise.all([
      fetchAll('https://swapi.dev/api/planets', planets),
      fetchAll('https://swapi.dev/api/species', species),
    ]).then(() => {
      const hasReptile = species.filter(
        (el) => el.classification === 'reptile'
      );

      const allFilmsWithReptile = new Set(
        hasReptile.reduce(
          (accumulator: string[], currentValue) => [
            ...accumulator,
            ...currentValue.films,
          ],
          []
        )
      );

      result = planets.filter((planet) =>
        planet.films.some((el) => allFilmsWithReptile.has(el))
      );
    });
    return result;
  }
  useEffect(() => {
    setIsLoading(true);

    planetsWithPeoplesWhoHasReptile()
      .then((result) => {
        setIsLoading(false);
        dispatch({ type: 'UPDATE', payload: { planets: result } });
      })
      .catch((ex) => {
        setIsLoading(false);

        console.log(ex);
      });
  }, []);
  useEffect(() => {
    const films: Film[] = [];
    fetchAll('https://swapi.dev/api/films', films).then((el) =>
      dispatch({ type: 'UPDATE', payload: { films } })
    );
  }, []);

  return (
    <div className="flex gap-4 min-h-screen flex-col w-screen items-center justify-center bg-[#18181A] py-2 px-4 md:px-[15%] overflow-x-hidden">
      {isLoading
        ? new Array(5)
            .fill(1)
            .map((_, index) => (
              <Skeleton key={index} className="rounded-md w-full min-h-40 " />
            ))
        : (state.planets as Planet[])?.map((el) => (
            <PlanetCard {...el} key={el.name} />
          ))}
    </div>
  );
}
