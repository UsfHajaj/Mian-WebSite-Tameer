import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-building-cleaning-work',
  imports: [RouterLink],
  templateUrl: './building-cleaning-work.component.html',
})
export class BuildingCleaningWorkComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "أعمال تنظيف المباني | التعمير لإدارة المرافق",
  "description": "خدمة أعمال تنظيف المباني السكنية - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/building_cleaning_work",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "النظافه العامه",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
