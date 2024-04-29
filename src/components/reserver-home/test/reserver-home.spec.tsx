import { newSpecPage } from '@stencil/core/testing';
import { ReserverHome } from '../reserver-home';

describe('reserver-home', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverHome],
      html: `<reserver-home></reserver-home>`,
    });
    expect(page.root).not.toBeNull();
  });
});
