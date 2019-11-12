import { useEffect, useState, useRef } from "react";

export function useNearScreen() {
  //prop useRef nos va a permitir capturar el elemento del DOM
  //como prop se tiene que poner ref obligatorio
  const refElement = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(
    function() {
      import("intersection-observer").then(() => {
        const observer = new window.IntersectionObserver(function(entries) {
          const { isIntersecting } = entries[0];
          if (isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        });
        observer.observe(refElement.current);
      });
    },
    [refElement]
  );

  return [show, refElement];
}
