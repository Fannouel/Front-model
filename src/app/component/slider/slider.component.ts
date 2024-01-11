import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StaticConfigService } from '../../services/static-config.service';
import { RouterModule } from '@angular/router';
import { ImageComponent } from '../image/image.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'slider',
  standalone: true,
  imports: [
    RouterModule,
    ImageComponent,
    CommonModule
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit{
  public slides: any = [];
  public imagesURL:string = environment.imagesURL;

  constructor(private staticConfigService:StaticConfigService, @Inject(LOCALE_ID) public locale: string) {}

  ngOnInit(): void {
    this.staticConfigService.get('config').subscribe(
      {next: (config:any) => {
        StaticConfigService.config = config;
        this.slides = config.slides;
    }});
  }
}
