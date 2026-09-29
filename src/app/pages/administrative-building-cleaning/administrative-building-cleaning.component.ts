import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-administrative-building-cleaning',
  imports: [RouterLink],
  templateUrl: './administrative-building-cleaning.component.html',
})
export class AdministrativeBuildingCleaningComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "تنظيف المباني الإدارية | التعمير لإدارة المرافق",
  "description": "خدمة تنظيف المباني الإدارية - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/administrative_building_cleaning",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "نظافة المباني الإدارية",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
