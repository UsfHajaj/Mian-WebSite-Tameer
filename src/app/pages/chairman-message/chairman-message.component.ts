import { Component, inject, signal } from '@angular/core';
import { SeoService } from '../../core/seo.service';

type LeadershipTab = 'chairman' | 'financial' | 'executive';

@Component({
  selector: 'app-chairman-message',
  imports: [],
  templateUrl: './chairman-message.component.html',
})
export class ChairmanMessageComponent {
  private readonly seo = inject(SeoService);
  readonly tab = signal<LeadershipTab>('chairman');

  select(tab: LeadershipTab): void {
    this.tab.set(tab);
  }

  constructor() {
    this.seo.apply({
  "title": "د. حسن الشوربجي | رئيس مجلس إدارة التعمير لإدارة المرافق",
  "description": "كلمة الدكتور حسن الشوربجي (حسن الشربجي) رئيس مجلس إدارة التعمير لإدارة المرافق — رؤية قيادة شركة التعمير تجاه المجتمعات السكنية ووزارة الإسكان.",
  "keywords": "حسن الشوربجي, حسن الشربجي, دكتور حسن الشوربجي, رئيس مجلس إدارة التعمير, التعمير, شركة التعمير, Al Tameer, رسالة مجلس الإدارة",
  "path": "/chairman_message",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.9",
  "changefreq": "weekly",
  "crumb": "الدكتور حسن الشوربجي",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
