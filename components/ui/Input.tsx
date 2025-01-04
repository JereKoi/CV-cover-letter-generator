const Input = ({ name, placeholder, type = "text", value, onChange }) => {
    return (
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    );
  };
  
  export default Input;
  