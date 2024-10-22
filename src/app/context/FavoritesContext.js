import { createContext, useState, useEffect, useContext } from "react";

export const FavoritesContext = createContext();
FavoritesContext.displayName = "MyFavorites";

/* Hook personalizado */
export default function FavoritesProvider({ children }) {
  const [favorite, setFavorite] = useState(() => {

    // Tenta recuperar os favoritos armazenados no localStorage.
    // localStorage é uma API de armazenamento web que permite armazenar dados no navegador
    // do usuário. Os dados persistem mesmo após o fechamento do navegador (fechamento de algumas pags).
    const storedFavorites = localStorage.getItem("favorites");
    // Se houver favoritos armazenados, eles são parseados de volta para um array.
    // Caso contrário, inicializa como um array vazio.
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Usa o hook useEffect para sincronizar o estado dos favoritos com o localStorage.
  // O useEffect é um hook do React que permite executar efeitos colaterais em componentes funcionais.
  // Efeitos colaterais podem ser, por exemplo, operações de rede, manipulação direta do DOM,
  // ou sincronização de dados com armazenamento externo (como localStorage).
  // Este efeito é executado sempre que a lista de favoritos (favorite) é alterada.
  useEffect(() => {
    // Armazena a lista de favoritos atualizada no localStorage.
    localStorage.setItem("favorites", JSON.stringify(favorite));
  }, [favorite]); // O useEffect depende de 'favorite'. Ele executa novamente quando 'favorite' muda.

  const addFavorite = (newFavorite) => {
     // Verifica se o item já está na lista de favoritos.
    const isFavorite = favorite.some(item => item.id === newFavorite.id);
    if (!isFavorite) {
       // Se o item não estiver na lista, adiciona-o.
      setFavorite([...favorite, newFavorite]);
    } else {
       // Se o item já estiver na lista, remove-o.
      setFavorite(favorite.filter(item => item.id !== newFavorite.id));
    }
  };

  return (
    // Provedor do contexto FavoritesContext, fornecendo a lista de favoritos e a função addFavorite.
    <FavoritesContext.Provider value={{ favorite, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personalizado para acessar o contexto dos favoritos.
export function useFavoriteContext() {
  return useContext(FavoritesContext);
}