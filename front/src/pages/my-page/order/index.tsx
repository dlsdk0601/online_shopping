import Link from "next/link";
import { useRouter } from "next/router";

const OrderPage = () => {
  const router = useRouter();
  return (
    <section className="section" id="products">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <li className="item">{/* item */}</li>
          </div>
          <div className="col-lg-12">
            <div className="pagination">
              <ul>
                <li>
                  {/* 주문 내역 리스트 */}
                  <Link href="/">-</Link>
                </li>
                {/* 페이지 네이션 */}
                {[1, 2, 3, 4].map((page) => {
                  return (
                    <li key={`product-women-list-page-${page}`}>
                      <Link
                        href={{
                          pathname: router.pathname,
                          query: { ...router.query, page },
                        }}
                      >
                        {page}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link href="/">+</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
