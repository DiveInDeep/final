import React, { useEffect, useState } from "react";
import AppLayout from "../../components/appLayout/AppLayout";
import styles from "./sell.module.scss";
import { Container } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadImgCard from "../../components/uploadImgCard/UploadImgCard";
import { useDispatch, useSelector } from "react-redux";
import { setLoginOpen } from "../../redux/actions/common";

const Sell = () => {
  const [uploadImg, setUploadImg] = useState(null);
  const [urlImg, setUrlImg] = useState(null);
  const auth = useSelector((state) => state.app.auth);
  const dispatch = useDispatch();

  let buffer = [];

  useEffect(() => {
    if (uploadImg === null) return;
  }, [uploadImg]);

  return (
    <AppLayout noFooter>
      <Container className={styles.container}>
        {/* <UploadImgCard setUploadImg={setUploadImg} uploadImg={uploadImg} buffer={buffer}/> */}
        {urlImg ? (
          <UploadImgCard
            setUploadImg={setUploadImg}
            uploadImg={uploadImg}
            buffer={buffer}
            setUrlImg={setUrlImg}
            urlImg={urlImg}
          />
        ) : (
          <div className={styles.wrapper}>
            {!auth ? (
              <div
                className={styles.uploadContainer}
                onClick={() => dispatch(setLoginOpen(true))}
              >
                <AddPhotoAlternateIcon />
                <div className={styles.btnIcon}>Select Photos</div>
              </div>
            ) : (
              <label htmlFor="file" className={styles.uploadContainer}>
                <input
                  id="file"
                  accept="image/png, image/jpeg"
                  multiple=""
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (!e.target.files[0]) return;
                    let newFile = URL.createObjectURL(e.target.files[0]);
                    console.log("new", e.target.files);
                    buffer.push(newFile);
                    setUrlImg(buffer);
                    setUploadImg(e.target.files[0]);
                  }}
                />
                <AddPhotoAlternateIcon />
                <div className={styles.btnIcon}>Select Photos</div>
              </label>
            )}
          </div>
        )}
      </Container>
    </AppLayout>
  );
};

export default Sell;
