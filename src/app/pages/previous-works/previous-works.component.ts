import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-previous-works',
  imports: [],
  templateUrl: './previous-works.component.html',
})
export class PreviousWorksComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "الأعمال السابقة والمشاريع | التعمير لإدارة المرافق",
  "description": "الأعمال السابقة والمشاريع التي نفذتها شركة التعمير لإدارة المرافق في مختلف المحافظات والمدن الجديدة.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/previous_works",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "سابقة الأعمال",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
