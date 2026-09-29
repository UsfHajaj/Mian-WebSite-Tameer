import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-green-area-maintenance',
  imports: [RouterLink],
  templateUrl: './green-area-maintenance.component.html',
})
export class GreenAreaMaintenanceComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "صيانة المساحات الخضراء | التعمير لإدارة المرافق",
  "description": "خدمة صيانة المساحات الخضراء - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/green_area_maintenance",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "المساحات الخضراء",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
