import {useAppSelector} from "@shared/hooks/useAppDispatch.ts";

export const useModal = () => {
  const modal = useAppSelector(state => state.modal);
  return {modal};
}