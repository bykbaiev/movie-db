import { fetchPersonDetails } from 'api';
import { PersonId } from 'models/Person';
import { Failure as PersonFailure, Loaded as PersonLoaded, PersonState } from 'models/PersonState';
import { selectorFamily } from 'recoil';

// TODO add caching for API ?
export const Person = selectorFamily<PersonState, PersonId>({
  key: 'Person',
  get: (id) => async () => {
    if (!id) {
      return <PersonFailure>{ tag: 'Failure' };
    }

    try {
      const details = await fetchPersonDetails(id);

      return <PersonLoaded>{
        tag: 'Loaded',
        data: details
      };
    } catch (error: unknown) {
      return <PersonFailure>{ tag: 'Failure' };
    }
  }
});
