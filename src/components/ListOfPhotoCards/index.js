import React from "react";
import { PhotoCard } from "../PhotoCard";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

const withPhothos = graphql(gql`
  query getPhothos {
    photos {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`);

const ListOfPhotoCardsComponent = ({ data: { photos = [] } } = {}) => {
  return (
    <div>
      {photos.map(photos => (
        <PhotoCard key={photos.id} {...photos} />
      ))}
    </div>
  );
};

export const ListOfPhotoCards = withPhothos(ListOfPhotoCardsComponent);
