/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewEntry, Diagnosis, DischargeEntry, SickLeave, HealthCheckRating } from '../types';
import { isString, isDate } from './helperFunctions';


/**
 * Helper function for exhaustive type checking
 */
 
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/** Type guards */
const isHospitalType = (type: string): type is 'Hospital' => {
  return type === 'Hospital';
};

const isOccupationalHealthcareType = (type: string): type is 'OccupationalHealthcare' => {
  return type === 'OccupationalHealthcare';
};
const isHealthCheckType = (type: string): type is 'HealthCheck' => {
  return type === 'HealthCheck';
};

const isDiagnosisCode = (code: any): code is Diagnosis['code'] => {
  return isString(code);
};

const isDiagnosisCodeArray = (diagnosisCodes: Array<any>): diagnosisCodes is Array<Diagnosis['code']> => {
  if(diagnosisCodes.length === 0) return true;

  for(let i = 0; i< diagnosisCodes.length; i++){
    if(!isDiagnosisCode(diagnosisCodes[i])){
      console.log(i,' index is not good');
      console.log(diagnosisCodes[i], 'is not good');
      return false;
    }
  }
  return true;
};

const isCriteria = (criteria: any): boolean => {
  if(!criteria || !isString(criteria)){
    throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return true;
};

const isDischargeEntry = (discharge: any): discharge is DischargeEntry => {
  return typeof discharge === 'object' && Object.keys(discharge).length === 2 && 
    discharge.date && discharge.criteria && isDate(discharge.date) && isCriteria(discharge.criteria);
};

const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return typeof sickLeave === 'object' && Object.keys(sickLeave).length === 2 &&
    sickLeave.startDate && sickLeave.endDate && isString(sickLeave.startDate) && 
    isDate(sickLeave.startDate) && isString(sickLeave.endDate) && isDate(sickLeave.endDate);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

/** Parsing Functions */

const parseHospitalType = (type: any): 'Hospital' => {
  if(!type || !isString(type) || !isHospitalType(type)){
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const parseOccupationalHealthcareType = (type: any): 'OccupationalHealthcare' => {
  if(!type || !isString(type) || !isOccupationalHealthcareType(type)){
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const parseHealthCheckType = (type: any): 'HealthCheck' => {
  if(!type || !isString(type) || !isHealthCheckType(type)){
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const parseDescription = (description: any): string => {
  if(!description || !isString(description)){
    throw new Error('Missing description');
  }
  return description;
};

const parseDate = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)){
      throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if(!Array.isArray(diagnosisCodes) || !isDiagnosisCodeArray(diagnosisCodes)){
    throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
  }
  return diagnosisCodes;
};

const parseDischarge = (discharge: any): DischargeEntry => {
  if(!discharge || !isDischargeEntry(discharge)){
    throw new Error('Incorrect or missing discharge entry: ' + discharge);
  }
  return discharge;
};

const parseEmployerName = (name: any): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing employer name: ' + name);
  }
  return name;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if(!sickLeave || !isSickLeave(sickLeave)){
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }
  return sickLeave;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if(!isHealthCheckRating(healthCheckRating)){
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};


/** Type validator */

const toNewEntry = (object: NewEntry): NewEntry => {

  switch(object.type){
    case 'Hospital':
      return {
        type: parseHospitalType(object.type),
        discharge: parseDischarge(object.discharge),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      };
    case 'OccupationalHealthcare':
      return {
        type: parseOccupationalHealthcareType(object.type),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      };
    case 'HealthCheck':
      return {
        type: parseHealthCheckType(object.type),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
      };
    default: 
      return assertNever(object);
  }
};


export default toNewEntry;

