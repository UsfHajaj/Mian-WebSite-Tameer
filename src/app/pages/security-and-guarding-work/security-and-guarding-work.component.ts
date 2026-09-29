import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-security-and-guarding-work',
  imports: [RouterLink],
  templateUrl: './security-and-guarding-work.component.html',
})
export class SecurityAndGuardingWorkComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "الأعمال الأمنية والحراسية | التعمير لإدارة المرافق",
  "description": "خدمة الأعمال الأمنية والحراسية - التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/security_and_guarding_work",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "الأمن والحراسة",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
