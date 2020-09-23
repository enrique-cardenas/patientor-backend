import patientEntries from '../../data/patients';
import {NewPatient, Patient, PublicPatient, NewEntry, Entry} from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientEntries;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry
  };  

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (id: string, newEntry: NewEntry): Entry | undefined => {
  const patient = patients.find(d => d.id === id);

  const formattedEntry = {
    id: String(uuid()),
    ...newEntry
  };

  if(patient){
    const updatedPatient = {
      ...patient,
      entries: [...patient.entries, formattedEntry]
    };
    patients.map(p => p.id === patient.id ? updatedPatient : p);

    return formattedEntry;
  }
  return formattedEntry;
};  


export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntryToPatient
};
