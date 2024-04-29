import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import type { JSX } from '@stencil/core/internal';
import { RoomReservation, RoomReservationApiFactory } from '../../api/reserver';

@Component({
  tag: 'reserver-room-list',
  styleUrl: 'reserver-room-list.css',
  shadow: true,
})
export class ReserverRoomList {
  @Event() edit: EventEmitter<string>;
  @Event() back: EventEmitter<void>;
  @Prop() apiBase: string;
  @State() errorMessage: string;
  reservations: RoomReservation[];

  private async getReservationsAsync() {
    try {
      const response = await RoomReservationApiFactory(undefined, this.apiBase).getReservations();
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || 'unknown'}`;
    }
    return [];
  }

  async componentWillLoad() {
    this.reservations = await this.getReservationsAsync();
  }

  private  editReservation(id: string) {
    console.log(`Editing reservation ${id}`)
    this.edit.emit(id);
  }

  displayReservations(): JSX.Element[] {
    return this.reservations.map((reservation) => (
      <md-list-item>
          <md-icon slot="start">home_health</md-icon>
          <div slot="headline">
            Room {reservation.roomNumber}
          </div>
          <md-icon style={{cursor: 'pointer'}} slot="end" onClick={() => this.editReservation(reservation.id)}>
            edit
          </md-icon >
      </md-list-item>
    ));
  }

  render() {
    return (
      <Host>
        Room list

        <md-list>
          {this.displayReservations()}
        </md-list>
        <button onClick={() => this.back.emit()}>Back</button>
      </Host>
    );
  }

}
