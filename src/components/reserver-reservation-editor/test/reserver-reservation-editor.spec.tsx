import { newSpecPage } from '@stencil/core/testing';
import { ReserverReservationEditor } from '../reserver-reservation-editor';

describe('reserver-reservation-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverReservationEditor],
      html: `<reserver-reservation-editor></reserver-reservation-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <reserver-reservation-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reserver-reservation-editor>
    `);
  });
});
