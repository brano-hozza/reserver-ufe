import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { Department, DepartmentsApiFactory, Doctor, Room, RoomReservation, RoomReservationApiFactory } from '../../api/reserver';
import { RouterPage } from '../../types';

@Component({
  tag: 'reserver-reservation-editor',
  styleUrl: 'reserver-reservation-editor.css',
  shadow: true,
})
export class ReserverReservationEditor {
  // Events
  @Event() navigate: EventEmitter<string>;

  // Properties
  @Prop() apiBase: string;
  @Prop() entityId: string;

  // State
  @State() errorMessages: string[] = [];
  @State() reservation: RoomReservation;
  @State() reservations: RoomReservation[] = [];
  @State() rooms: Room[] = [];
  @State() departments: Department[] = [];
  @State() doctors: Doctor[] = [];

  @State() selectedRoom: string | null = null;
  @State() selectedDepartment: string | null = null;
  @State() selectedDoctor: string | null = null;

  get isNew() {
    return this.entityId === '@new';
  }

  async getReservation(): Promise<RoomReservation | null> {
    if (!this.entityId) {
      return null;
    }
    if (this.isNew) {
      return {
        id: '@new',
        room: '',
        department: '',
        doctor: '',
      };
    }
    try {
      const response = await RoomReservationApiFactory(undefined, this.apiBase).getReservationById(this.entityId);
      if (response.status < 299) {
        return response.data;
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve reservation: ${err.message || 'unknown'}`);
      console.error(err);
    }
    return null;
  }

  async getReservations(): Promise<RoomReservation[]> {
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

  async getRooms(): Promise<Room[]> {
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

  async getDepartments(): Promise<Department[]> {
    try {
      const response = await DepartmentsApiFactory(undefined, this.apiBase).getDepartments();
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessages.push(`Cannot retrieve list of departments: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve list of departments: ${err.message || 'unknown'}`);
    }
    return [];
  }

  async getDoctors(): Promise<Doctor[]> {
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
    this.rooms = await this.getRooms();
    this.departments = await this.getDepartments();
    this.doctors = await this.getDoctors();
    this.reservation = await this.getReservation();
    this.reservations = await this.getReservations();

    if (this.reservation) {
      this.selectedRoom = this.reservation.room;
      this.selectedDepartment = this.reservation.department;
      this.selectedDoctor = this.reservation.doctor;
    }
  }

  selectRoom(e: Event) {
    this.selectedRoom = (e.target as HTMLSelectElement).value;
  }

  selectDepartment(e: Event) {
    this.selectedDepartment = (e.target as HTMLSelectElement).value;
  }

  selectDoctor(e: Event) {
    this.selectedDoctor = (e.target as HTMLSelectElement).value;
  }

  get filteredRooms(): Room[] {
    return this.rooms.filter(room => !this.reservations.some(reservation => reservation.room === room.id));
  }

  get filteredDoctors(): Doctor[] {
    return this.doctors.filter(doctor => doctor.department === this.selectedDepartment);
  }

  get hasChanged(): boolean {
    return this.selectedRoom !== this.reservation.room || this.selectedDepartment !== this.reservation.department || this.selectedDoctor !== this.reservation.doctor;
  }

  get canSave(): boolean {
    return !!(this.selectedRoom && this.selectedDepartment && this.selectedDoctor) && this.hasChanged;
  }

  async saveReservation() {
    if (!this.canSave) {
      return;
    }
    const reservation: RoomReservation = {
      id: this.reservation.id,
      room: this.selectedRoom,
      department: this.selectedDepartment,
      doctor: this.selectedDoctor,
    };

    if (this.isNew) {
      try {
        const response = await RoomReservationApiFactory(undefined, this.apiBase).createReservation(reservation);
        if (response.status < 299) {
          this.navigate.emit(RouterPage.RESERVATIONS);
        } else {
          this.errorMessages.push(`Cannot create reservation: ${response.statusText}`);
        }
      } catch (err: any) {
        this.errorMessages.push(`Cannot create reservation: ${err.message || 'unknown'}`);
      }
      return;
    }
    try {
      const response = await RoomReservationApiFactory(undefined, this.apiBase).updateReservation(this.entityId, reservation);
      if (response.status < 299) {
        this.navigate.emit(RouterPage.RESERVATIONS);
      } else {
        this.errorMessages.push(`Cannot update reservation: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot update reservation: ${err.message || 'unknown'}`);
    }
  }

  render() {
    return (
      <Host>
        <div part="header">
          <h2>Editor {this.isNew && '(New)'}</h2>
          <button id="navigation-button" onClick={() => this.navigate.emit(RouterPage.RESERVATIONS)}>
            Back to list
          </button>
        </div>
        {this.errorMessages.length > 0 ? (
          this.errorMessages.map(e => <div part="error-message">{e}</div>)
        ) : this.reservation ? (
          <div part="content">
            <label htmlFor="reservation-id">
              Reservation ID:
              <input id="reservation-id" type="text" readonly value={this.reservation.id} />
            </label>
            <label htmlFor="room">
              Room:
              <select id="room" onChange={e => this.selectRoom(e)}>
                <option value="">Select room</option>
                {this.filteredRooms.map(room => (
                  <option selected={this.selectedRoom === room.id} value={room.id}>
                    {room.roomNumber}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="department">
              Department:
              <select id="department" onChange={e => this.selectDepartment(e)}>
                <option value="">Select department</option>
                {this.departments.map(department => (
                  <option selected={this.selectedDepartment === department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="doctor">
              Doctor:
              <select disabled={!this.selectedDepartment} id="doctor" onChange={e => this.selectDoctor(e)}>
                <option value="">Select doctor</option>
                {this.filteredDoctors.map(doctor => (
                  <option selected={this.selectedDoctor === doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </label>
            <button id="save-button" disabled={!this.canSave} onClick={() => this.saveReservation()}>
              Save reservation
            </button>
          </div>
        ) : (
          <div part="loading">Loading...</div>
        )}
      </Host>
    );
  }
}
