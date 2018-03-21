import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () =>
    new Promise((resolve) => {
      require.ensure([], (require) => {
        resolve(require('./index').default);
      });
    }),
  loading: () => <div>Loading...</div>,
});
