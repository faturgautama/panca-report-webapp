import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuratJalanService } from '../../services/surat-jalan.service';
import { SuratJalan } from '../../models/surat-jalan.model';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

@Component({
    selector: 'app-surat-jalan-print',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './surat-jalan-print.component.html',
    styleUrls: ['./surat-jalan-print.component.scss']
})
export class SuratJalanPrintComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private suratJalanService = inject(SuratJalanService);

    protected data = signal<SuratJalan | null>(null);
    protected loading = signal(true);
    protected error = signal<string | null>(null);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        const type = this.route.snapshot.paramMap.get('type') as 'PUS1' | 'PUS2';

        if (id && type) {
            this.loadData(id, type);
        } else {
            this.error.set('ID atau Type tidak ditemukan');
            this.loading.set(false);
        }
    }

    private loadData(id: string, type: 'PUS1' | 'PUS2'): void {
        this.suratJalanService.getSuratJalanById(id, type).subscribe({
            next: (data) => {
                this.data.set(data);
                this.loading.set(false);
                setTimeout(() => window.print(), 500);
            },
            error: (err) => {
                this.error.set('Gagal memuat data: ' + err.message);
                this.loading.set(false);
            }
        });
    }

    protected formatDate(date: Date): string {
        return format(new Date(date), 'dd-MM-yyyy', { locale: localeId });
    }

    protected formatNumber(num: number): string {
        return num.toFixed(2);
    }

    protected print(): void {
        window.print();
    }
}
