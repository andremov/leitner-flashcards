import { useAdminStore } from "~/store/adminStore";
import { AdminModal } from "~/store/slices/adminSlice/adminSlice.types";
import { CreateUserModal } from "./create-user";
import { CreateCategoryModal } from "./create-category";

export function AdminModalHandler() {
  const { activeModal } = useAdminStore();

  switch (activeModal) {
    case AdminModal.CREATE_USER:
      return (
        <ModalBackdrop>
          <CreateUserModal />
        </ModalBackdrop>
      );
    case AdminModal.CREATE_CATEGORY:
      return (
        <ModalBackdrop>
          <CreateCategoryModal />
        </ModalBackdrop>
      );
    default:
      return <></>;
  }
}

function ModalBackdrop({ children }: { children: JSX.Element }) {
  return (
    <div className="absolute left-0 top-0 z-[1] h-screen w-screen bg-black/20">
      <div className="absolute flex h-full w-full items-center justify-center p-5 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
