import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSystem } from "../features/theme/themeSlice";

export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    // initial apply
    dispatch(setSystem(mql.matches ? "dark" : "light"));

    // listen OS theme changes
    const onChange = (e) => dispatch(setSystem(e.matches ? "dark" : "light"));
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [dispatch]);

  return children;
}
