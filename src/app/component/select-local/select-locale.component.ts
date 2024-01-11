
import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'select-locale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-locale.component.html',
  styleUrl: './select-locale.component.scss'
})
export class SelectLocaleComponent {

  public locales: { [key: string]: string } = {
    'de': 'Deutsch',
    'en': 'English',
    'fr': 'Français',
  }
  public defaultLocale: string = 'en';

  constructor(@Inject(LOCALE_ID) public locale: string) {}

  public changeLocale(locale: string): void {
    // language is at the first position in the path
    var path = window.location.pathname;
    var pathArray = path.split('/');
    if(Object.keys(this.locales).indexOf(locale) === -1) {
      locale = this.defaultLocale;
    }

    if(Object.keys(this.locales).indexOf(pathArray[1]) !== -1) {
      pathArray[1] = locale;
    } else {
      // Add locale to path
      pathArray.splice(1, 0, locale);
    }

    var newPathname = pathArray.join('/');
    window.location.pathname = newPathname;
  }

}
