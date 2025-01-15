import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project-service.service';
import { Project } from '../../interfaces/project';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from "../add-project/add-project.component";
import { catchError, map, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ProjectsComponent
]
})
export class DashboardComponent implements OnInit {


  username = 'Michele';
  projects: Project[] = [];
  selectedProjectId: number | null = null;  // ID del progetto selezionato
  isLoaded: boolean = false;

  constructor (private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().pipe(
      // Mappa i dati ricevuti
      map((data) => {
        this.projects = data;
        this.isLoaded = true; // Imposta isLoaded a true quando i dati sono disponibili
      }),
      // Gestisci eventuali errori
      catchError((error) => {
        console.error('Errore nel caricamento dei progetti', error);
        this.isLoaded = true; // Imposta isLoaded a true anche in caso di errore
        return of([]); // Restituisce un array vuoto per evitare di bloccare l'interfaccia
      })
    ).subscribe();
  }

  onChangeProject(): void {
    this.selectedProjectId = this.projectService.getSelectedProjectId(); // Recupera l'ID del progetto selezionato

    if (this.selectedProjectId !== null) {
      this.router.navigate([`/tasks/${this.selectedProjectId}`]);
    }

  }
}
