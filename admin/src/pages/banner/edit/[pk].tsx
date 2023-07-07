import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useMutation, useQuery } from "react-query";
import React, { useCallback, useEffect } from "react";
import { editAlert, ignorePromise, isNotNil, validatePk } from "../../../ex/utils";
import { EditBannerReq, FileSet, ShowBannerRes } from "../../../api/type.g";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { Urls } from "../../../url/url.g";
import useValueField from "../../../hooks/useValueField";
import { ProductCategory } from "../../../api/enum.g";
import { TextFieldView } from "../../../components/field/field";
import ProductSelectView from "../../../view/ProductSelectView";
import ImageUploadView from "../../../view/ImageUploadView";
import { EditButtonView } from "../../../components/tailwindEx/EditButtonView";
import CardFormView from "../../../components/tailwindEx/CardFormView";

const BannerEditPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <BannerEditView />;
  }

  const { data: banner } = useQuery([queryKeys.banner, pk], () => api.showBanner({ pk }), {
    enabled: router.isReady && isNotNil(pk),
    onSuccess: (res) => {
      if (isNil(res)) {
        ignorePromise(() => router.replace(Urls.banner.index.url()));
      }
    },
  });

  return (
    <div className="w-full px-4">
      <BannerEditView res={banner} />
    </div>
  );
};

const BannerEditView = (props: { res?: ShowBannerRes }) => {
  const router = useRouter();
  const [title, setTitle] = useValueField("", "배너 이름");
  const [description, setDescription] = useValueField<string>("", "배너 설명");
  const [subTitle, setSubTitle] = useValueField("", "배너 서브 제목");
  const [category, setCategory] = useValueField<ProductCategory | null>(null, "카테고리");
  const [image, setImage] = useValueField<FileSet | null>(null, "배너 이미지");

  const { mutate: onEditApi } = useMutation((req: EditBannerReq) => api.editBanner(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      editAlert(isNil(props.res));
      ignorePromise(() => router.replace(Urls.banner.edit["[pk]"].url({ pk: res.pk })));
    },
  });

  useEffect(() => {
    if (isNil(props.res)) {
      return;
    }

    setTitle.set(props.res.title);
    setSubTitle.set(props.res.subTitle);
    setImage.set(props.res.image);
    setCategory.set(props.res.category as ProductCategory);
    setDescription.set(props.res.description ?? "");
  }, [props.res]);

  const onEdit = useCallback(() => {
    if (
      setTitle.validate() ||
      setSubTitle.validate() ||
      setCategory.validate() ||
      setImage.validate()
    ) {
      return;
    }

    onEditApi({
      pk: isNil(props.res) ? null : props.res.pk,
      title: title.value,
      description: description.value,
      subTitle: subTitle.value,
      category: category.value as ProductCategory,
      image: image.value?.uuid ?? "",
    });
  }, [title, description, subTitle, category, image]);

  return (
    <CardFormView title="배너 정보">
      <TextFieldView value={title} onChange={(value) => setTitle.set(value)} isShowingLabel />
      <TextFieldView
        value={description}
        onChange={(value) => setDescription.set(value)}
        isShowingLabel
      />
      <TextFieldView value={subTitle} onChange={(value) => setSubTitle.set(value)} isShowingLabel />
      <ProductSelectView value={category} onChange={(value) => setCategory.set(value)} />
      <ImageUploadView field={image} onChange={(res) => setImage.set({ ...res.fileSet })} />
      <EditButtonView isNew={isNil(props.res)} onClick={() => onEdit()} onDelete={() => {}} />
    </CardFormView>
  );
};

export default BannerEditPage;
