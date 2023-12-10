import { useRouter } from "next/router";
import { isEmpty, isNil } from "lodash";
import { useMutation } from "react-query";
import React, { memo, useCallback, useEffect } from "react";
import { editAlert, ignorePromise } from "../../../ex/utils";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { Urls } from "../../../url/url.g";
import { DeleteProductReq, EditProductReq, FileSet, ShowProductRes } from "../../../api/type.g";
import useValueField from "../../../hooks/useValueField";
import { ProductCategory } from "../../../api/enum.g";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { NumberFieldView, TextFieldView } from "../../../components/field/field";
import ProductSelectView from "../../../view/ProductSelectView";
import { EditButtonView } from "../../../components/tailwindEx/EditButtonView";
import ImageUploadView from "../../../view/ImageUploadView";
import ImageMultipleUploadView from "../../../view/ImageMultipleUploadView";
import ShowContainer from "../../../layout/ShowContainer";

const ProductEditPage = () => {
  return (
    <ShowContainer queryKey={queryKeys.product} api={api.showProduct} Component={ProductEditView} />
  );
};

const ProductEditView = memo((props: { data?: ShowProductRes }) => {
  const router = useRouter();
  const [name, setName] = useValueField("", "상품명");
  const [descriptionTitle, setDescriptionTitle] = useValueField("", "상품 설명 타이틀");
  const [description, setDescription] = useValueField("", "상품 설명");
  const [price, setPrice] = useValueField(0, "가격");
  const [mainImage, setMainImage] = useValueField<FileSet | null>(null, "메인 이미지");
  const [subImages, setSubImages] = useValueField<FileSet[]>([], "서브 이미지");
  const [stockCount, setStockCount] = useValueField(0, "재고");
  const [category, setCategory] = useValueField<ProductCategory | null>(null, "카테고리");

  const { mutate: onEditApi } = useMutation((req: EditProductReq) => api.editProduct(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      editAlert(isNil(props.data));
      ignorePromise(() => router.replace(Urls.product.edit["[pk]"].url({ pk: res.pk })));
    },
  });

  const { mutate: onDeleteApi } = useMutation((req: DeleteProductReq) => api.deleteProduct(req), {
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

    setName.set(props.data.name);
    setDescriptionTitle.set(props.data.descriptionTitle);
    setDescription.set(props.data.description);
    setPrice.set(props.data.price);
    setStockCount.set(props.data.stockCount);
    setCategory.set(props.data.category as ProductCategory);
    setMainImage.set(props.data.mainImage);
    setSubImages.set([...props.data.subImages]);
  }, [props.data]);

  const onEdit = useCallback(() => {
    if (
      setName.validate() ||
      setDescriptionTitle.validate() ||
      setDescription.validate() ||
      setPrice.validate() ||
      setStockCount.validate() ||
      setCategory.validate() ||
      setMainImage.validate()
    ) {
      return;
    }

    if (isEmpty(subImages.value)) {
      setSubImages.err("서브 이미지들은 필수입니다.");
      return;
    }

    onEditApi({
      pk: isNil(props.data) ? null : props.data.pk,
      name: name.value,
      descriptionTitle: descriptionTitle.value,
      description: description.value,
      price: price.value,
      mainImage: mainImage.value?.uuid ?? "",
      subImages: subImages.value.map((img) => img.uuid),
      stockCount: stockCount.value,
      category: category.value as ProductCategory,
    });
  }, [name, descriptionTitle, description, price, mainImage, subImages, stockCount, category]);

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
      <CardFormView title="상품 정보">
        <TextFieldView value={name} onChange={(value) => setName.set(value)} isShowingLabel />
        <TextFieldView
          value={descriptionTitle}
          onChange={(value) => setDescriptionTitle.set(value)}
          isShowingLabel
        />
        <TextFieldView
          value={description}
          onChange={(value) => setDescription.set(value)}
          isShowingLabel
        />
        <NumberFieldView value={price} onChange={(value) => setPrice.set(value)} isShowingLabel />
        <NumberFieldView
          value={stockCount}
          onChange={(value) => setStockCount.set(value)}
          isShowingLabel
        />
        <ProductSelectView value={category} onChange={(value) => setCategory.set(value)} />
        <ImageUploadView
          field={mainImage}
          onChange={(res) => setMainImage.set({ ...res.fileSet })}
        />
        <ImageMultipleUploadView
          field={subImages}
          onChange={(res) => {
            setSubImages.set(res);
          }}
          onDelete={(res) => {
            setSubImages.set(res);
          }}
        />
        <EditButtonView
          isNew={isNil(props.data)}
          onClick={() => onEdit()}
          onDelete={() => onDelete()}
        />
      </CardFormView>
    </div>
  );
});

export default ProductEditPage;
