import { newE2EPage } from '@stencil/core/testing';

describe('reserver-room-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<reserver-room-list api-base="http://sample.test/api"></reserver-room-list>');

    const element = await page.find('reserver-room-list');
    expect(element).toHaveClass('hydrated');
  });
});
