import pattern from "../assets/images/pattern1.png";

export default function Loader() {
  return (
    <main className="loader-page">
      <img
        src={pattern}
        alt="Loading"
        className="loader-page__icon"
      />

      <p className="loader-page__text">
        Loading...
      </p>
    </main>
  );
}