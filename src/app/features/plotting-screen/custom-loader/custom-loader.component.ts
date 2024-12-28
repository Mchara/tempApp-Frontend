import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-loader.component.html',
  styleUrl: './custom-loader.component.scss',
})
export class CustomLoaderComponent implements OnInit {
  constructor(){};

  ngOnInit(): void {}
}
