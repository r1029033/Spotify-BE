export default function StackedCard({ children, className }) {
  return (
    <div className={`stacked-card ${className || ''}`}>
      <div className="stacked-card__back stacked-card__back--purple"></div>
      <div className="stacked-card__back stacked-card__back--orange"></div>
      
      <div className="stacked-card__front">
        {children}
      </div>
    </div>
  );
}
