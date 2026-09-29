import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "مجلس الإدارة | التعمير لإدارة المرافق",
  "description": "مجلس إدارة شركة التعمير لإدارة المرافق: رئيس المجلس والأعضاء، وموجز عن دور كل منهم في الإسكان والمرافق والتشغيل.",
  "keywords": "مجلس إدارة التعمير, حسن الشوربجي, التعمير لإدارة المرافق, Al Tameer",
  "path": "/board",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.8",
  "changefreq": "monthly",
  "crumb": "مجلس الإدارة",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
