export interface CreateSubscriptionDto {
  memberId: string;
  planId?: string;
  groupId?: string;
  startDate: string;
}
