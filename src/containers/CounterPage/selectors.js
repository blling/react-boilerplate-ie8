import { createSelector } from 'reselect';

const selectCounter = (state) => state.counter;

const makeSelectCount = () => createSelector(selectCounter, (counter) => counter.count);

export { selectCounter, makeSelectCount };
