import { newE2EPage } from '@stencil/core/testing';

describe('reserver-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-app></reserver-app>');

    const element = await page.find('reserver-app');
    expect(element).toHaveClass('hydrated');
  });
});
