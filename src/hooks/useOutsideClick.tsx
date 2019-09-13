import { useEffect, MouseEvent } from "react";

const useOutsideClick = (
  node: HTMLElement,
  onOutsideClick: () => void,
  exceptionClass?: string
) => {
  useEffect(() => {
    const onClick = (e: MouseEvent<HTMLDocument>) => {
      const isOutside = node && !node.contains(e.target as HTMLElement);
      const isException = (e.target as HTMLElement).classList.contains(
        exceptionClass
      );

      if (isOutside && !isException) onOutsideClick();
    };

    document.addEventListener("click", (onClick as unknown) as EventListener);

    return () =>
      document.removeEventListener(
        "click",
        (onClick as unknown) as EventListener
      );
  }, [node, onOutsideClick, exceptionClass]);
};

export default useOutsideClick;
