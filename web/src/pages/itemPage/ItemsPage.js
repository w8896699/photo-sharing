import React, { useEffect, useState } from "react";
import ItemList from "../../components/itemComponent/ItemList";
import useHttpClient from "../../shared/utils/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import config from "../../config";

const ItemsPage = () => {
  const [loadedItems, setLoadedItems] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPlaces = async () => {
      console.log("window is", config.API_BASE_URL);
      try {
        const responseData = await sendRequest(
          config.API_BASE_URL + "/api/item"
        );

        setLoadedItems(responseData.items);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  const itemDeletedHandler = (deletedItemId) => {
    setLoadedItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItemId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedItems && (
        <ItemList items={loadedItems} onDeleteItem={itemDeletedHandler} />
      )}
    </>
  );
};

export default ItemsPage;
