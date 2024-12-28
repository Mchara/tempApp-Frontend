import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ViewModeService } from '../../shared/view-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './top-nav-bar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './top-nav-bar.component.scss',
})
export class TopNavBarComponent implements OnInit {
  isMonthActive?: boolean;
  private viewModeSubscription?: Subscription;
  constructor(private viewModeService: ViewModeService) {}

  ngOnInit() {
    this.viewModeSubscription = this.viewModeService.viewMode$.subscribe(
      (mode) => {
        this.isMonthActive = mode === 'monthly';
      }
    );
  }

  onMonthlyViewChange(isMonthly: boolean) {
    const mode = isMonthly ? 'monthly' : 'yearly';
    this.isMonthActive = isMonthly;
    this.viewModeService.setViewMode(mode);
  }

  ngOnDestroy() {
    if (this.viewModeSubscription) {
      this.viewModeSubscription.unsubscribe();
    }
  }
}
