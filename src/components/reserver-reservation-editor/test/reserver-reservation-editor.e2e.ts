import { newE2EPage } from '@stencil/core/testing';

describe('reserver-reservation-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-reservation-editor></reserver-reservation-editor>');

    const element = await page.find('reserver-reservation-editor');
    expect(element).toHaveClass('hydrated');
  });
});
