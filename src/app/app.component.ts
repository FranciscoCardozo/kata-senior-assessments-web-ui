import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MaterialDialogComponent } from './components/modal/modal.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ModalEvent } from './models/interfaces/modalEvent.interface';
import { EventsService } from './services/eventsService/events.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'source-trace';

  modalProps = {
    open: false,
    title: '',
    description: ''
  };

  constructor(
    private readonly eventsService: EventsService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.eventsService.redirectEvent$.subscribe((event: string) => this.handleRedirectEvent(event));
    this.eventsService.openModalEvent$.subscribe((event: ModalEvent) => this.handleModal(event));
  }

  handleRedirectEvent(event: string) {
    this.router.navigate([event]);
  }

  handleModal(event: ModalEvent) {
    this.modalProps.description = event.description;
    this.modalProps.open = event.open;
    this.modalProps.title = event.title;

    if (event.open) {
      this.dialog.open(MaterialDialogComponent, {
        width: 'min(90vw, 480px)',
        panelClass: 'app-material-dialog-panel',
        data: {
          title: event.title,
          description: event.description,
          confirmLabel: 'Aceptar',
          cancelLabel: 'Cerrar'
        }
      });
    }
  }
}
