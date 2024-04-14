import { newE2EPage } from '@stencil/core/testing';

describe('reserver-home', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-home></reserver-home>');

    const element = await page.find('reserver-home');
    expect(element).toHaveClass('hydrated');
  });
});
