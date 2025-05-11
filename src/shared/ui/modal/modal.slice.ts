import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IModal} from "@shared/ui/modal/modal.type.ts";

const initialState: IModal = {
  open: false,
  view: 'company',
};


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<IModal, 'open'>>) => {
      state.open = true;
      state.view = action.payload.view;
      return state;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { actions, reducer } = modalSlice;

export const {
  openModal, closeModal,
} = actions;
