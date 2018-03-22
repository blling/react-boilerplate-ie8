import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import Counter from 'components/Counter';
import { increment, doubleAsync } from './actions';
import reducer from './reducer';
import { makeSelectCount } from './selectors';

export class CounterView extends React.PureComponent {
  render() {
    return <Counter count={this.props.count} doubleAsync={this.props.doubleAsync} increment={this.props.increment} />;
  }
}

CounterView.propTypes = {
  count: PropTypes.number,
  doubleAsync: PropTypes.func,
  increment: PropTypes.func,
};

const mapActionCreators = {
  increment: () => increment(1),
  doubleAsync,
};

const mapStateToProps = createStructuredSelector({
  count: makeSelectCount(),
});

const withConnect = connect(mapStateToProps, mapActionCreators);

const withReducer = injectReducer({ key: 'counter', reducer });

export default compose(withReducer, withConnect)(CounterView);
