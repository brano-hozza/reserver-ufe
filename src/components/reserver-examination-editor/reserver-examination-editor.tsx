import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { Department, DepartmentsApiFactory, Doctor, Examination, ExaminationReservationApiFactory, Room, RoomReservation, RoomReservationApiFactory } from '../../api/reserver';
import { RouterPage } from '../../types';

@Component({
  tag: 'reserver-examination-editor',
  styleUrl: 'reserver-examination-editor.css',
  shadow: true,
})
export class ReserverExaminationEditor {
  // Events
  @Event() navigate: EventEmitter<string>;

  // Properties
  @Prop() apiBase: string;
  @Prop() entityId: string;

  // State
  @State() errorMessages: string[] = [];
  @State() examinations: Examination[] = [];
  @State() examination: Examination;
  @State() rooms: Room[] = [];
  @State() roomReservations: RoomReservation[] = [];
  @State() departments: Department[] = [];
  @State() doctors: Doctor[] = [];
  @State() patient: string | null = null;
  @State() datetime: string | null = null;
  @State() today: string = new Date().toISOString().split('T')[0];

  @State() selectedRoom: string | null = null;
  @State() selectedDepartment: string | null = null;
  @State() selectedDoctor: string | null = null;
  @State() selectedDate: string | null = null;
  @State() selectedTime: string | null = null;

  get isNew() {
    return this.entityId === '@new';
  }

  async getExamination(): Promise<Examination | null> {
    if (!this.entityId) {
      return null;
    }
    if (this.isNew) {
      return {
        id: '@new',
        patient: '',
        room: '',
        department: '',
        doctor: '',
        datetime: '',
      };
    }
    try {
      const response = await ExaminationReservationApiFactory(undefined, this.apiBase).getExaminationById(this.entityId);
      if (response.status < 299) {
        return response.data;
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve examination: ${err.message || 'unknown'}`);
      console.error(err);
    }
    return null;
  }

  async getRoomReservations(): Promise<RoomReservation[]> {
    try {
      const response = await RoomReservationApiFactory(undefined, this.apiBase).getReservations();
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessages.push(`Cannot retrieve list of room reservations: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve list of room reservations: ${err.message || 'unknown'}`);
    }
    return [];
  }

  async getExaminations(): Promise<Examination[]> {
    try {
      const response = await ExaminationReservationApiFactory(undefined, this.apiBase).getExaminations();
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessages.push(`Cannot retrieve list of examinations: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot retrieve list of examinations: ${err.message || 'unknown'}`);
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
    this.examinations = await this.getExaminations();
    this.examination = await this.getExamination();
    this.patient = this.examination?.patient;
    this.rooms = await this.getRooms();
    this.departments = await this.getDepartments();
    this.doctors = await this.getDoctors();
    this.roomReservations = await this.getRoomReservations();
    if (this.examination && !this.isNew) {
      this.selectedRoom = this.examination.room;
      this.selectedDepartment = this.examination.department;
      this.selectedDoctor = this.examination.doctor;
      this.selectedDate = this.examination.datetime.split('T')[0];
      this.selectedTime = this.examination.datetime.split('T')[1].split(':').slice(0, 2).join(':');
    }
  }

  selectDepartment(e: Event) {
    this.selectedDepartment = (e.target as HTMLSelectElement).value;
    this.selectedDoctor = null;
    this.selectedRoom = null;
    this.selectedDate = null;
    this.selectedTime = null;
  }

  selectDoctor(e: Event) {
    this.selectedDoctor = (e.target as HTMLSelectElement).value;
    this.selectedRoom = null;
    this.selectedDate = null;
    this.selectedTime = null;
  }

  selectRoom(e: Event) {
    this.selectedRoom = (e.target as HTMLSelectElement).value;
    this.selectedDate = null;
    this.selectedTime = null;
  }

  selectDate(e: Event) {
    this.selectedDate = (e.target as HTMLInputElement).value;
    this.selectedTime = null;
  }

  get filteredDoctors(): Doctor[] {
    return this.doctors.filter(doctor => doctor.department === this.selectedDepartment);
  }

  get filteredRooms(): Room[] {
    return this.roomReservations
      .filter(room => room.department === this.selectedDepartment && room.doctor === this.selectedDoctor)
      .map(room => this.rooms.find(r => r.id === room.room));
  }

  get canSave(): boolean {
    return !!(this.patient && this.selectedRoom && this.selectedDepartment && this.selectedDoctor && this.selectedDate && this.selectedTime) && this.hasChanged;
  }

  get occupiedTimes(): string[] {
    return this.examinations
      .filter(e => e.id !== this.examination.id && e.datetime.split('T')[0] === this.selectedDate && e.room === this.selectedRoom)
      .map(examination => examination.datetime.split('T')[1].split(':').slice(0, 2).join(':'));
  }

  get availableTimes(): string[] {
    const times = [];
    for (let i = 8; i < 16; i++) {
      const time = `${i < 10 ? '0' + i : i}:00`;
      if (!this.occupiedTimes.includes(time)) {
        times.push(time);
      }
      const time2 = `${i < 10 ? '0' + i : i}:30`;
      if (!this.occupiedTimes.includes(time2)) {
        times.push(time2);
      }
    }
    return times;
  }

  get hasChanged(): boolean {
    return (
      this.patient !== this.examination.patient ||
      this.selectedRoom !== this.examination.room ||
      this.selectedDepartment !== this.examination.department ||
      this.selectedDoctor !== this.examination.doctor ||
      this.selectedDate !== this.examination.datetime.split('T')[0] ||
      this.selectedTime !== this.examination.datetime.split('T')[1].split(':')[0]
    );
  }

  async saveExamination() {
    if (!this.canSave) {
      return;
    }
    const examination: Examination = {
      id: this.examination.id,
      patient: this.patient,
      room: this.selectedRoom,
      department: this.selectedDepartment,
      doctor: this.selectedDoctor,
      datetime: `${this.selectedDate}T${this.selectedTime}:00`,
    };

    if (this.isNew) {
      try {
        const response = await ExaminationReservationApiFactory(undefined, this.apiBase).createExamination(examination);
        if (response.status < 299) {
          this.navigate.emit(RouterPage.EXAMINATIONS);
        } else {
          this.errorMessages.push(`Cannot create examination: ${response.statusText}`);
        }
      } catch (err: any) {
        this.errorMessages.push(`Cannot create examination: ${err.message || 'unknown'}`);
      }
      return;
    }
    try {
      const response = await ExaminationReservationApiFactory(undefined, this.apiBase).updateExamination(this.entityId, examination);
      if (response.status < 299) {
        this.navigate.emit(RouterPage.EXAMINATIONS);
      } else {
        this.errorMessages.push(`Cannot update examination: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot update examination: ${err.message || 'unknown'}`);
    }
  }

  render() {
    return (
      <Host>
        <div part="header">
          <h2>Editor{this.isNew && ' (New)'}</h2>
          <button id="navigation-button" onClick={() => this.navigate.emit(RouterPage.EXAMINATIONS)}>
            Back to list
          </button>
        </div>
        {this.errorMessages.length > 0 ? (
          this.errorMessages.map(e => (
            <div class="error" part="error-message">
              {e}
            </div>
          ))
        ) : this.examination ? (
          <div part="content">
            <label htmlFor="examination-id">
              Examination ID:
              <input id="examination-id" type="text" readonly value={this.examination.id} />
            </label>
            <label htmlFor="patient">
              Patient:
              <input id="patient" type="text" value={this.patient} onChange={e => (this.patient = (e.target as HTMLInputElement).value)} />
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
            <label htmlFor="room">
              Room:
              <select id="room" disabled={!this.selectedDoctor} onChange={e => this.selectRoom(e)}>
                <option value="">Select room</option>
                {this.filteredRooms.map(room => (
                  <option selected={this.selectedRoom === room.id} value={room.id}>
                    {room.roomNumber}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="datetime">
              Date and time:
              <div id="datetime">
                <input id="date" disabled={!this.selectedRoom} type="date" min={this.today} value={this.selectedDate} onChange={e => this.selectDate(e)} />
                <select id="time" disabled={!this.selectedDate} onChange={e => (this.selectedTime = (e.target as HTMLInputElement).value)}>
                  <option value="">Select time</option>
                  {this.availableTimes.map(time => (
                    <option selected={this.selectedTime === time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <button id="save-button" disabled={!this.canSave} onClick={() => this.saveExamination()}>
              Save examination
            </button>
          </div>
        ) : (
          <div id="loading" part="loading">
            Loading...
          </div>
        )}
      </Host>
    );
  }
}
