import { Component, Event, EventEmitter, Host, h } from '@stencil/core';

@Component({
  tag: 'reserver-home',
  styleUrl: 'reserver-home.css',
  shadow: true,
})
export class ReserverHome {
  @Event() navigate: EventEmitter<string>;

  render() {
    return (
      <Host>
        <div id="menu">
          <span id="title">Reserver app</span>
          <div id="menu-items">
            <span onClick={() => this.navigate.emit('./reservations')}>Room reservation</span>
            <span onClick={() => this.navigate.emit('./examinations')}>Examination reservation</span>
          </div>
        </div>
      </Host>
    );
  }
}
