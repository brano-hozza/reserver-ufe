import { newE2EPage } from '@stencil/core/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SAMPLE_DEPARTMENTS, SAMPLE_DOCTORS, SAMPLE_EXAMINATIONS, SAMPLE_RESERVATIONS, SAMPLE_ROOMS } from '../../../utils/mocks';

describe('reserver-examination-editor', () => {
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
  });
  afterEach(() => {
    mock.reset();
  });
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-examination-editor></reserver-examination-editor>');

    const element = await page.find('reserver-examination-editor');
    expect(element).toHaveClass('hydrated');
  });
});
