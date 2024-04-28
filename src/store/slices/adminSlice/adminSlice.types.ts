export enum AdminModal {
  NONE = 0,
  CREATE_USER = 1,
  CREATE_CATEGORY,
  CREATE_CONCEPT,
}

export type AdminStoreState = {
  activeModal: AdminModal;
};

export type AdminSlice = AdminStoreState & {
  setActiveModal: (newActiveModal: AdminModal) => void;
};
