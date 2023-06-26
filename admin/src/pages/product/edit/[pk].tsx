import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useQuery } from "react-query";
import { memo, useEffect } from "react";
import { ignorePromise, isNotNil, validatePk } from "../../../ex/utils";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { Urls } from "../../../url/url.g";
import { FileSet, ShowProductRes } from "../../../api/type.g";
import useValueField from "../../../hooks/useValueField";
import { ProductCategory } from "../../../api/enum.g";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { NumberFieldView, TextFieldView } from "../../../components/field/field";

const ProductEditPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <ProductEditView />;
  }

  const { data: product } = useQuery([queryKeys.product, pk], () => api.showProduct({ pk }), {
    enabled: router.isReady && isNotNil(pk),
    onSuccess: (res) => {
      if (isNil(res)) {
        ignorePromise(() => router.replace(Urls.product.index.url()));
      }
    },
  });

  return (
    <div className="w-full px-4">
      <ProductEditPage res={product} />
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
    setSubImages.set(props.res.subImages);
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
    </CardFormView>
  );
});

export default ProductEditPage;
