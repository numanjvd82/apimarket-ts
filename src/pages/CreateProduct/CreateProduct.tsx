import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import Input from '../../components/Input';
import usePrivateAxios from '../../hooks/privateAxios';

type ValuesProps = {
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
};

const CreateProduct = () => {
  const [values, setValues] = useState<ValuesProps>({
    name: '',
    price: 0,
    description: '',
    category: '',
    quantity: 0,
  });

  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const axios = usePrivateAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const checkInputType = (key: string) => {
    if (key === 'price' || key === 'quantity') {
      return 'number';
    }
    return 'text';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price.toString());
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('quantity', values.quantity.toString());
    formData.append('isFeatured', isFeatured.toString());
    if (image) {
      formData.append('image', image);
    }
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
      // send data to server using the private axios instance with the auth header
      const result = await axios.post('/api/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(result);

      // redirect to the product page
      navigate('/', { state: location.pathname, replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <FormContainer>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {Object.keys(values).map((key) => {
            return (
              <div key={key}>
                <label style={{ textTransform: 'capitalize' }} htmlFor={key}>
                  {key}
                </label>
                <Input
                  id={key}
                  type={checkInputType(key)}
                  name={key}
                  value={values[key as keyof typeof values] as string}
                  onChange={handleChange}
                  required
                />
              </div>
            );
          })}
          <div className="form-group checkbox">
            <label htmlFor="isFeatured">Featured</label>
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          </div>
          <div className="form-group upload-img">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </FormContainer>
    </div>
  );
};

export default CreateProduct;
