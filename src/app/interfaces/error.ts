export type TErrorMessage = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: TErrorMessage;
};
