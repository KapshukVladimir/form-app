import { Country } from '../../../shared/enum/country';

export type TCountry =
  | Country.Ukraine
  | Country.USA
  | Country.Australia
  | Country.Austria
  | Country.Mexico
  | Country.Nepal
  | Country.Poland;

export type TFormItemLabel = 'Country' | 'Username' | 'Birthdate';
