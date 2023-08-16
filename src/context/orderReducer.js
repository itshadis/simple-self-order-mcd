export const initialState = {
  menu: []
}

export const orderReducer = (state, action) => {
  switch(action.type) {
    case "ADD_TO_ORDER":
      if(action.payload === '' || state.menu.includes(action.payload)) {
        return state;
      }
      console.log("ADD_TO_ORDER", action.payload);
      return { menu: [...state.menu, action.payload] }

    case "REMOVE_FROM_ORDER":
      console.log(action.payload.name)
      return { ...state, menu:state.menu.filter(item => item.name!=action.payload.name) }

    default:
      return state
  }
}