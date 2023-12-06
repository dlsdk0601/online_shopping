import { useRouter } from "next/router";
import { isEmpty, isNil } from "lodash";
import { useMutation, useQuery } from "react-query";
import React, { memo, useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { editAlert, ignorePromise, isNotNil, validatePk } from "../../../ex/utils";
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
import { isGlobalLoading } from "../../../store/loading";

const ProductEditPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);
  const setIsLoading = useSetRecoilState(isGlobalLoading);

  if (!router.isReady) {
    setIsLoading(true);
    return <></>;
  }

  // New
  if (isNil(pk)) {
    setIsLoading(false);
    return <ProductEditView />;
  }

  const { data: product, isLoading } = useQuery(
    [queryKeys.product, pk],
    () => api.showProduct({ pk }),
    {
      enabled: router.isReady && isNotNil(pk),
      onSuccess: (res) => {
        if (isNil(res)) {
          ignorePromise(() => router.replace(Urls.product.index.url()));
        }
      },
    },
  );

  if (isLoading) {
    setIsLoading(true);
    return <></>;
  }

  setIsLoading(false);
  return (
    <div className="w-full px-4">
      <ProductEditView res={product} />
    </div>
  );
};

const ProductEditView = memo((props: { res?: ShowProductRes }) => {
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

      editAlert(isNil(props.res));
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
    if (isNil(props.res)) {
      return;
    }

    setName.set(props.res.name);
    setDescriptionTitle.set(props.res.descriptionTitle);
    setDescription.set(props.res.description);
    setPrice.set(props.res.price);
    setStockCount.set(props.res.stockCount);
    setCategory.set(props.res.category as ProductCategory);
    setMainImage.set(props.res.mainImage);
    setSubImages.set([...props.res.subImages]);
  }, [props.res]);

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
      pk: isNil(props.res) ? null : props.res.pk,
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
    if (isNil(props.res)) {
      return;
    }

    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }

    onDeleteApi({ pk: props.res.pk });
  }, [props.res]);

  return (
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
      <ImageUploadView field={mainImage} onChange={(res) => setMainImage.set({ ...res.fileSet })} />
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
        isNew={isNil(props.res)}
        onClick={() => onEdit()}
        onDelete={() => onDelete()}
      />
    </CardFormView>
  );
});

export default ProductEditPage;
