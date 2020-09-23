/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender } from '../types';
import { isString, isDate} from './helperFunctions';

const toNewPatientEntry = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
};

const parseName = (name: any): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSSN = (ssn: any): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;