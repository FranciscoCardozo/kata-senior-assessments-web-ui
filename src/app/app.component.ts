import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { EventsService } from './services/eventsService/events.service';
import { ModalEvent } from './models/interfaces/modalEvent.interface';
import { ModalComponent } from "./components/modal/modal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'kata-senior-assessments-web-ui';

  modalProps = {
    open: false,
    title: '',
    description: ''
  };

  constructor(
    private readonly eventsService: EventsService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.eventsService.redirectEvent$.subscribe((event: string) => this.handleRedirectEvent(event));
    this.eventsService.openModalEvent$.subscribe((event: ModalEvent) => this.handleModal(event));
  }

  handleRedirectEvent(event: string) {
    this.router.navigate([event]);
  }

  handleModal(event: ModalEvent){
    this.modalProps.description = event.description;
    this.modalProps.open = event.open;
    this.modalProps.title = event.title;
  }
}
