import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  public imagesURL = environment.imagesURL
  @Input() public src: string = '';
  @Input() public alt: string = '';
  @Input() public class: string = '';
  @Input() public width: string = '';
  @Input() public height: string = '';
}
