export default interface CreateSusbscriptionDto {
  planName: string;
  gymId: string;
  durationInDays: number;
  price: number | string;
}
