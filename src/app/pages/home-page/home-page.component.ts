import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface HomeOption {
  title: string;
  description: string;
  icon: string;
  route: string;
  actionLabel: string;
  points: string[];
}

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  options: HomeOption[] = [
    {
      title: 'Analizar código',
      description:
        'Sube un archivo comprimido con tu código o pega la URL de un repositorio. source-trace lo descarga y ejecuta el análisis en el backend.',
      icon: 'travel_explore',
      route: '/analyze',
      actionLabel: 'Iniciar análisis',
      points: ['Archivo .zip o URL de repositorio', 'Descarga y procesamiento automático']
    },
    {
      title: 'Validar análisis',
      description:
        'Consulta el estado de un análisis en curso con su identificador y revisa los resultados cuando el proceso haya finalizado.',
      icon: 'fact_check',
      route: '/validate',
      actionLabel: 'Consultar estado',
      points: ['Seguimiento por identificador', 'Resultados y evidencias del análisis']
    }
  ];
}
