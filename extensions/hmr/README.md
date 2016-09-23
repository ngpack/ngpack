extends ngpack-based webpack configuration with HMR

## Installation

```
npm i -D @ngpack/hmr
```

## Usage

1. Add `@ngpack/hmr` to your config via [`ngpack#add`](../../#ngpackadd)
2. From your root app module's constructor, require `@ngpack/hmr` and call
`enable`, passing it the instance of the module and the application ref:

    ```ts
    import { NgModule, ApplicationRef } from '@angular/core';

    @NgModule({
      ...
    })
    export class AppModule {
      constructor(appRef: ApplicationRef) {
        require('@ngpack/hmr').enable(this, appRef);
      }
    }
    ```