import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'product-slider',
  standalone: true,
  imports: [
    ProductBoxComponent,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss'
})
export class ProductSliderComponent implements OnInit, OnDestroy, OnChanges{
  public productsRow: any;
    @Input () title: string = '';
    @Input () componentId: string = '';
    @Input () alternate = false;
    @Input () apiParams:any = [];
    private chunkSize = window.innerWidth < 960 ? 2 : 4;
    private productData:any = undefined;
    @Output() nbProductFetchEvent = new EventEmitter<string>();


  constructor(private productService:ProductService) {}

  ngOnInit(): void {
    var params = [
      {'name': 'brand_id', 'op': 'in', 'val': environment.brandIds},
    ];
    params = params.concat(this.apiParams);
    this.productService.fetch('/products', params, 1, 40).subscribe({
      next: (data:any) => {
        this.productData = data.data;
        // send the number of product fetched to the parent component
        if(this.productData) {
          this.nbProductFetchEvent.emit(this.productData.length);
        }
        this.buildProductRow();
      },
      error: () => {
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['apiParams']) {
      if(changes['apiParams'].currentValue != changes['apiParams'].previousValue) {
        this.ngOnInit();
      }
    }
  }

  ngOnDestroy() {
    this.productData = undefined;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any; }; }) {
    var chunkSize = event.target.innerWidth < 960 ? 2 : 4;
    if(chunkSize != this.chunkSize) {
      this.chunkSize = chunkSize;
      this.buildProductRow();
    }
  }

  public buildProductRow() {
    if(this.productData !== undefined) {
      this.productsRow = array_chunk(this.productData, this.chunkSize);
    }
  }
}
function array_chunk(productData: any, chunkSize: number): any {
  throw new Error('Function not implemented.');
}

