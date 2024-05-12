import { newSpecPage } from '@stencil/core/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { delay, SAMPLE_DOCTORS, SAMPLE_RESERVATIONS, SAMPLE_ROOMS } from '../../../utils/mocks';
import { ReserverRoomList } from '../reserver-room-list';

describe('reserver-room-list', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  beforeEach(() => {
    mock.onGet(/^.*\/rooms$/).reply(200, SAMPLE_ROOMS);
    mock.onGet(/^.*\/doctors$/).reply(200, SAMPLE_DOCTORS);
    mock.onGet(/^.*\/reservation$/).reply(200, SAMPLE_RESERVATIONS);
  });
  afterEach(() => {
    mock.reset();
  });
  it('renders samples', async () => {
    const page = await newSpecPage({
      components: [ReserverRoomList],
      html: `<reserver-room-list></reserver-room-list>`,
    });
    delay(500);
    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(items.length).toEqual(SAMPLE_RESERVATIONS.length);
  });
});
