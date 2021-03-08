import {Accumulator_Data_Type} from "../models/accumulator-model";

export const getAccumulatorTabNames = () => {
    const tabList: any[] = [
        {
            id: 1,
            text: "Accumulators – Part D"
        },
        {
            id: 2,
            text: "Accumulators – Part C Moop"
        }
    ]
    return tabList;
}

export const getAccumulatorMiniTabNames = () => {
  const tabList: any[] = [
      {
          id: 1,
          text: "In-Network"
      },
      {
          id: 2,
          text: "Out of Network"
      }
  ]
  return tabList;
}

// Stepper data
const acc_data1: Array<Accumulator_Data_Type> = [
  {stage: 0, name: "Deductible", max: 0, fill: 0},
  {stage: 1, name: "Initial Coverage", max: 320, fill: 320},
  {stage: 2, name: "Gap Coverage", max: 4000, fill: 900},
  {stage: 3, name: "Catastrophic", max: 6250, fill: 0},
];

export const getAccumulatorData = (): Array<Accumulator_Data_Type> => {
  return acc_data1;
}

const stepperConfig = [{
  name: "Deductible",
  value: 0,
  label: "1",
  stage: 1
},{
  name: "Initial Coverage",
  value: 320,
  label: "2",
  stage: 2
},{
  name: "Gap Coverage",
  value: 4200,
  label: "3",
  stage: 3
},{
  name: "Catastrophic",
  value: 6250,
  label: "4",
  stage: 4
}]

const stepper2Config = [{
  name: "Deductible",
  value: 0,
  label: "1",
  stage: 1
},{
  name: "Oop",
  value: 1000,
  label: "2",
  stage: 2
},{
  name: "Oop Max",
  value: 1400,
  label: "3",
  stage: 3
}]

export const getStepperConfig = () => {
  return stepperConfig;
}

export const getStepper2Config = () => {
  return stepper2Config;
}

export const getGridValues = () => {
  return true;
}