import { newSpecPage } from '@stencil/core/testing';
import { ReserverApp } from '../reserver-app';

describe('reserver-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverApp],
      html: `<reserver-app></reserver-app>`,
    });
    expect(page.root).toEqualHtml(`
      <reserver-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reserver-app>
    `);
  });
});
