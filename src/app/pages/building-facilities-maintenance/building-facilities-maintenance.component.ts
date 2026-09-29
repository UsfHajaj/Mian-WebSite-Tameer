import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-building-facilities-maintenance',
  imports: [RouterLink],
  templateUrl: './building-facilities-maintenance.component.html',
})
export class BuildingFacilitiesMaintenanceComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "صيانة مرافق المباني | التعمير لإدارة المرافق",
  "description": "خدمة صيانة مرافق المباني - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/building_facilities_maintenance",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "صيانة مرافق العمارات",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
