import { Component, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'reserver-reservation-editor',
  styleUrl: 'reserver-reservation-editor.css',
  shadow: true,
})
export class ReserverReservationEditor {
  @Event({ eventName: 'back' }) navigate: EventEmitter<string>;

  render() {
    return (
      <Host>
        Editor
        <button onClick={() => this.navigate.emit()}>Back to list</button>
      </Host>
    );
  }

}
