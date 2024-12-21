export default interface Group {
    _id: string;
    groupName: string;
    gymId: string;
    weekdays: string[];
    totalMembers: number;
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  