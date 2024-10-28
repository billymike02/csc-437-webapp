export interface Journal {
  title: string;
  startDate: Date;
  endDate?: Date;
  entries?: Entry[];
}

export interface Entry {
  date: Date;
  subject?: string;
  content?: string;
}
