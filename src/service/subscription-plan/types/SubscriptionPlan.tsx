export default interface SubscriptionPlan {
  _id: string;
  planName: string;
  gymId: string;
  durationInDays: number;
  price: number | string;
}
