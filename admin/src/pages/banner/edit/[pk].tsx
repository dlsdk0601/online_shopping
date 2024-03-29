import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useMutation } from "react-query";
import React, { useCallback, useEffect } from "react";
import { editAlert, ignorePromise } from "../../../ex/utils";
import { DeleteBannerReq, EditBannerReq, FileSet, ShowBannerRes } from "../../../api/type.g";
import { api } from "../../../api/url.g";
import { Urls } from "../../../url/url.g";
import useValueField from "../../../hooks/useValueField";
import { ProductCategory } from "../../../api/enum.g";
import { TextFieldView } from "../../../components/field/field";
import ProductSelectView from "../../../view/ProductSelectView";
import ImageUploadView from "../../../view/ImageUploadView";
import { EditButtonView } from "../../../components/tailwindEx/EditButtonView";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import ShowContainer from "../../../layout/ShowContainer";
import { queryKeys } from "../../../lib/contants";

const BannerEditPage = () => {
  return (
    <ShowContainer queryKey={queryKeys.banner} api={api.showBanner} Component={BannerEditView} />
  );
};

const BannerEditView = (props: { data?: ShowBannerRes }) => {
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

      editAlert(isNil(props.data));
      ignorePromise(() => router.replace(Urls.banner.edit["[pk]"].url({ pk: res.pk })));
    },
  });

  const { mutate: onDeleteApi } = useMutation((req: DeleteBannerReq) => api.deleteBanner(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      alert("삭제 되었습니다.");
      router.reload();
    },
  });

  useEffect(() => {
    if (isNil(props.data)) {
      return;
    }

    setTitle.set(props.data.title);
    setSubTitle.set(props.data.subTitle);
    setImage.set(props.data.image);
    setCategory.set(props.data.category as ProductCategory);
    setDescription.set(props.data.description ?? "");
  }, [props.data]);

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
      pk: isNil(props.data) ? null : props.data.pk,
      title: title.value,
      description: description.value,
      subTitle: subTitle.value,
      category: category.value as ProductCategory,
      image: image.value?.uuid ?? "",
    });
  }, [title, description, subTitle, category, image]);

  const onDelete = useCallback(() => {
    if (isNil(props.data)) {
      return;
    }

    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }

    onDeleteApi({ pk: props.data.pk });
  }, [props.data]);

  return (
    <div className="w-full px-4">
      <CardFormView title="배너 정보">
        <TextFieldView value={title} onChange={(value) => setTitle.set(value)} isShowingLabel />
        <TextFieldView
          value={description}
          onChange={(value) => setDescription.set(value)}
          isShowingLabel
        />
        <TextFieldView
          value={subTitle}
          onChange={(value) => setSubTitle.set(value)}
          isShowingLabel
        />
        <ProductSelectView value={category} onChange={(value) => setCategory.set(value)} />
        <ImageUploadView field={image} onChange={(res) => setImage.set({ ...res.fileSet })} />
        <EditButtonView
          isNew={isNil(props.data)}
          onClick={() => onEdit()}
          onDelete={() => onDelete()}
        />
      </CardFormView>
    </div>
  );
};

export default BannerEditPage;
