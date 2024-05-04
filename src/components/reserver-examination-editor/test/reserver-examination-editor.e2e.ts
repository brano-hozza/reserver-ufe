import { newE2EPage } from '@stencil/core/testing';

describe('reserver-examination-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-examination-editor></reserver-examination-editor>');

    const element = await page.find('reserver-examination-editor');
    expect(element).toHaveClass('hydrated');
  });
});
