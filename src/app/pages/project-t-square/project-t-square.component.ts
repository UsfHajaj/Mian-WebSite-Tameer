import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-project-t-square',
  imports: [RouterLink],
  templateUrl: './project-t-square.component.html',
})
export class ProjectTSquareComponent {
  private readonly seo = inject(SeoService);

  scrollNext(event: Event): void {
    event.preventDefault();
    const target = document.getElementById('project-next');
    if (!target) return;
    const header = document.getElementById('mainHeader')?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - header - 12;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  constructor() {
    this.seo.apply({
  "title": "مشروع T Square Mall | التعمير لإدارة المرافق",
  "description": "مشروع T Square Mall - تشغيل وإشراف وأمن وحراسة بواسطة شركة التعمير لإدارة المرافق.",
  "keywords": "T Square Mall, تي سكوير مول, التعمير, تشغيل المولات, إدارة المرافق, الإشراف, الأمن والحراسة",
  "path": "/project_t_square",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.6",
  "changefreq": "weekly",
  "crumb": "مشروع T Square Mall",
  "robots": "index, follow, max-image-preview:large"
});
  }
}
