export interface Task {
  id?: string;
  content: string;
  step?: Array<any>;
  remind?: boolean;
  dueDate?: any;
  category?: Array<any>;
  note?: String;
  complete?: boolean;
  repeat?: boolean;
  important?: boolean;
}
