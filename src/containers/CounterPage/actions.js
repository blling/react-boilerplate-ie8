export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';

export function increment(value = 1) {
  return {
    type: COUNTER_INCREMENT,
    payload: value,
  };
}

export const doubleAsync = (count) => (dispatch) =>
  new Promise((resolve) => {
    setTimeout(() => {
      dispatch(increment(count));
      resolve();
    }, 200);
  });
