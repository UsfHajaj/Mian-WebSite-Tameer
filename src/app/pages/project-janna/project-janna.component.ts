import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-project-janna',
  imports: [RouterLink],
  templateUrl: './project-janna.component.html',
})
export class ProjectJannaComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "مشروع جنّة | التعمير لإدارة المرافق",
  "description": "مشروع جنّة - إدارة وصيانة المرافق بواسطة شركة التعمير لإدارة المرافق.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/project_janna",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.8",
  "changefreq": "weekly",
  "crumb": "مشروع جنة",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
