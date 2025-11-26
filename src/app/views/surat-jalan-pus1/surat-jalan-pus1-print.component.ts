import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SuratJalanMockService } from '../../services/surat-jalan-mock.service';
import { SuratJalan } from '../../models/surat-jalan.model';

@Component({
    selector: 'app-surat-jalan-pus1-print',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './surat-jalan-pus1-print.component.html',
    styleUrls: ['./surat-jalan-pus1-print.component.scss']
})
export class SuratJalanPus1PrintComponent implements OnInit {
    data = signal<SuratJalan | null>(null);
    loading = signal(true);
    error = signal<string | null>(null);

    constructor(
        private route: ActivatedRoute,
        private suratJalanService: SuratJalanMockService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.loadData(id || '1');
    }

    loadData(id: string): void {
        this.loading.set(true);
        this.error.set(null);

        this.suratJalanService.getSuratJalanPUS1(id).subscribe({
            next: (data) => {
                this.data.set(data);
                this.loading.set(false);
                setTimeout(() => this.autoPrint(), 500);
            },
            error: (err) => {
                this.error.set('Gagal memuat data Surat Jalan PUS1');
                this.loading.set(false);
                console.error('Error loading data:', err);
            }
        });
    }

    autoPrint(): void {
        window.print();
    }

    print(): void {
        window.print();
    }

    formatDate(dateString: any): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    formatNumber(value: number): string {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }
}
