import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from './layout/top-nav-bar/top-nav-bar.component';
import { UploadFileComponent } from './features/upload-file/upload-file.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'temperaturesApp';
  monthlyView?: boolean;
  yearlyView?: boolean;
}
