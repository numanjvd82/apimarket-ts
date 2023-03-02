import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import api from '../../axios';
import Product from '../../components/Product';
import './Products.css';

export type IProduct = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  isFeatured: boolean;
  imgUrl: string;
};

type Error = {
  message: string;
  status: number;
};

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    if (isMounted) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const results = await api.get('/api/products', {
            signal: controller.signal,
          });
          setProducts(results.data.products);
        } catch (error: AxiosError | any) {
          setError(error);
          console.log(error);
        }
        setLoading(false);
      };

      fetchProducts();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="products-container">
        {loading && <p>Loading...</p>}

        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
