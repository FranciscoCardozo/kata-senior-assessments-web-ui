import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalEvent } from '../../models/interfaces/modalEvent.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private redirectSubject = new Subject<string>();
  redirectEvent$ = this.redirectSubject.asObservable();

  private openModalSubject = new Subject<ModalEvent>();
  openModalEvent$ = this.openModalSubject.asObservable();

  redirectEvent(event: string) {
    this.redirectSubject.next(event);
  }

  openModal(event: ModalEvent) {
    this.openModalSubject.next(event);
  }
}
