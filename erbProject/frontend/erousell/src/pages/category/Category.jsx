import React, { useEffect, useState } from "react";
import AppLayout from "../../components/appLayout";
import { Container } from "@mui/material";
import styles from "./category.module.scss";
import { useLocation } from "react-router-dom";
import * as service from "../../core/Service";
import _, { filter } from "lodash";
import ItemCards from "../../components/itemCards";
import { tagObj } from "../../helpers/enumConfig";

const Category = () => {
  let location = useLocation();
  let type = location.search.split("?")[1];
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchResult();
  }, [location]);

  async function fetchResult() {
    try {
      let resp = await service.call("post", "/items/search", {
        tags: tagObj[type],
      });
      if (!resp) {
        return;
      }
      const filteredResult = resp.items.filter(item => (item.status !== "HIDDEN" && item.status !== "CLOSED" ))
      setResult(filteredResult);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AppLayout>
      <div className={styles.header}>
        <Container>
          <h3 className={styles.sellTitle}>{tagObj[type]}</h3>
        </Container>
      </div>
      <Container className={styles.container}>
        <div
          style={{
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {!_.isEmpty(result) ? (
            _.map(result, (item, index) => {
              return (
                <div
                  style={{ width: "25%" }}
                  key={`item_card_container_${index}`}
                >
                  <ItemCards
                    id={item._id}
                    item={item}
                  />
                </div>
              );
            })
          ) : (
            <div className={styles.noRecordContainer}>
              <img
                alt="item_no_record"
                className={styles.noRecordImg}
                src="https://mweb-cdn.karousell.com/build/no-coin-transaction-2QTRqJClkE.svg"
              />
              <p>There is no item yet</p>
            </div>
          )}
        </div>
      </Container>
    </AppLayout>
  );
};

export default Category;
