import { Component, afterNextRender, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { initCareers } from './careers.motion';

@Component({
  selector: 'app-careers',
  imports: [],
  templateUrl: './careers.component.html',
})
export class CareersComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "الوظائف المتاحة | التعمير لإدارة المرافق",
  "description": "الوظائف المتاحة في شركة التعمير لإدارة المرافق. تقدّم الآن عبر نموذج التوظيف الرسمي.",
  "keywords": "وظائف التعمير, التوظيف, التعمير لإدارة المرافق, وظائف صيانة, وظائف نظافة, وظائف أمن, المدن الجديدة",
  "path": "/careers",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.9",
  "changefreq": "weekly",
  "crumb": "الوظائف المتاحة",
  "robots": "index, follow, max-image-preview:large"
});
    afterNextRender(() => initCareers());
  }
}
