interface ILobs {
  id: number | string | null;
  value: number | null;
  text: string | null;
  ischecked: boolean;
}

// for lobs DS
export interface IFormularyLobs {
  result: ILobs[];
  code: string | null;
  message: string | null;
}
