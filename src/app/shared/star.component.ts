import { Component, OnChanges, Input, EventEmitter, Output }from "@angular/core";


@Component({
    selector: 'pm-star',
    templateUrl: "./star.component.html",
    styleUrls: ["./star.component.css"]

})

export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<number> = 
        new EventEmitter<number>();
    //eventemitter sluzi za slanje podataka iz nested komponente
    // u parent komponentu
    ngOnChanges(): void {
        this.starWidth = this.rating * 75 / 5;
    }
    //triba se stavit event emitter da bi se moglo poslat u parent komponenut
    onClick():void{
        this.ratingClicked.emit(this.rating);
        console.log(this.rating);
    }
}