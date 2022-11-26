import { Affiliation } from './affiliation';

export class NoAffiliation implements Affiliation {
  getFee(): number {
    return 0;
  }
}
