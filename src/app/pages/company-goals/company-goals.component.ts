import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-company-goals',
  imports: [],
  templateUrl: './company-goals.component.html',
})
export class CompanyGoalsComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "أهداف الشركة ورؤيتها | التعمير لإدارة المرافق",
  "description": "أهداف ورؤية شركة التعمير لإدارة المرافق في تقديم خدمات إدارة وصيانة المرافق بأعلى معايير الجودة.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/company_goals",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "أهداف الشركة",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
