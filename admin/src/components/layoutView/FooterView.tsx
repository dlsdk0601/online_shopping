import Link from "next/link";

export default function FooterView() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="border-b-1 mb-4 border-blueGray-200" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-4 md:w-4/12">
              <div className="py-1 text-center text-sm font-semibold text-blueGray-500 md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
              </div>
            </div>
            <div className="w-full px-4 md:w-8/12">
              <ul className="flex list-none flex-wrap justify-center  md:justify-end">
                <li>
                  <Link
                    href="https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer-admin"
                    className="block py-1 px-3 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                  >
                    MIT License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
