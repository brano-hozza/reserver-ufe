import { newE2EPage } from '@stencil/core/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SAMPLE_DOCTORS, SAMPLE_RESERVATIONS, SAMPLE_ROOMS } from '../../../utils/mocks';

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
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-room-list></reserver-room-list>');

    const element = await page.find('reserver-room-list');
    expect(element).toHaveClass('hydrated');
  });
});
