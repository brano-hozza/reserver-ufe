import { newSpecPage } from "@stencil/core/testing";
import { ReserverExaminationList } from "../reserver-examination-list";

describe('reserver-examination-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ReserverExaminationList],
      html: `<reserver-examination-list></reserver-examination-list>`,
    });
    expect(page.root).not.toBeNull();
  });
});
