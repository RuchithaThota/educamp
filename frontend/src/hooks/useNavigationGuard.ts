import { useEffect } from "react";

export const usePreventBackButton = (showModal: () => void) => {
  useEffect(() => {
    const handlePopstate = () => {
      window.history.pushState(null, "", window.location.href);
      showModal();
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [showModal]);
};
