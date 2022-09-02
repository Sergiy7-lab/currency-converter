import { Component, OnInit } from '@angular/core';
import {debounceTime, Subject} from "rxjs";
import {CurrencyDataService} from "../../services/currency-data.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  private leftSubject = new Subject<number>()
  private rightSubject = new Subject<number>()

  currencyName = ['USD', 'UAH', 'EUR'];

  currencyJson: any = [];

  firstSelect = 'USD';
  secondSelect = 'UAH';

  leftResult: any = 1;
  rightResult: any = 1;

  constructor(private currency: CurrencyDataService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    this.leftConvert()
    this.leftSubject.pipe(debounceTime(500)).subscribe((d) => {
      this.leftConvert()
    })
    this.rightSubject.pipe(debounceTime(500)).subscribe((d) => {
      this.rightConvert()
    })
  }

  fromCurrency(value: string) {
    this.firstSelect = value;
    this.leftConvert();
  }

  toCurrency(value: string) {
    this.secondSelect = value;
    this.rightConvert();
  }

  leftConvert() {
    this.currency.getCurrency(this.firstSelect).subscribe(data => {
      this.currencyJson = JSON.stringify(data)
      this.currencyJson = JSON.parse(this.currencyJson)

      if (this.secondSelect == 'USD') {
        this.rightResult = this.currencyJson.rates.USD
      }
      if (this.secondSelect == 'UAH') {
        this.rightResult = this.currencyJson.rates.UAH
      }
      if (this.secondSelect == 'EUR') {
        this.rightResult = this.currencyJson.rates.EUR
      }

      this.rightResult = this.currencyPipe.transform(this.leftResult * this.rightResult, 'UAH', '', '1.0-2')
    })
  }

  rightConvert() {
    this.currency.getCurrency(this.secondSelect).subscribe(data => {
      this.currencyJson = JSON.stringify(data)
      this.currencyJson = JSON.parse(this.currencyJson)

      if (this.firstSelect == 'USD') {
        this.leftResult = this.currencyJson.rates.USD
      }
      if (this.firstSelect == 'UAH') {
        this.leftResult = this.currencyJson.rates.UAH
      }
      if (this.firstSelect == 'EUR') {
        this.leftResult = this.currencyJson.rates.EUR
      }

      this.leftResult = this.currencyPipe.transform(this.rightResult * this.leftResult, 'UAH', '', '1.0-2')
    })
  }

  leftCurrency($event: any) {
    this.leftResult = $event.target.value;
    this.leftSubject.next(this.leftResult)
  }

  rightCurrency($event: any) {
    this.rightResult = $event.target.value;
    this.rightSubject.next(this.rightResult)
  }

}
