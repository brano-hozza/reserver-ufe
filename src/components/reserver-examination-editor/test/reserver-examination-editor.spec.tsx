import { newSpecPage } from '@stencil/core/testing';
import { ReserverExaminationEditor } from '../reserver-examination-editor';

describe('reserver-examination-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverExaminationEditor],
      html: `<reserver-examination-editor></reserver-examination-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <reserver-examination-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reserver-examination-editor>
    `);
  });
});
