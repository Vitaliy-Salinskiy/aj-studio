import CredentialsForm from "@/components/shared/CredentialsForm";

const page = () => {
  return (
    <section className="auth-bg w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex min-h-screen justify-center items-center">
          <div className="bg-white w-full sm:w-4/5 lg:w-3/6 p-10 sm:rounded-3xl flex flex-col gap-8">
            <div className="text-center flex flex-col justify-center items-center">
              <h1 className="font-medium text-[40px]">Log in</h1>
              <p className="text-gray-500/60 flex gap-[3px] text-base flex-col sm:flex-row">
                New to Design Space?
                <span className="underline text-own-dark-black cursor-pointer">
                  Sign up for free
                </span>
              </p>
            </div>

            <div>
              <CredentialsForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
