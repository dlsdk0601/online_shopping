import React from "react";
import SignFooterView from "../../components/layoutView/SignFooterView";
import SignInView from "../../view/SignInView";

const SignInPage = () => {
  return (
    <main>
      <section className="relative h-full min-h-screen w-full py-40">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full content-center items-center justify-center">
            <div className="w-full px-4 lg:w-4/12">
              <div className="mb-6 flex w-full flex-col break-words rounded-lg border bg-blueGray-200 shadow-lg">
                <div className="mb-0 rounded-t px-6 py-6">
                  <div className="mb-3 text-center">
                    <h6 className="text-sm font-bold text-blueGray-500">Sign in with</h6>
                  </div>
                  <hr className="border-b-1 mt-6 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <SignInView />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SignFooterView absolute />
      </section>
    </main>
  );
};

export default SignInPage;
