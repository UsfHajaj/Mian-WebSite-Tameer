import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-equipment',
  imports: [],
  templateUrl: './equipment.component.html',
})
export class EquipmentComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "المعدات والأجهزة | التعمير لإدارة المرافق",
  "description": "المعدات والأجهزة المملوكة لشركة التعمير لإدارة المرافق لضمان جودة أعمال الصيانة والنظافة في المشروعات السكنية.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/equipment",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.7",
  "changefreq": "weekly",
  "crumb": "المعدات والآلات",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
