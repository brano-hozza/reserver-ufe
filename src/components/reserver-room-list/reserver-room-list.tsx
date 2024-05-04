import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import type { JSX } from '@stencil/core/internal';
import { RoomReservation, RoomReservationApiFactory } from '../../api/reserver';
import { RouterPage } from '../../types';

@Component({
  tag: 'reserver-room-list',
  styleUrl: 'reserver-room-list.css',
  shadow: true,
})
export class ReserverRoomList {
  // Events
  @Event() navigate: EventEmitter<string>;

  // Properties
  @Prop() apiBase: string;

  // State
  @State() errorMessages: string[] = [];

  reservations: RoomReservation[];

  private async getReservationsAsync() {
    try {
      const response = await RoomReservationApiFactory(undefined, this.apiBase).getReservations();
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessages.push(`Cannot retrieve list of reservations: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve list of reservations: ${err.message || 'unknown'}`);
    }
    return [];
  }

  async componentWillLoad() {
    this.reservations = await this.getReservationsAsync();
  }

  private editReservation(id: string) {
    this.navigate.emit(`reservation/${id}`);
  }

  displayReservations(): JSX.Element[] {
    return this.reservations.map(reservation => (
      <md-list-item>
        <md-icon slot="start">home_health</md-icon>
        <div slot="headline">Room {reservation.room}</div>
        <md-icon style={{ cursor: 'pointer' }} slot="end" onClick={() => this.editReservation(reservation.id)}>
          edit
        </md-icon>
      </md-list-item>
    ));
  }

  render() {
    return (
      <Host>
        <div part="header">
          <h2>Room list</h2>
          <button id="navigation-button" onClick={() => this.navigate.emit(RouterPage.HOME)}>
            Back to home
          </button>
        </div>
        {this.errorMessages.length > 0 ? this.errorMessages.map(e => <div part="error-message">{e}</div>) : <md-list>{this.displayReservations()}</md-list>}
        <button id="new-reservation-button" onClick={() => this.navigate.emit('reservation/@new')}>
          New reservation
        </button>
      </Host>
    );
  }
}
