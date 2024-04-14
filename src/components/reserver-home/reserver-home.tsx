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
            <span onClick={() => this.navigate.emit('./list')}>Room reservation</span>
            <span onClick={() => this.navigate.emit('./department')}>Department reservation</span>
          </div>
        </div>
      </Host>
    );
  }

}
