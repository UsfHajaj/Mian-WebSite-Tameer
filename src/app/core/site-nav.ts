export interface NavLink {
  path: string;
  label: string;
}

export const aboutLinks: NavLink[] = [
  { path: '/about', label: 'نبذة عن الشركة' },
  { path: '/chairman_message', label: 'رؤية قادة التعمير لإدارة المرافق' },
  { path: '/board', label: 'مجلس الإدارة' },
  { path: '/company_goals', label: 'هدف الشركة' },
  { path: '/equipment', label: 'المعدات المملوكة' },
  { path: '/certificates', label: 'شهادات التقدير' },
];

export const serviceLinks: NavLink[] = [
  { path: '/road_maintenance', label: 'اعمال صيانه و النظافة العامه للطرق' },
  { path: '/security_and_guarding_work', label: 'أعمال الأمن والحراسة' },
  { path: '/sewage_network_maintenance', label: 'صيانة شبكات الصرف والتغذية' },
  { path: '/building_cleaning_work', label: 'النظافه العامه' },
  { path: '/administrative_building_cleaning', label: 'أعمال نظافة المباني الإدارية' },
  { path: '/green_area_maintenance', label: 'صيانة المساحات الخضراء' },
  { path: '/garden_lighting_maintenance', label: 'صيانة إنارة الحدائق والأسوار' },
  { path: '/building_facilities_maintenance', label: 'صيانة مرافق العمارات' },
  { path: '/maintenance_of_electric_elevators', label: 'صيانة المصاعد الكهربائية' },
  { path: '/real_estate_development', label: 'التطوير العقاري' },
  { path: '/contracting', label: 'أعمال المقاولات' },
  { path: '/contracting_transport', label: 'إدارة وتشغيل أسطول النقل' },
];

export const projectLinks: NavLink[] = [
  { path: '/project_social', label: 'مشروع الإسكان الاجتماعي' },
  { path: '/project_dar', label: 'مشروع دار مصر' },
  { path: '/project_janna', label: 'مشروع جنة' },
  { path: '/project_t_square', label: 'مشروع T Square Mall' },
];

export const aboutPaths = aboutLinks.map((link) => link.path);
export const servicePaths = ['/services', ...serviceLinks.map((link) => link.path)];
export const projectPaths = ['/project', ...projectLinks.map((link) => link.path)];
