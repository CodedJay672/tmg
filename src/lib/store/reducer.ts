// reducer for the cart functionality

export const cartReducer = (
  state: TCart[],
  action: { type: string; payload?: TCart }
) => {
  switch (action.type) {
    case "add": {
      if (!action.payload) return state;

      return [...state, { ...action.payload }];
    }
    // case "increase": {
    //   const isAdded = state.find((item) => item.id === action.payload?.id);

    //   if (!isAdded) return state;

    //   return [...state, { ...isAdded, qty: isAdded.qty + 1 }];
    // }
    // case "decrease": {
    //   const isAdded = state.find((item) => item.id === action.payload?.id);

    //   if (!isAdded) return;

    //   if (isAdded.qty === 1) {
    //     const newCart = state.filter((item) => item.id !== isAdded.id);
    //     return [...newCart];
    //   }

    //   return [...state, { ...isAdded, qty: isAdded.qty - 1 }];
    // }
  }

  throw Error("unknown error: " + action.type);
};
