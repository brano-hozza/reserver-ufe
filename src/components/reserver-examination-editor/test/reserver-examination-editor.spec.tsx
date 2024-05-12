import { newSpecPage } from '@stencil/core/testing';
import { ReserverExaminationEditor } from '../reserver-examination-editor';

import globalAxios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { delay, SAMPLE_DEPARTMENTS, SAMPLE_DOCTORS, SAMPLE_EXAMINATIONS, SAMPLE_RESERVATIONS, SAMPLE_ROOMS } from '../../../utils/mocks';

describe('reserver-examination-editor', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(globalAxios);
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
    const page = await newSpecPage({
      components: [ReserverExaminationEditor],
      html: `<reserver-examination-editor entity-id="examination-1"></reserver-examination-editor>`,
    });
    await delay(300);
    await page.waitForChanges();
    expect(page.root).not.toBeNull();
  });

  it('displays correct departments', async () => {
    const page = await newSpecPage({
      components: [ReserverExaminationEditor],
      html: `<reserver-examination-editor entity-id="examination-1"></reserver-examination-editor>`,
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
