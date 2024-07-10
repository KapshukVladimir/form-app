import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/multi-form/pages/multi-form-page/multi-form-page.component'
      ).then((m) => m.MultiFormPageComponent),
  },
];
