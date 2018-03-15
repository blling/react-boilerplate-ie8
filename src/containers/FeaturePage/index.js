/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';

export default class FeaturePage extends React.Component {
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div>Feature Page</div>;
  }
}
