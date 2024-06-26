import { Metadata } from "next";

import CredentialsForm from "@/components/shared/CredentialsForm";

export const metadata: Metadata = {
  title: "Studio Log in Page",
};

const page = () => {
  return (
    <section className="auth-bg w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex min-h-screen justify-center items-center">
          <CredentialsForm isExtended={false} />
        </div>
      </div>
    </section>
  );
};

export default page;
