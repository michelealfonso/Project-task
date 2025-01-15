import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiURL = 'http://localhost:8080/projectsTask/project';
  private selectedProjectSubject = new BehaviorSubject<number | null>(null); // Gestisce l'ID del progetto selezionato
  selectedProject$ = this.selectedProjectSubject.asObservable(); // Observable che pubblica l'ID selezionato


  constructor(private http: HttpClient) { }

  // Metodo per recuperare tutti i progetti
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiURL).pipe(
      catchError(this.handleError)
    )
  }

  // Metodo per recuperare un singolo progetto dato l'ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // Metodo per impostare l'ID del progetto selezionato
  setSelectedProjectId(projectId: number): void {
    this.selectedProjectSubject.next(projectId);
  }

  // Metodo per ottenere l'ID del progetto selezionato
  getSelectedProjectId(): number | null {
    return this.selectedProjectSubject.getValue()
  }

  // Metodo per creare un nuovo progetto
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiURL, project);
  }

  // Metodo per aggiornare un progetto esistente
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiURL}/${id}`, project);
  }

  // Metodo per eliminare un progetto
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  private handleError(error: any) {
    console.error('Si è verificato un errore', error);
    return throwError(() => new Error(error.message || 'Errore sconosciuto'));
  }
}
