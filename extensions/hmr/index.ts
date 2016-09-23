import { Configuration } from 'webpack';
import { ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

export function provide(): Configuration {
  return {
    module:
    {
      loaders: [{
        loaders: ['@angularclass/hmr-loader'],
        test: /\.(js|ts)$/,
      }],
    },
  };
}

export function enable(module: any, appRef: ApplicationRef) {
  module.hmrOnInit = function(store: any) {
    console.log('HMR store: ', store);
  }

  module.hmrOnDestroy = function(store: any) {
    let cmpLocation = appRef.components
      .map((cmp: any) => cmp.location.nativeElement);

    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);

    // remove styles
    removeNgStyles();
  }

  module.hmrAfterDestroy = function(store: any) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
