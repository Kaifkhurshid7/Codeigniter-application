import { useState } from 'react';
import FormCard from '../components/FormCard';
import InputField from '../components/InputField';
import { emptyRegisterForm } from '../services/defaults';

export default function RegisterPage({ onSubmit, loading }) {
  const [form, setForm] = useState(emptyRegisterForm);

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
      setForm(emptyRegisterForm);
    }
  };

  return (
    <FormCard
      title="Register New User"
      description="Create secure application users with hashed passwords before they access the protected dashboard."
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <InputField label="First Name" name="first_name" value={form.first_name} onChange={handleChange} placeholder="Aarav" />
        <InputField label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Sharma" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="aarav@example.com" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" />
        <button type="submit" className="primary-button">{loading ? 'Creating User...' : 'Register User'}</button>
      </form>
    </FormCard>
  );
}
