import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';

interface ReportMenu {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CardModule, ButtonModule, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected reports = signal<ReportMenu[]>([
    {
      title: 'Surat Pesanan',
      description: 'Cetak surat pesanan untuk konsumen',
      icon: 'pi-file-edit',
      route: '/report/surat-pesanan/1',
      color: '#3498db'
    },
    {
      title: 'Surat Jalan PUS 1',
      description: 'Cetak surat jalan tipe PUS 1',
      icon: 'pi-truck',
      route: '/report/surat-jalan/pus1/1',
      color: '#2ecc71'
    },
    {
      title: 'Surat Jalan PUS 2',
      description: 'Cetak surat jalan tipe PUS 2',
      icon: 'pi-truck',
      route: '/report/surat-jalan/pus2/1',
      color: '#e74c3c'
    }
  ]);
}
