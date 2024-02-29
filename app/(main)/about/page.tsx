import Timeline from "@/components/shared/Timeline";

const page = () => {
  return (
    <section className="flex flex-col appContainer py-10">
      <div className="flex xl:justify-center items-center">
        <h1 className="text-5xl">About us</h1>
      </div>
      <div>
        <Timeline />
      </div>
    </section>
  );
};

export default page;
