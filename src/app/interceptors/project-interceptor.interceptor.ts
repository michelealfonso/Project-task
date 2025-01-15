import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project-service.service'; // Importa il servizio per il progetto

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {

  constructor(private projectService: ProjectService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ottieni l'ID del progetto selezionato
    const selectedProjectId = this.projectService.getSelectedProjectId();

    // Se un progetto è selezionato, aggiungilo come parametro della query
    if (selectedProjectId) {
      const clonedRequest = req.clone({
        setParams: {
          projectId: selectedProjectId.toString() // Aggiungi il projectId alla query
        }
      });
      return next.handle(clonedRequest); // Procedi con la richiesta modificata
    }

    // Se non c'è nessun progetto selezionato, procedi con la richiesta originale
    return next.handle(req);
  }
}
