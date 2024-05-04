import { Component, Host, Prop, State, h } from '@stencil/core';
import { RouterPage } from '../../types';
import { getRoute } from '../../utils/utils';

@Component({
  tag: 'reserver-app',
  styleUrl: 'reserver-app.css',
  shadow: true,
})
export class ReserverApp {
  @State() private page = RouterPage.HOME;
  @State() private params: Record<string, string> = {};

  @Prop() basePath: string = '';
  @Prop() apiBase: string;



  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || '/').pathname;

    const setCurrentPage = (path: string) => {
      if (path.startsWith(baseUri)) {
        const part = path.slice(baseUri.length);
        const [page, params] = getRoute(part);
        this.page = page;
        this.params = params;
      } else {
        this.page = RouterPage.HOME;
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      setCurrentPage(path);
    });

    setCurrentPage(location.pathname);
  }

  render() {
    const navigate = (path: string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute);
    };

    let element: null | Element = null;
    if(this.page === RouterPage.HOME){
      console.log('Home');
      element = (<reserver-home onNavigate={(e) => navigate(e.detail)}></reserver-home>)
    }
    else if( this.page === RouterPage.RESERVATIONS){
      console.log('Reservations');
      element = (<reserver-room-list apiBase={this.apiBase} onNavigate={(e) => navigate(e.detail)}></reserver-room-list>)
    }
    else if(this.page === RouterPage.EDIT_RESERVATION){
      console.log('Edit reservation', this.params['id']);
      element = (<reserver-reservation-editor apiBase={this.apiBase} entityId={this.params['id']} onNavigate={(e) => navigate(e.detail)}></reserver-reservation-editor>)
    } else if (this.page === RouterPage.EXAMINATIONS) {
      console.log('Examinations');
      element = (<reserver-examination-list apiBase={this.apiBase} onNavigate={(e) => navigate(e.detail)}></reserver-examination-list>)
    } else if (this.page === RouterPage.EDIT_EXAMINATION) {
      console.log('Edit examination', this.params['id']);
      element = (<reserver-examination-editor apiBase={this.apiBase} entityId={this.params['id']} onNavigate={(e) => navigate(e.detail)}></reserver-examination-editor>)
    }

    return (
      <Host>
        {element}
      </Host>
    );
  }

}
