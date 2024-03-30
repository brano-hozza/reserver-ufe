import { Component, Host, Prop, State, h } from '@stencil/core';

type CurrentPage = 'list' |'reservation-editor' //TODO: Add more pages

@Component({
  tag: 'reserver-app',
  styleUrl: 'reserver-app.css',
  shadow: true,
})
export class ReserverApp {
  @State() private relativePath = '';

  @Prop() basePath: string = '';
  @Prop() apiBase: string;



  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = '';
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }


  render() {
    const navigate = (path: string) => {

      console.log('Base path:',this.basePath)
      console.log(new URL(path, new URL(this.basePath, document.baseURI)))
      console.log(new URL(this.basePath, document.baseURI))
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      console.log('Absolute:', absolute)
      window.navigation.navigate(absolute);
    };

    let pageType: CurrentPage = 'list';
    let entityId = '@new'
    console.log('Relative path:', this.relativePath)
    if (this.relativePath.startsWith('reservation/')) {
      pageType = 'reservation-editor';
      entityId = this.relativePath.split('/')[1];
    }

    let element: null | Element = null;
    if( pageType === 'list'){
      element = (<reserver-room-list onEdit={(e: CustomEvent<string>) =>navigate('./reservation/'+e.detail)}></reserver-room-list>)
    }
    else if(pageType === 'reservation-editor'){
      element = (<reserver-reservation-editor id={entityId} onBack={() => navigate('/')}></reserver-reservation-editor>)
    }

    return (
      <Host>
        {element}
      </Host>
    );
  }

}
