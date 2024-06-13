'use client';

import { ListItem } from '@staytus/base';
import { useTango } from '@staytus/tango';
import { Film, Planet, Response, Specie } from '@staytus/types';
import { useFetch, useFetchAll } from '@staytus/utils';
import axios from 'axios';
import { useEffect } from 'react';

export default function Index() {
  const [state, dispatch] = useTango();

  async function planetsWithPeoplesWhoHasReptile() {
    let result: Planet[] = [];
    const fetchAll = async (url: string, result: any[]) => {
      const response = await axios.get<Response<any>>(url);

      response.data.results.forEach((element) => {
        result.push(element);
      });

      if (response.data.next) {
        await fetchAll(response.data.next, result);
      }
      return result;
    };
    const planets: Planet[] = [];
    const species: Specie[] = [];
    await Promise.all([
      fetchAll('https://swapi.dev/api/planets', planets),
      fetchAll('https://swapi.dev/api/species', species),
    ]).then(() => {
      const hasReptile = species.filter(
        (el) => el.classification === 'reptile'
      );

      const allPeopleWithReptile = new Set(
        hasReptile.reduce(
          (accumulator: string[], currentValue) => [
            ...accumulator,
            ...currentValue.people,
          ],
          []
        )
      );

      result = planets.filter((planet) =>
        planet.residents.some((el) => allPeopleWithReptile.has(el))
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

  return (
    <div className="flex gap-4 h-screen flex-col w-screen items-center justify-center overflow-hidden bg-blue-100">
      <ListItem />
    </div>
  );
}
