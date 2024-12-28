import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewModeService {
  private viewModeSubject = new BehaviorSubject<string>('monthly');
  viewMode$ = this.viewModeSubject.asObservable();

  setViewMode(mode: string) {
    this.viewModeSubject.next(mode);
  }

  getViewMode() {
    return this.viewModeSubject.getValue();
  }
}
