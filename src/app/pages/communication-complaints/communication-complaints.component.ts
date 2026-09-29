import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-communication-complaints',
  imports: [],
  templateUrl: './communication-complaints.component.html',
})
export class CommunicationComplaintsComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply({
  "title": "التواصل والشكاوى | التعمير لإدارة المرافق",
  "description": "تواصل مع شركة التعمير لإدارة المرافق - تقديم الشكاوى والاستفسارات عبر نموذج التواصل المباشر.",
  "keywords": "التعمير, إدارة المرافق, صيانة, المدن الجديدة, وزارة الإسكان, الإسكان الاجتماعي, دار مصر, إدارة مشاريع سكنية, تنظيف, حراسة, صيانة مصاعد, شبكات الصرف الصحي, المساحات الخضراء",
  "path": "/communication-complaints",
  "image": "https://tameer-facility.com/images/socialhousing_high.jpg",
  "priority": "0.9",
  "changefreq": "weekly",
  "crumb": "التواصل والشكاوى",
  "robots": "index, follow, max-image-preview:large"
});
  }
  showService(type: 'contact' | 'complaint'): void {
    document.getElementById('service-selection')?.classList.add('d-none');
    document.getElementById('contact-service')?.classList.add('d-none');
    document.getElementById('complaint-service')?.classList.add('d-none');
    document.getElementById(type === 'contact' ? 'contact-service' : 'complaint-service')?.classList.remove('d-none');
    const pad = document.querySelector('.content-pad');
    if (pad instanceof HTMLElement) {
      window.scrollTo({ top: pad.offsetTop - 80, behavior: 'smooth' });
    }
  }

  resetService(): void {
    document.getElementById('service-selection')?.classList.remove('d-none');
    document.getElementById('contact-service')?.classList.add('d-none');
    document.getElementById('complaint-service')?.classList.add('d-none');
  }

  submitContact(event: Event): void {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const button = form.querySelector('[type="submit"]');
    if (!(button instanceof HTMLButtonElement)) return;
    const idle = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>جارٍ الإرسال...';
    fetch('/', { method: 'POST', body: new FormData(form) })
      .then(() => {
        window.alert('تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت.');
        form.reset();
        this.resetService();
      })
      .catch(() => {
        window.alert('حدث خطأ في الإرسال. يرجى التواصل عبر البريد الإلكتروني للشركة.');
      })
      .finally(() => {
        button.disabled = false;
        button.innerHTML = idle;
      });
  }

}
