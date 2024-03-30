import { newSpecPage } from '@stencil/core/testing';
import { ReserverApp } from '../reserver-app';

describe('reserver-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/reservation/1`,
      components: [ReserverApp],
      html: `<reserver-app base-path="/"></reserver-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("reserver-reservation-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/reserver/`,
      components: [ReserverApp],
      html: `<reserver-app base-path="/reserver"></reserver-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("reserver-room-list");
  });
});
