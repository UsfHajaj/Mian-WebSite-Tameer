import { Component, ViewEncapsulation, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-protocol-tameer-ahly-misr',
  imports: [],
  templateUrl: './protocol-tameer-ahly-misr.component.html',
  styleUrl: './protocol-tameer-ahly-misr.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProtocolTameerAhlyMisrComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "بروتوكول تعاون بين التعمير لإدارة المرافق والأهلي مصر لإدارة الأصول العقارية",
  "description": "شركة التعمير لإدارة المرافق توقع بروتوكول تعاون استراتيجي مع الأهلي مصر لإدارة الأصول العقارية لتعظيم قيمة الأصول ورفع كفاءة التشغيل والصيانة.",
  "keywords": "التعمير لإدارة المرافق, الأهلي مصر لإدارة الأصول العقارية, بروتوكول تعاون, إدارة الأصول العقارية, تشغيل وصيانة الأصول, الدكتور حسن الشربجي, مجدي يوسف حسين",
  "path": "/protocol-tameer-ahly-misr",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "1.0",
  "changefreq": "daily",
  "crumb": "الدكتور حسن الشوربجي: شراكة «التعمير لإدارة المرافق» مع «الأهلي مصر» لتعظيم قيمة الأصول ورفع كفاءة التشغيل",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
