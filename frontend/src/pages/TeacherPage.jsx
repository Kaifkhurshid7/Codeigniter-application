import { useState } from 'react';
import FormCard from '../components/FormCard';
import InputField from '../components/InputField';
import { emptyTeacherForm } from '../services/defaults';

export default function TeacherPage({ onSubmit, loading }) {
  const [form, setForm] = useState(emptyTeacherForm);

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
      setForm(emptyTeacherForm);
    }
  };

  return (
    <FormCard
      title="Profile Synchronization"
      description="Create an integrated user and academic profile. This action enforces strict 1:1 relationship constraints."
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <InputField label="First Name" name="first_name" value={form.first_name} onChange={handleChange} placeholder="Nisha" />
        <InputField label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Patel" />
        <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="nisha@example.com" />
        <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Minimum 6 characters" />
        <InputField label="University" name="university_name" value={form.university_name} onChange={handleChange} placeholder="Delhi University" />
        <div className="input-group">
          <span className="input-label">Gender</span>
          <select className="styled-input" name="gender" value={form.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <InputField label="Year Joined" name="year_joined" type="number" value={form.year_joined} onChange={handleChange} placeholder="2024" />
        <button type="submit" className="primary-button">{loading ? 'Creating Profile...' : 'Create Teacher'}</button>
      </form>
    </FormCard>
  );
}
