import React, { Fragment, useEffect, useRef, useState } from "react";
import { ImgWrapper, Img, Button, Article } from "./styles";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const DEFAUL_IMAGE =
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";

export const PhotoCard = ({ id, likes = 0, src = DEFAUL_IMAGE }) => {
  const refElement = useRef(null);
  //prop useRef nos va a permitir capturar el elemento del DOM
  //como prop se tiene que poner ref obligatorio

  const [show, setShow] = useState(false);
  const key = `like-${id}`;
  const [liked, setLiked] = useState(() => {
    try {
      const like = window.localStorage.getItem(key);
      return like;
    } catch (error) {
      return false;
    }
  });

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

  const Icon = liked ? MdFavorite : MdFavoriteBorder;
  const setLocalStorage = value => {
    try {
      window.localStorage.setItem(key, value);
      setLiked(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Article ref={refElement}>
        {show && (
          <Fragment>
            <a href={`/detail/${id}`}>
              <ImgWrapper>
                <Img src={src} />
              </ImgWrapper>
            </a>

            <Button onClick={() => setLocalStorage(!liked)}>
              <Icon size="32px" />
              {likes} likes!
            </Button>
          </Fragment>
        )}
      </Article>
    </div>
  );
};
