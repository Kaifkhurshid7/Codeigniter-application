import { useState } from 'react';
import FormCard from '../components/FormCard';
import InputField from '../components/InputField';

const initialState = {
  email: '',
  password: '',
};

export default function LoginPage({ onSubmit, loading }) {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const didSucceed = await onSubmit(form);

    if (didSucceed) {
      setForm(initialState);
    }
  };

  return (
    <FormCard
      title="Login"
      description="Authenticate with email and password to receive a JWT token for protected API requests."
    >
      <form className="form-grid compact" onSubmit={handleSubmit}>
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="admin@example.com" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" />
        <button type="submit" className="primary-button">{loading ? 'Signing In...' : 'Login & Store Token'}</button>
      </form>
    </FormCard>
  );
}
