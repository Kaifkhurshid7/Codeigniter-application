export default function InputField({ label, type = 'text', name, value, onChange, placeholder }) {
  return (
    <div className="input-group">
      <span className="input-label">{label}</span>
      <input className="styled-input" type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
