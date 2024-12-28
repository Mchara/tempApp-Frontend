import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { DataService } from '../../shared/data.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    FileUploadModule,
    FormsModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './upload-file.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './upload-file.component.scss',
  providers: [MessageService],
})
export class UploadFileComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: FileUpload;
  @Output() plotTemplates = new EventEmitter<boolean>();
  @Output() plotData = new EventEmitter<any[]>();
  @Output() areThereDiscardedData = new EventEmitter<boolean>();
  dataFile!: File;
  title?: string;
  private readonly supportedFiles = ['csv'];

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onFileInputChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (!this.supportedFiles.includes(extension)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Only .csv files allowed',
        });
        return;
      }
      this.dataFile = file;
      this.title = file.name;
      this.resetFileInput();
    }
  }

  resetFileInput() {
    if (this.fileInput && this.fileInput.name) {
      this.fileInput.name = '';
    }
  }

  sendDataFile() {
    if (!this.dataFile) {
      console.log('No file has been provided');
    }
    this.dataService.uploadFile(this.dataFile).subscribe({
      next: (response) => {
        console.log('File uploaded successfully!');
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'File uploaded successfully!',
        });
        this.areThereDiscardedData.emit(response.discarder_rows != 0);
        this.plotData.emit(response.data);
        this.plotTemplates.emit(true);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error uploading the file',
        });
        console.error(error);
      },
    });
  }
}
