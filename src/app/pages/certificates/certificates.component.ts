import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-certificates',
  imports: [RouterLink],
  templateUrl: './certificates.component.html',
})
export class CertificatesComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "الشهادات والاعتمادات | التعمير لإدارة المرافق",
  "description": "شهادات التقدير والاعتمادات التي حصلت عليها شركة التعمير لإدارة المرافق من الهيئات والجهات الرسمية.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/certificates",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "شهادات التقدير",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
