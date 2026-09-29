import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-garden-lighting-maintenance',
  imports: [RouterLink],
  templateUrl: './garden-lighting-maintenance.component.html',
})
export class GardenLightingMaintenanceComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "صيانة إضاءة الحدائق | التعمير لإدارة المرافق",
  "description": "خدمة صيانة إضاءة الحدائق والأسوار - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/garden_lighting_maintenance",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "إنارة الحدائق والأسوار",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
