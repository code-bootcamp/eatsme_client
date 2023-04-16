import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { pathState, slideSettingState } from "../../../commons/stores";
import { useChangeUploadFile } from "../hooks/custom/useChangeUploadFile";
import * as S from "./routeWriteImgStyles";

interface IRouteWriteImgProps {
  idx: number;
}

export default function RouteWriteImg(props: IRouteWriteImgProps): JSX.Element {
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<Record<string, string>>({});
  const { onChangeUploadFile } = useChangeUploadFile();

  const [, setPath] = useRecoilState(pathState);
  const [slideSetting] = useRecoilState(slideSettingState);

  const onClickImg = (event: MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    imgRef.current?.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file === undefined) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (result) => {
      if (typeof result.target?.result === "string") {
        setImage((prev) => ({
          ...prev,
          [slideSetting.nowPage]: result.target?.result,
        }));
        void onChangeUploadFile({
          file,
          setPath,
          nowPage: slideSetting.nowPage - 1,
        });
      }
    };
  };

  return (
    <S.ImgWrap onClick={onClickImg} imgUrl={image[props.idx] ?? ""}>
      {image[props.idx] !== undefined ? (
        <img src={image[props.idx] ?? ""} />
      ) : (
        <></>
      )}
      <input type="file" ref={imgRef} onChange={onChangeFile} />
    </S.ImgWrap>
  );
}
