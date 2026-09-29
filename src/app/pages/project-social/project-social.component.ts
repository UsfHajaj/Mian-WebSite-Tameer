import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-project-social',
  imports: [RouterLink],
  templateUrl: './project-social.component.html',
})
export class ProjectSocialComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "مشروع الإسكان الاجتماعي | التعمير لإدارة المرافق",
  "description": "مشروع الإسكان الاجتماعي - إدارة وصيانة المرافق بواسطة شركة التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/project_social",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.8",
  "changefreq": "weekly",
  "crumb": "مشروع الإسكان الاجتماعي",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
