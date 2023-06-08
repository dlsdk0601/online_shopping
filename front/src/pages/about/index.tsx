import Link from "next/link";
import SubscribeView from "../../view/SubscribeView";

const AboutPage = () => {
  return (
    <>
      <div className="page-heading about-page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>About Our Company</h2>
                <span>Awesome, clean &amp; creative HTML5 Template</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-image">
                <img src="/images/about-left-image.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <h4>About Us &amp; Our Skills</h4>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor
                  incididunt ut labore.
                </span>
                <div className="quote">
                  <i className="fa fa-quote-left" />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuski smod kon
                    tempor incididunt ut labore.
                  </p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor
                  incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip.
                </p>
                <ul>
                  <li>
                    <Link href="#">
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-linkedin" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa fa-behance" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="our-team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Our Amazing Team</h2>
                <span>
                  Details to details is what makes Hexashop different from the other themes.
                </span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-item">
                <div className="thumb">
                  <div className="hover-effect">
                    <div className="inner-content">
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fa fa-facebook" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-linkedin" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-behance" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <img src="/images/team-member-01.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Ragnar Lodbrok</h4>
                  <span>Product Caretaker</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-item">
                <div className="thumb">
                  <div className="hover-effect">
                    <div className="inner-content">
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fa fa-facebook" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-linkedin" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-behance" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <img src="/images/team-member-02.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Ragnar Lodbrok</h4>
                  <span>Product Caretaker</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="team-item">
                <div className="thumb">
                  <div className="hover-effect">
                    <div className="inner-content">
                      <ul>
                        <li>
                          <Link href="#">
                            <i className="fa fa-facebook" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-linkedin" />
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <i className="fa fa-behance" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <img src="/images/team-member-03.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Ragnar Lodbrok</h4>
                  <span>Product Caretaker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="our-services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Our Services</h2>
                <span>
                  Details to details is what makes Hexashop different from the other themes.
                </span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item">
                <h4>Synther Vaporware</h4>
                <p>
                  Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed do eiusmod temp
                  incididunt ut labore, et dolore quis ipsum suspend.
                </p>
                <img src="/images/service-01.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item">
                <h4>Locavore Squidward</h4>
                <p>
                  Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed do eiusmod temp
                  incididunt ut labore, et dolore quis ipsum suspend.
                </p>
                <img src="/images/service-02.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item">
                <h4>Health Gothfam</h4>
                <p>
                  Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed do eiusmod temp
                  incididunt ut labore, et dolore quis ipsum suspend.
                </p>
                <img src="/images/service-03.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SubscribeView />
    </>
  );
};

export default AboutPage;
