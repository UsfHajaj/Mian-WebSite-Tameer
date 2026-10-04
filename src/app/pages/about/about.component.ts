import { Component, afterNextRender, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { mountOrgChart } from './org-chart';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  private stopChart?: () => void;

  private readonly seo = inject(SeoService);

  scrollNext(event: Event): void {
    event.preventDefault();
    const target = document.getElementById('company-story');
    if (!target) return;
    const header = document.getElementById('mainHeader')?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - header - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  constructor() {
    this.seo.apply({
  "title": "عن التعمير | شركة التعمير لإدارة المرافق | Al Tameer",
  "description": "عن شركة التعمير لإدارة المرافق (التعمير — Al Tameer): تأسيسها ورؤيتها وخبرتها في إدارة وصيانة المشروعات السكنية بالمدن الجديدة. يرأسها الدكتور حسن الشوربجي.",
  "keywords": "التعمير, شركة التعمير, التعمير لإدارة المرافق, Al Tameer, حسن الشوربجي, حسن الشربجي, وزارة الإسكان, المدن الجديدة, الإسكان الاجتماعي, دار مصر",
  "path": "/about",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.9",
  "changefreq": "weekly",
  "crumb": "نبذة عن الشركة",
  "robots": "index, follow, max-image-preview:large"
});
    afterNextRender(() => { void mountOrgChart().then((stop) => { this.stopChart = typeof stop === 'function' ? stop : undefined; }); });
  }

  ngOnDestroy(): void {
    this.stopChart?.();
  }
}
