import type { StateCreator } from "zustand";
import type { LfStoreMiddlewares, StoreState } from "~/store/adminStore";
import type { AdminModal, AdminSlice } from "./adminSlice.types";

export const createAdminSlice: StateCreator<
  StoreState,
  [...LfStoreMiddlewares],
  [],
  AdminSlice
> = (set, get) => ({
  activeModal: 0,

  setActiveModal: (newActiveModal: AdminModal) => {
    set({
      activeModal: newActiveModal,
    });
  },
});
