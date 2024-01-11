import { AfterViewInit, Component, Inject, NgZone, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './component/navigation/navigation.component';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'milezim-web';
  
  constructor(private ngZone: NgZone, @Inject(DOCUMENT) private document: Document){}

  ngOnInit() {
    this.scrollMenuEvent();
  }

  scrollMenuEvent() {
    this.ngZone.runOutsideAngular(() => {
      // toggle menu when scrolling
      const header = this.document.querySelector('.header');
      const headerHeight = header?.clientHeight;
      // event listener for scrolling
      window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (scrollPos > headerHeight!) {
          $('.header .menu').fadeOut();
        } else {
          $('.header .menu').fadeIn();
        }
      });
    });
  }
}
