import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-maintenance-of-electric-elevators',
  imports: [RouterLink],
  templateUrl: './maintenance-of-electric-elevators.component.html',
})
export class MaintenanceOfElectricElevatorsComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "صيانة المصاعد الكهربائية | التعمير لإدارة المرافق",
  "description": "خدمة صيانة المصاعد الكهربائية - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/maintenance_of_electric_elevators",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "صيانة المصاعد الكهربائية",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
