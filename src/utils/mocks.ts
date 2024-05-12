import { Department, Doctor, Examination, Room, RoomReservation } from '../api/reserver';

export const SAMPLE_DEPARTMENTS: Department[] = [
  {
    id: 'department-1',
    name: 'Department 1',
  },
  {
    id: 'department-2',
    name: 'Department 2',
    description: 'Second department',
  },
];

export const SAMPLE_ROOMS: Room[] = [
  {
    id: 'room-1',
    roomNumber: '1',
  },
  {
    id: 'room-2',
    roomNumber: '2',
  },
];

export const SAMPLE_DOCTORS: Doctor[] = [
  {
    id: 'doctor-1',
    name: 'Doctor 1',
    department: SAMPLE_DEPARTMENTS[0].id,
  },
  {
    id: 'doctor-2',
    name: 'Doctor 2',
    department: SAMPLE_DEPARTMENTS[1].id,
  },
];

export const SAMPLE_EXAMINATIONS: Examination[] = [
  {
    id: 'examination-1',
    doctor: SAMPLE_DOCTORS[0].id,
    department: SAMPLE_DEPARTMENTS[0].id,
    patient: 'Patient 1',
    room: SAMPLE_ROOMS[0].id,
    datetime: '2022-01-01T12:00:00Z',
  },
];

export const SAMPLE_RESERVATIONS: RoomReservation[] = [
  {
    id: 'reservation-1',
    department: SAMPLE_DEPARTMENTS[0].id,
    doctor: SAMPLE_DOCTORS[0].id,
    room: SAMPLE_ROOMS[0].id,
  },
];

export const delay = async (milliseconds: number) =>
  await new Promise<void>(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
