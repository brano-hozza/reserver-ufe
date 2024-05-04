import { newSpecPage } from "@stencil/core/testing";
import { ReserverExaminationEditor } from "../reserver-examination-editor";

describe('reserver-examination-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverExaminationEditor],
      html: `<reserver-examination-editor></reserver-examination-editor>`,
    });
    expect(page.root).not.toBeNull();
  });
});
