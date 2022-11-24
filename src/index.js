/* eslint-disable import/no-import-module-exports */
import 'core-js/stable';

// CSS
import '@style/index.scss';
import '@js/app';

// Needed for hot reload to work under dev server
if (module.hot) {
  module.hot.accept();
}
