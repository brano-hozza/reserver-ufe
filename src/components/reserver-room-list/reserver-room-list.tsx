import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import type { JSX } from '@stencil/core/internal';
import { DepartmentsApiFactory, Doctor, Room, RoomReservation, RoomReservationApiFactory } from '../../api/reserver';
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

  @State() reservations: RoomReservation[] = [];

  rooms: Room[] = [];
  doctors: Doctor[] = [];

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

  private async getRoomsAsync() {
    try {
      const response = await RoomReservationApiFactory(undefined, this.apiBase).getRooms();
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessages.push(`Cannot retrieve list of rooms: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve list of rooms: ${err.message || 'unknown'}`);
    }
    return [];
  }

  private async getDoctorsAsync() {
    try {
      const response = await DepartmentsApiFactory(undefined, this.apiBase).getDoctors();
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessages.push(`Cannot retrieve list of doctors: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve list of doctors: ${err.message || 'unknown'}`);
    }
    return [];
  }

  async componentWillLoad() {
    this.reservations = await this.getReservationsAsync();
    this.rooms = await this.getRoomsAsync();
    this.doctors = await this.getDoctorsAsync();
  }

  private editReservation(id: string) {
    this.navigate.emit(`reservation/${id}`);
  }

  private async deleteReservation(id: string) {
    try {
      const response = await RoomReservationApiFactory(undefined, this.apiBase).deleteReservation(id);
      if (response.status < 299) {
        this.reservations = this.reservations.filter(e => e.id !== id);
      } else {
        this.errorMessages.push(`Cannot delete reservation: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot delete reservation: ${err.message || 'unknown'}`);
    }
  }

  private getRoomName(roomId: string): string {
    const room = this.rooms.find(r => r.id === roomId);
    return room ? room.roomNumber : 'unknown';
  }

  private getDoctorName(doctorId: string): string {
    const doctor = this.doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'unknown';
  }

  displayReservations(): JSX.Element[] {
    return this.reservations.map(reservation => (
      <md-list-item>
        <md-icon slot="start">home_health</md-icon>
        <div slot="headline">
          Room {this.getRoomName(reservation.room)} ({this.getDoctorName(reservation.doctor)})
        </div>
        <md-icon style={{ cursor: 'pointer' }} slot="end" onClick={() => this.editReservation(reservation.id)}>
          edit
        </md-icon>
        <md-icon style={{ cursor: 'pointer' }} slot="end" onClick={() => this.deleteReservation(reservation.id)}>
          delete
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
