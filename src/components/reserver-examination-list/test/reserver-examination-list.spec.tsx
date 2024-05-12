import { newSpecPage } from '@stencil/core/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SAMPLE_EXAMINATIONS } from '../../../utils/mocks';
import { ReserverExaminationList } from '../reserver-examination-list';

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
    const page = await newSpecPage({
      components: [ReserverExaminationList],
      html: `<reserver-examination-list></reserver-examination-list>`,
    });
    expect(page.root).not.toBeNull();
  });
});
