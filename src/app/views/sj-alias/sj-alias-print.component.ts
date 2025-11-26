import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SJAliasMockService } from '../../services/sj-alias-mock.service';
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
        private sjAliasService: SJAliasMockService
    ) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.isLoading = true;
        this.error = null;

        this.sjAliasService.getSJAliasData().subscribe({
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
}
