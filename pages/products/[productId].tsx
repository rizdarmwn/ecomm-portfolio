import Image from "next/image";

import { useCart } from "../../hooks/useCart";

import products from "../../products.json";

export default function Product({ product }: { product: any }) {
  const { id, title, description, image, price } = product;
  const { addToCart } = useCart();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={image}
          className="max-w-sm rounded-lg shadow-2xl"
          alt={title}
          width={400}
          height={400}
        />
        <div>
          <h1 className="text-5xl font-bold">{title}</h1>
          <h1 className="text-3xl font-bold">${price}</h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary" onClick={() => addToCart({ id })}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const product = products.find(({ id }) => id === params.productId);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const paths = products.map((product) => {
    return {
      params: {
        productId: product.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
