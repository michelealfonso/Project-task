import { User } from "./user";

export interface Task {
  id: number,
  description: string,
  state: string,
  assignedTo: User | null,
}
