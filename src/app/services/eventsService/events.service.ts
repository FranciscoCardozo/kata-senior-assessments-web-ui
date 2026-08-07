import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private redirectSubject = new Subject<string>();
  redirectEvent$ = this.redirectSubject.asObservable();

  redirectEvent(event: string) {
    this.redirectSubject.next(event);
  }
}
