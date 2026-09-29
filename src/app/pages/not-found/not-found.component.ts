import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEFAULT_IMAGE, SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor() {
    inject(SeoService).apply({
      title: 'الصفحة غير موجودة | التعمير لإدارة المرافق',
      description: 'الصفحة المطلوبة غير متاحة على موقع شركة التعمير لإدارة المرافق.',
      keywords: '',
      path: '/404',
      image: DEFAULT_IMAGE,
      priority: '0',
      changefreq: 'yearly',
      crumb: 'الصفحة غير موجودة',
      robots: 'noindex, nofollow',
    });
  }
}
