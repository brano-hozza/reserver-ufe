import { newSpecPage } from '@stencil/core/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SAMPLE_DEPARTMENTS, SAMPLE_DOCTORS, SAMPLE_EXAMINATIONS, SAMPLE_RESERVATIONS, SAMPLE_ROOMS } from '../../../utils/mocks';
import { ReserverApp } from '../reserver-app';

describe('reserver-app', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  beforeEach(() => {
    mock.onGet(/^.*\/departments$/).reply(200, SAMPLE_DEPARTMENTS);
    mock.onGet(/^.*\/rooms$/).reply(200, SAMPLE_ROOMS);
    mock.onGet(/^.*\/doctors$/).reply(200, SAMPLE_DOCTORS);
    mock.onGet(/^.*\/examination$/).reply(200, SAMPLE_EXAMINATIONS);
    mock.onGet(/^.*\/reservation$/).reply(200, SAMPLE_RESERVATIONS);
    mock.onGet(/^.*\/examination\/.+/).reply(200, SAMPLE_EXAMINATIONS[0]);
    mock.onGet(/^.*\/reservation\/.+/).reply(200, SAMPLE_RESERVATIONS[0]);
  });
  afterEach(() => {
    mock.reset();
  });
  it('renders home', async () => {
    const page = await newSpecPage({
      url: `http://localhost`,
      components: [ReserverApp],
      html: `<reserver-app base-path="/"></reserver-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual('reserver-home');
  });

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/reservation/1`,
      components: [ReserverApp],
      html: `<reserver-app base-path="/"></reserver-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual('reserver-reservation-editor');
  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/reservations`,
      components: [ReserverApp],
      html: `<reserver-app  base-path="/"></reserver-app>`,
    });
    page.win.navigation = new EventTarget();
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual('reserver-room-list');
  });
});
