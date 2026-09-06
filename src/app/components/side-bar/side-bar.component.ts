import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

type NavItem = {
  label: string;
  route: string;
  icon: string;
};

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  navItems: NavItem[] = [
    { label: 'Inicio', route: '/', icon: 'home' },
    { label: 'Analizar código', route: '/analyze', icon: 'travel_explore' },
    { label: 'Validar análisis', route: '/validate', icon: 'fact_check' }
  ];
}
