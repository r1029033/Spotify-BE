export default function Button({ text, onClick, type = "button", className = "" }) {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

