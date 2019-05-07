import { Component } from '@angular/core';
import { Room } from './room.model';
import { Booking } from './booking.model';

import { Observable } from 'rxjs/internal/Observable';

import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    //countryForm: FormGroup;
    title = "Benvenuti all'hotel degli alberi";
    RoomList: Room[] = [];
    selectedRoom: Room;
    bookingList: Booking[];

    rooms = this.RoomList;

    data: Object;
    o: Observable<Object>;
    oRoom: Observable<Booking[]>;
    roomData: Room[];

    visible = true;


    constructor(public http: HttpClient) { }

    ngOnInit() {
        this.makeTypedRequestAll();
        this.bookingList = new Array<Booking>();

    }

    //Controllo se l'id della stanza selezionata è nell'elenco.
    //In questo caso imposto la variabile selectedRoom
    onChange(r_id: number) {
        this.RoomList.forEach(
            (room: Room) => {
                if (room.id == r_id) this.selectedRoom = room;
            }
        )
    }

    onClickNascondi() {
        if (this.visible) {
            this.visible = false;
        } else this.visible = true;
    }

    onClick(n: HTMLInputElement, c: HTMLInputElement, d: HTMLInputElement, e: HTMLInputElement): boolean {
        this.bookingList.push(new Booking(this.selectedRoom, new Date(d.value), new Date(e.value), n.value, c.value));
        return false;
    }

    makeTypedRequestAll(): void {
        //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
        this.oRoom = this.http.get<Booking[]>('https://my-json-server.typicode.com/malizia-g/hotel/booking');
        this.oRoom.subscribe(data => {
            data.forEach(
                (booking: Booking) => {
                    console.log(booking.room);
                    this.RoomList.push(booking.room);
                }
            )
            this.selectedRoom = this.RoomList[0]
        });
    }
}
