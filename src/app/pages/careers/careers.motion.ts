export function initCareers(): void {
  const jobs = Array.from(document.querySelectorAll<HTMLElement>('.jb-job'));
  jobs.forEach((job, index) => job.style.setProperty('--i', String(index)));

  const search = document.getElementById('jobSearch') as HTMLInputElement | null;
  const filters = document.getElementById('jobFilters');
  const count = document.getElementById('jobCount');
  const empty = document.getElementById('jobEmpty');
  let group = 'all';

  const apply = (): void => {
    const query = (search?.value || '').trim();
    let shown = 0;
    jobs.forEach((job) => {
      const title = job.querySelector('h3')?.textContent || '';
      const visible = (group === 'all' || job.getAttribute('data-group') === group) && (!query || title.includes(query));
      job.hidden = !visible;
      if (!visible) return;
      job.style.setProperty('--i', String(shown));
      job.classList.remove('is-in');
      void job.offsetWidth;
      job.classList.add('is-in');
      shown += 1;
    });
    if (count) count.textContent = `${shown} وظيفة متاحة`;
    if (empty) empty.hidden = shown !== 0;
  };

  filters?.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest('button');
    if (!button) return;
    group = button.getAttribute('data-filter') || 'all';
    filters.querySelectorAll('button').forEach((item) => item.classList.toggle('is-on', item === button));
    apply();
  });

  search?.addEventListener('input', apply);
  apply();
}
