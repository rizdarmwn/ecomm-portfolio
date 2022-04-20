import type { NextPage } from "next";
import Image from "next/image";
import spacejellyCombo from "../public/images/spacejelly-combo.jpg";
import products from "../products.json";

const Home: NextPage = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Space Jelly Shop</h1>
            <p className="py-6">
              The best spacejelly swag, for the web. Period.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        {products.map((product) => {
          let { id, title, description, image, price } = product;
          return (
            <div key={id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <Image src={image} alt={title} width={400} height={400} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <h2 className="font-bold">${price}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
