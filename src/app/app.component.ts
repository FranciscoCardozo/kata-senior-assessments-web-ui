import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { EventsService } from './services/eventsService/events.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'kata-senior-assessments-web-ui';

  constructor(
    private readonly eventsService: EventsService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.eventsService.redirectEvent$.subscribe((event: string) =>
      this.handleRedirectEvent(event));
  }

  handleRedirectEvent(event: string) {
    console.log('Redirecting to:', event);
    this.router.navigate([event]);
  }
}
