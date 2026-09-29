import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "الخدمات - إدارة المرافق والصيانة | التعمير لإدارة المرافق",
  "description": "خدمات التعمير لإدارة المرافق: صيانة الطرق، النظافة، الحراسة، شبكات الصرف، المساحات الخضراء، المصاعد الكهربائية وصيانة مرافق المباني.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/services",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.9",
  "changefreq": "weekly",
  "crumb": "خدماتنا المتخصصة",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
