import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CustomLoaderComponent } from "./custom-loader/custom-loader.component";

@Component({
  selector: 'app-plotting-screen',
  standalone: true,
  imports: [CommonModule, ToastModule, CustomLoaderComponent,CustomLoaderComponent],
  templateUrl: './plotting-screen.component.html',
  styleUrl: './plotting-screen.component.scss',
  providers: [MessageService],
})
export class PlottingScreenComponent implements OnInit {
  @Input() plotData?: any[];
  @Input() plotType?: string;
  plotImage: string | null = null;
  isLoading = false;
  chartOptions: any;
  chartData: any;
  plotImageUrl: SafeUrl | null = null;

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log(this.plotData);
    this.loadPlot();
  }

  ngOnChanges(): void {
    if (this.plotData) {
      this.loadPlot();
    }
  }

  switchPlotType(type: 'monthly' | 'yearly'): void {
    this.plotType = type;
    this.loadPlot();
  }

  loadPlot(): void {
    if (!this.plotData || this.plotData.length === 0) {
      console.error('No data available to plot.');
      return;
    }
    this.isLoading = true;
    this.dataService.getPlot(this.plotType, this.plotData).subscribe({
      next: (blob) => {
        const objectUrl = URL.createObjectURL(blob); 
        this.plotImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching plot:', error);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load the plot. Please try again.',
        });
      },
    });
  }
  
}
