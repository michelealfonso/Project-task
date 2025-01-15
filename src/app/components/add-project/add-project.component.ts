import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  imports: [
    CommonModule,

  ]
})
export class ProjectsComponent implements OnInit {

  projects = [
    {
      name: 'Progetto A',
      description: 'Descrizione breve del progetto A.',
      tasks: [
        { name: 'Task 1: Analisi iniziale', status: 'In corso' },
        { name: 'Task 2: Sviluppo del prototipo', status: 'Completato' },
        { name: 'Task 3: Test e validazione', status: 'In corso' }
      ]
    },
    {
      name: 'Progetto B',
      description: 'Descrizione breve del progetto B.',
      tasks: [
        { name: 'Task 1: Pianificazione', status: 'Completato' },
        { name: 'Task 2: Design', status: 'In corso' }
      ]
    },
    {
      name: 'Progetto C',
      description: 'Descrizione breve del progetto C.',
      tasks: [
        { name: 'Task 1: Preparazione', status: 'In attesa' },
        { name: 'Task 2: Implementazione', status: 'In corso' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Se hai bisogno di caricare dati da un'API, fai qui una chiamata al servizio
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completato': return 'text-green-500';
      case 'In corso': return 'text-yellow-500';
      case 'In attesa': return 'text-red-500';
      default: return 'text-gray-400';
    }
  }
}
