import { newE2EPage } from '@stencil/core/testing';

describe('reserver-examination-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-examination-list></reserver-examination-list>');

    const element = await page.find('reserver-examination-list');
    expect(element).toHaveClass('hydrated');
  });
});
