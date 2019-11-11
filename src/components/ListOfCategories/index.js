import React, { Fragment, useState, useEffect } from "react";
import { Category } from "../Category";

import { List, Item } from "./styles";
//import { categories as mockCategories } from "../../../api/db.json";

function useCategoriesData() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // si le pasamos el array vacio solo debe ejecutarse cuando se monte el componente
  // cuando le pasas parametros estara escuchando los cambios de las propiedades que se pongan en el array
  useEffect(function() {
    setLoading(true);
    fetch("https://petgram-server-isma-cvauo8kpx.now.sh/categories")
      .then(res => res.json())
      .then(response => {
        setCategories(response);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false);

  useEffect(
    function() {
      const onScroll = e => {
        const newShowFixed = window.scrollY > 200;
        showFixed !== newShowFixed && setShowFixed(newShowFixed);
      };

      document.addEventListener("scroll", onScroll);

      //Limpiar el evento cada que se vuelve a ejecutar o renderizar el componente
      return () => document.removeEventListener("scroll", onScroll);
    },
    [showFixed]
  );

  const renderList = fixed => (
    <List fixed={fixed}>
      {loading ? (
        <Item key="loading">
          <Category />
        </Item>
      ) : (
        categories.map(category => (
          <Item key={category.id}>
            <Category {...category} />
          </Item>
        ))
      )}
    </List>
  );

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  );
};
