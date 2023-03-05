import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../axios';
import { IProduct } from '../Products/Products';
import './SingleProduct.css';

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let controller = new AbortController();
    if (isMounted) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const results = await api.get(`/api/products/${id}`, {
            signal: controller.signal,
          });
          setProduct(results.data.product);
        } catch (error: AxiosError | any) {
          console.log(error);
        }
        setLoading(false);
      };

      fetchProduct();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="product-page">
      <h1>{product?.name}</h1>
      <div className="product-info">
        <div className="product-image">
          <img src={product?.imgUrl} alt={product?.name} />
        </div>
        <div className="product-details">
          <p className="product-desc">{product?.description}</p>
          <p className="product-price">Price: ${product?.price}</p>
          <p className="product-category">Category: {product?.category}</p>
          <p className="product-quantity">Quantity: {product?.quantity}</p>
          <p className="featured-text">
            Featured: {product?.isFeatured ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
