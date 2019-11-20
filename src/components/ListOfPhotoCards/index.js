import React from "react";
import { PhotoCard } from "../PhotoCard";

//El objeto data viene de las props y photos es el array donde se insertan los resputaldos.
// aqui se hace el desesctructurado de data a fotos, por defacto un array vacio
export const ListOfPhotoCardsComponent = ({ data: { photos = [] } } = {}) => {
  return (
    <div>
      {photos.map(photos => (
        <PhotoCard key={photos.id} {...photos} />
      ))}
    </div>
  );
};
