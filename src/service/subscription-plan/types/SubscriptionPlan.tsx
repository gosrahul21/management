export default interface SubscriptionPlan {
  _id: string;
  planName: string;
  gymId: string;
  totalMembers: number;
  durationInDays: number;
  price: number | string;
}
