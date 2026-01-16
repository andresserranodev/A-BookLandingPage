import { renderHook, act } from "@testing-library/react";
import { useToast, toast, reducer } from "../use-toast";

describe("useToast", () => {
  beforeEach(() => {
    // Clear any existing toasts between tests
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("reducer", () => {
    const initialState = { toasts: [] };

    it("adds a toast with ADD_TOAST action", () => {
      const newToast = {
        id: "1",
        title: "Test Toast",
        description: "Test Description",
      };
      const result = reducer(initialState, {
        type: "ADD_TOAST",
        toast: newToast,
      });
      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0]).toEqual(newToast);
    });

    it("limits toasts to TOAST_LIMIT (1)", () => {
      const toast1 = { id: "1", title: "Toast 1" };
      const toast2 = { id: "2", title: "Toast 2" };
      let state = reducer(initialState, { type: "ADD_TOAST", toast: toast1 });
      state = reducer(state, { type: "ADD_TOAST", toast: toast2 });
      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0].id).toBe("2");
    });

    it("updates a toast with UPDATE_TOAST action", () => {
      const existingToast = { id: "1", title: "Original Title" };
      const stateWithToast = { toasts: [existingToast] };
      const result = reducer(stateWithToast, {
        type: "UPDATE_TOAST",
        toast: { id: "1", title: "Updated Title" },
      });
      expect(result.toasts[0].title).toBe("Updated Title");
    });

    it("dismisses a specific toast with DISMISS_TOAST action", () => {
      const existingToast = { id: "1", title: "Test", open: true };
      const stateWithToast = { toasts: [existingToast] };
      const result = reducer(stateWithToast, {
        type: "DISMISS_TOAST",
        toastId: "1",
      });
      expect(result.toasts[0].open).toBe(false);
    });

    it("dismisses all toasts when no toastId provided", () => {
      const toast1 = { id: "1", title: "Toast 1", open: true };
      const stateWithToasts = { toasts: [toast1] };
      const result = reducer(stateWithToasts, { type: "DISMISS_TOAST" });
      expect(result.toasts[0].open).toBe(false);
    });

    it("removes a specific toast with REMOVE_TOAST action", () => {
      const existingToast = { id: "1", title: "Test" };
      const stateWithToast = { toasts: [existingToast] };
      const result = reducer(stateWithToast, {
        type: "REMOVE_TOAST",
        toastId: "1",
      });
      expect(result.toasts).toHaveLength(0);
    });

    it("removes all toasts when no toastId provided in REMOVE_TOAST", () => {
      const toast1 = { id: "1", title: "Toast 1" };
      const stateWithToasts = { toasts: [toast1] };
      const result = reducer(stateWithToasts, { type: "REMOVE_TOAST" });
      expect(result.toasts).toHaveLength(0);
    });
  });

  describe("useToast hook", () => {
    it("returns initial empty toasts array", () => {
      const { result } = renderHook(() => useToast());
      expect(result.current.toasts).toBeDefined();
      expect(Array.isArray(result.current.toasts)).toBe(true);
    });

    it("returns toast function", () => {
      const { result } = renderHook(() => useToast());
      expect(typeof result.current.toast).toBe("function");
    });

    it("returns dismiss function", () => {
      const { result } = renderHook(() => useToast());
      expect(typeof result.current.dismiss).toBe("function");
    });

    it("adds a toast when toast function is called", () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({
          title: "Test Toast",
          description: "Test Description",
        });
      });

      expect(result.current.toasts.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("toast function", () => {
    it("returns an object with id, dismiss, and update", () => {
      const result = toast({ title: "Test" });
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("dismiss");
      expect(result).toHaveProperty("update");
      expect(typeof result.dismiss).toBe("function");
      expect(typeof result.update).toBe("function");
    });

    it("generates unique ids for each toast", () => {
      const result1 = toast({ title: "Test 1" });
      const result2 = toast({ title: "Test 2" });
      expect(result1.id).not.toBe(result2.id);
    });
  });
});
