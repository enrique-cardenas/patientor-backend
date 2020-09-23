/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try{
  const newPatientEntry = toNewPatientEntry(req.body);

  const addedEntry = patientService.addPatient(newPatientEntry);
  res.json(addedEntry);
  }
  catch(e){
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntry(req.body);
  const addedPatient = patientService.addEntryToPatient(req.params.id, newEntry);
  res.json(addedPatient);
});

export default router;