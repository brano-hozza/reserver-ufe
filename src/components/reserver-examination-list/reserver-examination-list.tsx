import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import type { JSX } from '@stencil/core/internal';
import { Examination, ExaminationReservationApiFactory } from '../../api/reserver';
import { RouterPage } from '../../types';

@Component({
  tag: 'reserver-examination-list',
  styleUrl: 'reserver-examination-list.css',
  shadow: true,
})
export class ReserverExaminationList {
  // Events
  @Event() navigate: EventEmitter<string>;

  // Properties
  @Prop() apiBase: string;

  // State
  @State() errorMessages: string[] = [];

  examinations: Examination[];

  private async getExaminationsAsync() {
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

  async componentWillLoad() {
    this.examinations = await this.getExaminationsAsync();
  }

  private editExamination(id: string) {
    this.navigate.emit(`examination/${id}`);
  }

  private async deleteExamination(id: string) {
    try {
      const response = await ExaminationReservationApiFactory(undefined, this.apiBase).deleteExamination(id);
      if (response.status < 299) {
        this.examinations = this.examinations.filter(e => e.id !== id);
      } else {
        this.errorMessages.push(`Cannot delete examination: ${response.statusText}`);
      }
    } catch (err: any) {
      this.errorMessages.push(`Cannot delete examination: ${err.message || 'unknown'}`);
    }
  }

  private getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  displayExaminations(): JSX.Element[] {
    return this.examinations.map(examination => (
      <md-list-item>
        <md-icon slot="start">home_health</md-icon>
        <div slot="headline">
          Patient: {examination.patient} ({this.getFormattedDate(examination.datetime)})
        </div>
        <md-icon style={{ cursor: 'pointer' }} slot="end" onClick={() => this.editExamination(examination.id)}>
          edit
        </md-icon>
        <md-icon style={{ cursor: 'pointer' }} slot="end" onClick={() => this.deleteExamination(examination.id)}>
          delete
        </md-icon>
      </md-list-item>
    ));
  }

  render() {
    return (
      <Host>
        <div part="header">
          <h2>Examination list</h2>
          <button id="navigation-button" onClick={() => this.navigate.emit(RouterPage.HOME)}>
            Back to home
          </button>
        </div>
        {this.errorMessages.length > 0 ? this.errorMessages.map(e => <div part="error-message">{e}</div>) : <md-list>{this.displayExaminations()}</md-list>}
        <button id="new-examination-button" onClick={() => this.navigate.emit('examination/@new')}>
          New examination
        </button>
      </Host>
    );
  }
}
