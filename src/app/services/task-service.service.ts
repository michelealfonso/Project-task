import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) { }

  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiURL}projectId=${projectId}`);
  }

  createTask(task: any) {
    return this.http.post<Task>(this.apiURL, task);
  }

  updateTask(taskId: number, state: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiURL}/${taskId}`, { state });
  }

}
