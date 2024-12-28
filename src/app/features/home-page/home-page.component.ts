import { Component, Input, OnInit } from '@angular/core';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { CommonModule } from '@angular/common';
import { PlottingScreenComponent } from '../plotting-screen/plotting-screen.component';
import { ViewModeService } from '../../shared/view-mode.service';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UploadFileComponent, CommonModule, PlottingScreenComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  viewMode: string = 'monthly';
  plotData?: any[];
  areDiscardedData: boolean = false;
  isPlottingScreenActive: boolean = false;
  constructor(private viewModeService: ViewModeService) {}

  ngOnInit(): void {
    this.viewModeService.viewMode$.subscribe((mode) => {
      this.viewMode = mode;
      console.log('Current view mode:', this.viewMode);
    });
  }

  onPlotDataUpdate(event: any): void {
    this.plotData = event;
  }
}
