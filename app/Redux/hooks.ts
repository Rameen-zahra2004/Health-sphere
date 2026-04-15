import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../Redux/store/store";

/**
 * ===============================
 * Typed Dispatch Hook
 * ===============================
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * ===============================
 * Typed Selector Hook
 * ===============================
 */
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;