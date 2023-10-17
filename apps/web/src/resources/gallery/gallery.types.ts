export interface Art {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  userId: string;
  path: string;
  isPublic: boolean;
}
