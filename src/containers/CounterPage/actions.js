export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

export function increment(value = 1) {
  return {
    type: COUNTER_INCREMENT,
    payload: value,
  };
}

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter.count));
        resolve();
      }, 200);
    });
  };
};
