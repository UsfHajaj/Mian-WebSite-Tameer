import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-contracting-transport',
  imports: [RouterLink],
  templateUrl: './contracting-transport.component.html',
})
export class ContractingTransportComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "إدارة وتشغيل أسطول النقل | التعمير لإدارة المرافق",
  "description": "خدمة النقل وإدارة وتشغيل أتوبيسات هيئة المجتمعات العمرانية - التعمير لإدارة المرافق.",
  "keywords": "",
  "path": "/contracting_transport",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.8",
  "changefreq": "weekly",
  "crumb": "إدارة وتشغيل أسطول النقل",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
