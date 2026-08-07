import { Component } from '@angular/core';
import { EventsService } from '../../services/eventsService/events.service';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  constructor(
    private readonly eventsService: EventsService
  ) {}

  handleSelectedOption(event: string) {
    this.eventsService.redirectEvent(event);
  }
}
