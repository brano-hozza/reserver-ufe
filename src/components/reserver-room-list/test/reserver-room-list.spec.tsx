import { newSpecPage } from '@stencil/core/testing';
import { ReserverRoomList } from '../reserver-room-list';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RoomReservation } from '../../../api/reserver';

describe('reserver-room-list', () => {
  const sampleEntries: RoomReservation[] = [
    {
      id: 'entry-1',
      room: '1',
      department: '1',
      doctor: '1',
    },
    {
      id: 'entry-2',
      room: '2',
      department: '2',
      doctor: '2',
    },
  ];
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  afterEach(() => {
    mock.reset();
  });

  it('renders samples', async () => {
    mock.onGet().reply(200, sampleEntries);

    const page = await newSpecPage({
      components: [ReserverRoomList],
      html: `<reserver-room-list api-base="http://test/api"></reserver-room-list>`,
    });

    const wlList = page.rootInstance as ReserverRoomList;
    const expectedRooms = wlList?.reservations?.length;

    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(expectedRooms).toEqual(sampleEntries.length);
    expect(items.length).toEqual(expectedRooms);
  })
});
