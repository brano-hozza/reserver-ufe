import { Component, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'reserver-room-list',
  styleUrl: 'reserver-room-list.css',
  shadow: true,
})
export class ReserverRoomList {
  @Event({ eventName: 'edit' }) navigate: EventEmitter<string>;

  render() {
    return (
      <Host>
        Room list
        <button onClick={() => this.navigate.emit('1')}>Edit reservation 1</button>
      </Host>
    );
  }

}
