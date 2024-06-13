'use client';

import { PlanetCard } from '@staytus/base';
import { useTango } from '@staytus/tango';
import { Film, Planet, Specie } from '@staytus/types';
import { fetchAll } from '@staytus/utils';
import { useEffect } from 'react';

export default function Index() {
  const [state, dispatch] = useTango();

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
    try {
      planetsWithPeoplesWhoHasReptile().then((result) =>
        dispatch({ type: 'UPDATE', payload: { planets: result } })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const films: Film[] = [];
    fetchAll('https://swapi.dev/api/films', films).then((el) =>
      dispatch({ type: 'UPDATE', payload: { films } })
    );
  }, []);

  return (
    <div className="flex gap-4 min-h-screen flex-col w-screen items-center justify-center bg-[#18181A] p-2 md:px-[15%] overflow-x-hidden">
      {(state.planet as Planet[])?.map((el) => (
        <PlanetCard {...el} key={el.name} />
      ))}
    </div>
  );
}
