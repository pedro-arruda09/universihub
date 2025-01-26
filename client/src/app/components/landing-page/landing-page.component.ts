import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
    constructor() { }

    @Input() title!: string;
    @Input() subtitle!: string;
    @Input() illustration!: string;

    ngOnInit(): void {
    }
}
