import {Component, OnInit} from '@angular/core';
import {CurrencyDataService} from "../../services/currency-data.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currUSD: number = 1;
  currEUR: number = 1;

  currencyJson: any = [];

  constructor(private currency: CurrencyDataService) {
  }

  ngOnInit(): void {
    this.currencyUSD();
    this.currencyEUR();
  }

  currencyUSD() {
    this.currency.getCurrency('USD').subscribe(data => {
      this.currencyJson = JSON.stringify(data)
      this.currencyJson = JSON.parse(this.currencyJson)

      this.currUSD = this.currencyJson.rates.UAH
    })
  }

  currencyEUR() {
    this.currency.getCurrency('EUR').subscribe(data => {
      this.currencyJson = JSON.stringify(data)
      this.currencyJson = JSON.parse(this.currencyJson)

      this.currEUR = this.currencyJson.rates.UAH
    })
  }

}
