import { Component, afterNextRender, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { initHomeMotion } from './home.motion';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './home.css',
})
export class HomeComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "التعمير | شركة التعمير لإدارة المرافق | Al Tameer",
  "description": "التعمير (شركة التعمير لإدارة المرافق — Al Tameer) التابعة لوزارة الإسكان: إدارة وصيانة المشروعات السكنية بالمدن الجديدة. رئيس مجلس الإدارة الدكتور حسن الشوربجي (حسن الشربجي).",
  "keywords": "التعمير, شركة التعمير, التعمير لإدارة المرافق, Al Tameer, Al Tameer Facility Management, حسن الشوربجي, حسن الشربجي, حسن الشوربجى, دكتور حسن الشوربجي, رئيس مجلس إدارة التعمير, إدارة المرافق, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, سكن مصر, جنة, صيانة, المدن الجديدة",
  "path": "/",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "1.0",
  "changefreq": "weekly",
  "crumb": "الرئيسية",
  "robots": "index, follow, max-image-preview:large"
});
    afterNextRender(() => initHomeMotion());
  }
}
