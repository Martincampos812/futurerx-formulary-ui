export interface IPropT {
    name: string,
    label?:string | null,
    options: Array<string>,
    onSetAction?: any,
    fullWidth?: boolean,
    height: number,
    width: string | number
}