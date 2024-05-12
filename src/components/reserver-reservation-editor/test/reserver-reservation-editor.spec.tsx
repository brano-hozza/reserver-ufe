import { newSpecPage } from '@stencil/core/testing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { delay, SAMPLE_DEPARTMENTS, SAMPLE_DOCTORS, SAMPLE_RESERVATIONS, SAMPLE_ROOMS } from '../../../utils/mocks';
import { ReserverReservationEditor } from '../reserver-reservation-editor';

describe('reserver-reservation-editor', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });
  beforeEach(() => {
    mock.onGet(/^.*\/departments$/).reply(200, SAMPLE_DEPARTMENTS);
    mock.onGet(/^.*\/rooms$/).reply(200, SAMPLE_ROOMS);
    mock.onGet(/^.*\/doctors$/).reply(200, SAMPLE_DOCTORS);
    mock.onGet(/^.*\/reservation$/).reply(200, SAMPLE_RESERVATIONS);
    mock.onGet(/^.*\/reservation\/.+/).reply(200, SAMPLE_RESERVATIONS[0]);
  });
  afterEach(() => {
    mock.reset();
  });
  it('displays correct departments', async () => {
    const page = await newSpecPage({
      components: [ReserverReservationEditor],
      html: `<reserver-reservation-editor entity-id="reservation-1"></reserver-reservation-editor>`,
    });

    await delay(300);
    await page.waitForChanges();
    const departmentSelect = page.root.shadowRoot.querySelector('select[id="department"]');
    expect(departmentSelect).not.toBeNull();
    const options = departmentSelect.querySelectorAll('option');
    // There is first option for "Select department"
    expect(options).toHaveLength(SAMPLE_DEPARTMENTS.length + 1);
    for (let i = 0; i < SAMPLE_DEPARTMENTS.length; i++) {
      expect(options[i + 1].attributes.getNamedItem('value').value).toBe(SAMPLE_DEPARTMENTS[i].id);
      expect(options[i + 1].textContent).toBe(SAMPLE_DEPARTMENTS[i].name);
    }
  });
});
