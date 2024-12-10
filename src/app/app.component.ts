import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Générateur de QR Code</h1>
      
      <div class="input-section">
        <input 
          [(ngModel)]="texte" 
          placeholder="Entrez votre texte"
        >
        <button (click)="genererQRCode()">Générer QR Code</button>
        <button (click)="reinitialiser()">Réinitialiser</button>
      </div>

      <div *ngIf="qrCodeUrl" class="qr-code-section">
        <h2>Votre QR Code</h2>
        <img [src]="qrCodeUrl" alt="QR Code généré">
        <p>{{ texte }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }

    .input-section {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    input {
      padding: 10px;
      width: 300px;
    }

    button {
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }

    .qr-code-section {
      margin-top: 20px;
    }

    img {
      max-width: 300px;
      margin: 20px 0;
    }
  `]
})
export class AppComponent {
  texte: string = '';
  qrCodeUrl: string = '';

  genererQRCode() {
    if (this.texte) {
      QRCode.toDataURL(this.texte, { errorCorrectionLevel: 'H' }, (err, url) => {
        if (err) {
          console.error('Erreur de génération du QR code', err);
          return;
        }
        this.qrCodeUrl = url;
      });
    }
  }

  reinitialiser() {
    this.texte = '';
    this.qrCodeUrl = '';
  }
}