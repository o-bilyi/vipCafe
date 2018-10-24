export const baseHandler = (type, data) => {
  return {
    type,
    payload: data,
  };
};
