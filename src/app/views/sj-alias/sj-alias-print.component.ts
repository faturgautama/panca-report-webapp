import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SJAliasService } from '../../services/sj-alias.service';
import { SJAlias } from '../../models/sj-alias.model';

@Component({
    selector: 'app-sj-alias-print',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sj-alias-print.component.html',
    styleUrls: ['./sj-alias-print.component.scss']
})
export class SJAliasPrintComponent implements OnInit {
    sjAliasData: SJAlias | null = null;
    isLoading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private sjAliasService: SJAliasService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.loadData(id || '1');
    }

    loadData(id: string): void {
        this.isLoading = true;
        this.error = null;

        this.sjAliasService.getSJAliasById(id).subscribe({
            next: (data) => {
                this.sjAliasData = data;
                this.isLoading = false;
                setTimeout(() => this.autoPrint(), 500);
            },
            error: (err) => {
                this.error = 'Gagal memuat data SJ Alias';
                this.isLoading = false;
                console.error('Error loading SJ Alias data:', err);
            }
        });
    }

    autoPrint(): void {
        window.print();
    }

    print(): void {
        window.print();
    }

    formatCurrency(value: number): string {
        return new Intl.NumberFormat('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    getFooterPaymentLines(): string[] {
        if (!this.sjAliasData?.footerPayment) return [];
        return this.sjAliasData.footerPayment
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line.length > 0);
    }
}
