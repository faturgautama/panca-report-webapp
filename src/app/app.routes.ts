import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { SuratPesananPrintComponent } from './views/surat-pesanan/surat-pesanan-print.component';
import { SuratJalanPrintComponent } from './views/surat-jalan/surat-jalan-print.component';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'report/surat-pesanan/:id',
        component: SuratPesananPrintComponent
    },
    {
        path: 'report/surat-jalan/:type/:id',
        component: SuratJalanPrintComponent
    }
];
