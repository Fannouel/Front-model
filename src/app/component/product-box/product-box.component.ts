import { Component, Input } from '@angular/core';
import { Product } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-box',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {
  @Input() product: Product | undefined;
  public imagesURL:string = environment.imagesURL;
  public productsImageURL  = environment.imagesURL + '/products/';

  public onImageError(event:any) {
    var noImageURL = environment.imagesURL  + "/website_assets/schuco/no-picture-thumb.jpg";
    event.target.src = noImageURL;
    var parent = event.target.parentElement
    for(let source of parent.querySelectorAll('source')) {
      source.srcset = noImageURL;
    }
  }
}
