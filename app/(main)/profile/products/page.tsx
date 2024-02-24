import { getServerSession } from "next-auth";
import { Product as IProduct } from "@prisma/client";

import { options } from "@/app/api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);

  const data = await fetch(
    `http://localhost:3000/api/users/${session?.user.id}/products`
  );

  const products: IProduct[] = await data.json();

  return (
    <section>
      <div className="flex">
        {products.map((product: IProduct) => (
          <div key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
