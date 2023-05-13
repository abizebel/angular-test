export interface User {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  eyeColor: string;
  birthDate: string;
}

export interface FilterParams {
  firstName?: string;
  lastName?: string;
  age?: string;
  ageStatus?: AgeState;
  gender?: string[];
  eyeColor?: string[];
  birthDate?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Others = 'others',
  PreferNotToSay = 'prefer not to say',
}

export enum AgeState {
  Equal = 'equal',
  Greater = 'greater',
  Smaller = 'smaller',
}

export interface SelectData {
  name: string;
  code: string;
}
