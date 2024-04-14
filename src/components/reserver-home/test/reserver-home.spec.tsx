import { newSpecPage } from '@stencil/core/testing';
import { ReserverHome } from '../reserver-home';

describe('reserver-home', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverHome],
      html: `<reserver-home></reserver-home>`,
    });
    expect(page.root).toEqualHtml(`
      <reserver-home>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reserver-home>
    `);
  });
});
