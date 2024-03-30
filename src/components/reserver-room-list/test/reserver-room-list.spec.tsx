import { newSpecPage } from '@stencil/core/testing';
import { ReserverRoomList } from '../reserver-room-list';

describe('reserver-room-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverRoomList],
      html: `<reserver-room-list></reserver-room-list>`,
    });
    expect(page.root).toEqualHtml(`
      <reserver-room-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reserver-room-list>
    `);
  });
});
