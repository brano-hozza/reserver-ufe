import { newE2EPage } from '@stencil/core/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SAMPLE_EXAMINATIONS } from '../../../utils/mocks';

describe('reserver-examination-list', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  beforeEach(() => {
    mock.onGet(/^.*\/examination$/).reply(200, SAMPLE_EXAMINATIONS);
  });
  afterEach(() => {
    mock.reset();
  });
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-examination-list></reserver-examination-list>');

    const element = await page.find('reserver-examination-list');
    expect(element).toHaveClass('hydrated');
  });
});
