import Skeleton from "react-loading-skeleton";

const OrderShowSkeleton = () => {
  return (
    <section className="section" id="product">
      <div className="container">
        <div className="w-50 mx-auto">
          <ul className="d-flex justify-content-between align-items-center flex-wrap">
            <li className="w-50 px-3 mb-2">주문 번호:</li>
            <li className="skeleton text-right px-3 mb-2">
              <Skeleton width="100%" height="100%" />
            </li>
            <li className="w-50 px-3 mb-2">주문 명:</li>
            <li className="skeleton text-right px-3 mb-2">
              <Skeleton width="100%" height="100%" />
            </li>
            <li className="w-50 px-3 mb-2">결제 가격:</li>
            <li className="skeleton text-right px-3 mb-2">
              <Skeleton width="100%" height="100%" />
            </li>
          </ul>
        </div>
        <ul className="w-75 mx-auto mt-3">
          <li className="d-flex justify-content-between align-items-center mb-2">
            <p style={{ width: "20%" }} className="text-center">
              제품
            </p>
            <p style={{ width: "20%" }} className="text-center">
              제품명
            </p>
            <p style={{ width: "20%" }} className="text-center">
              수량
            </p>
            <p style={{ width: "20%" }} className="text-center">
              가격
            </p>
            <p style={{ width: "20%" }} className="text-center">
              상태
            </p>
          </li>
          {[1, 2, 3].map((item) => (
            <li className="d-flex justify-content-between align-items-center mb-2">
              <figure className="text-center skeleton">
                <Skeleton width="100%" height="100%" />
              </figure>
              <p className="text-center skeleton">
                <Skeleton width="100%" height="100%" />
              </p>
              <p className="text-center skeleton">
                <Skeleton width="100%" height="100%" />
              </p>
              <p className="text-center skeleton">
                <Skeleton width="100%" height="100%" />
              </p>
              <p className="text-center skeleton">
                <Skeleton width="100%" height="100%" />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OrderShowSkeleton;
