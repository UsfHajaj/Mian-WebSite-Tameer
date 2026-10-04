import { Component, DestroyRef, ElementRef, afterNextRender, ViewEncapsulation, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { initScrollFx } from '../../core/scroll-fx';
import { ShareholdersComponent } from '../../shared/shareholders/shareholders.component';
import { cities, governorates, homeServices } from './home.data';
import { initHomeMotion } from './home.motion';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ShareholdersComponent],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.css', './home-modern.css'],
})
export class HomeComponent {
  private readonly seo = inject(SeoService);
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  readonly services = homeServices;
  readonly cities = cities;
  readonly governorates = governorates;

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
    afterNextRender(() => {
      initHomeMotion();
      this.destroyRef.onDestroy(initScrollFx(this.host));
    });
  }
}
