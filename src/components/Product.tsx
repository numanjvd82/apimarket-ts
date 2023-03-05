import { Link } from 'react-router-dom';
import { IProduct } from '../pages/Products/Products';
import './Product.css';

type ProductProps = {
  product: IProduct;
};

const Product: React.FunctionComponent<ProductProps> = ({ product }) => {
  return (
    <div className="card">
      <Link to={`/products/${product._id}`}>
        <img src={product.imgUrl} alt={product.name} className="card-img" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-price">${product.price.toFixed(2)}</p>
        <p className="card-quantity">Quantity: {product.quantity}</p>
        <p className="card-category">Category: {product.category}</p>
        {product.isFeatured && <p className="card-featured">Featured</p>}
      </div>
    </div>
  );
};

export default Product;
