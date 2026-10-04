import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-shareholders',
  templateUrl: './shareholders.component.html',
  styleUrl: './shareholders.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ShareholdersComponent {
  readonly eyebrow = input('هيكل الملكية');
  readonly heading = input('هيكل المساهمين والجهات الداعمة');
  readonly lead = input('مساهمون استراتيجيون يدعمون الشركة في الحفاظ على الثروة العقارية وإدارة المرافق وفق أعلى المعايير.');

  readonly owners = [
    { name: 'هيئة المجتمعات العمرانية الجديدة', pct: '42.5%', size: 'xl', logo: '/images/logo2.png' },
    { name: 'صندوق الإسكان الاجتماعي ودعم التمويل العقاري', pct: '40%', size: 'lg', logo: '/images/logo3.png' },
    { name: 'الشركة القابضة لمياه الشرب والصرف الصحي', pct: '10%', size: 'md', logo: '/images/logo4.png' },
    { name: 'شركة المقاولون العرب لإدارة المرافق', pct: '7.5%', size: 'sm', logo: '/images/logo5.png' },
  ];
}
