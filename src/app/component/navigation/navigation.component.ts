import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SelectLocaleComponent } from '../select-local/select-locale.component';
import { CommonModule } from '@angular/common';
import { StaticConfigService } from '../../services/static-config.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [
    SearchBarComponent,
    SelectLocaleComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  public imagesURL = environment.imagesURL;
  public categories: any[] = [];
  public loading = true;

  constructor(private staticConfigService: StaticConfigService, @Inject(LOCALE_ID) public locale: string) {}

  ngOnInit() {
    this.loading = true;
    this.staticConfigService.get('config').subscribe({
      next: (config: any) => {
        StaticConfigService.config = config;
        console.log()
        this.categories = config.categories as any[];
        this.categories.sort((a, b) => a.name[this.locale].localeCompare(b.name[this.locale]));
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
 
}
