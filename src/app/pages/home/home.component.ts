import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ImageComponent } from '../../component/image/image.component';
import { StaticConfigService } from '../../services/static-config.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { SliderComponent } from '../../component/slider/slider.component';
import { ProductSliderComponent } from '../../component/product-slider/product-slider.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ImageComponent,
    RouterModule,
    SliderComponent,
    ProductSliderComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public newProductsRow: any = undefined;
  public imagesURL:string = environment.imagesURL;
  public isInDevAlternate = false;
  public nbProductComingSoon:number = NaN;
  public nbProductLatest:number = NaN;
  public convertSizeForSmallScreen:any  = {
    '6': 12,
    '4': 6,
    '3': 6
  }

  public themeWorld:any = []

  constructor(private staticConfig:StaticConfigService, @Inject(LOCALE_ID) public locale: string) { }
  
  ngOnInit() {
    this.staticConfig.get('config').subscribe((config:any) => {
      StaticConfigService.config = config;
      this.themeWorld = config.theme_world;
    });
    console.log("config.theme_world")
  }

  onNbProductFetchEvent(event:any, state:string) {
    if(state == "COMINGSOON") {
      this.nbProductComingSoon = event;
    } else if(state == 'LATESTMODELS') {
      this.nbProductLatest = event;
    }

    // If NaN means that the event was not triggered yet
    if(isNaN(this.nbProductComingSoon) || isNaN(this.nbProductLatest)) {
      return;
    }

    if (this.nbProductComingSoon == 0 && this.nbProductLatest == 0) {
      this.isInDevAlternate = false;
    }
    else if(this.nbProductComingSoon == 0) {
      this.isInDevAlternate = true;
    }
  }
}
