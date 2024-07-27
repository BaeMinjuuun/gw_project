export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

const initialState = {
  modal: {
    showModal: false,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: {
          showModal: !state.modal.showModal,
        },
      };

    case "OPEN_MODAL":
      return {
        ...state,
        modal: {
          showModal: true,
        },
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        modal: {
          showModal: false,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
