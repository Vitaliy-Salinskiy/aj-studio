import OrderItem from "@/components/shared/OrderItem";

const page = async () => {
  const res = await fetch("http://localhost:3000/api/orders/item", {
    cache: "no-cache",
  });

  const ordersItems = await res.json();

  return (
    <div className="flex flex-col gap-5">
      {ordersItems
        ? ordersItems.map((item: any, index: number) => (
            <OrderItem orderItem={item} key={index + item} />
          ))
        : "No items found"}
    </div>
  );
};

export default page;
