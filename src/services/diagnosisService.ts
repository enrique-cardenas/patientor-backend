import diagnosesEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesEntries;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};


export default {
  getDiagnoses
};
