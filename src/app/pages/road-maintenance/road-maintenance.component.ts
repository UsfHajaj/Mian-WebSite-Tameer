import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-road-maintenance',
  imports: [RouterLink],
  templateUrl: './road-maintenance.component.html',
})
export class RoadMaintenanceComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "اعمال صيانه و النظافة العامه للطرق | التعمير لإدارة المرافق",
  "description": "اعمال صيانه و النظافة العامه للطرق - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/road_maintenance",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "اعمال صيانه و النظافة العامه للطرق",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
