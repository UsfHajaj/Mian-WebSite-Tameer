import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-real-estate-development',
  imports: [RouterLink],
  templateUrl: './real-estate-development.component.html',
})
export class RealEstateDevelopmentComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "التطوير العقاري | التعمير لإدارة المرافق",
  "description": "خدمة التطوير العقاري والاستثمار - التعمير لإدارة المرافق.",
  "keywords": "",
  "path": "/real_estate_development",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "التطوير العقاري والاستثماري",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
