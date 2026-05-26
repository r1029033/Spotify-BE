import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

export default function IntroTenseGame() {
  const navigate = useNavigate();
  const [cardIndex, setCardIndex] = useState(0);

  const goToNextCard = (event) => {
    event.stopPropagation();

    if (cardIndex < 2) {
      setCardIndex(cardIndex + 1);
    }
  };

  const goToGame = (event) => {
    event.stopPropagation();
navigate("/tense-explanation");
  };

  return (
    <main className="transition-screen animate-fadeInUp">
      <section className="transition-screen__cards">
        <div className={`grammar-stack grammar-stack--${cardIndex}`}>
          <div className="grammar-card grammar-card--pink">
            <div className="grammar-card__content">
              <p className="grammar-card__text">
                Indicativo presente describes events that happen in the present,
                facts that are always true, general habits, or events of the near
                future.
              </p>

              {cardIndex === 0 && (
                <button className="grammar-card__next" onClick={goToNextCard}>
                  Next ›
                </button>
              )}
            </div>
          </div>

         <div className="grammar-card grammar-card--red">
            <div className="grammar-card__content">
              <p className="grammar-card__text">
                It is formed by separating the infinitive ending are/ere/ire from
                the verb stem and adding:
                {"\n\n"}ARE: o, i, a, iamo, ate, ano
                {"\n"}ERE: o, i, e, iamo, ete, ono
                {"\n"}IRE: o, i, e, iamo, ite, ono
              </p>

              {cardIndex === 1 && (
                <button className="grammar-card__next" onClick={goToNextCard}>
                  Next ›
                </button>
              )}
            </div>
          </div>

          <div className="grammar-card grammar-card--yellow">
            <div className="grammar-card__content">
              <p className="grammar-card__text">
                Example:
                {"\n\n"}I work - io lavoro
              </p>
            </div>
          </div>
        </div>

        <div className="transition-screen__bottom">
          <Button
            text="I got it!"
            variant="primary"
            size="medium"
            onClick={goToGame}
            className="transition-screen__bottom-button"
          />
        </div>
      </section>
    </main>
  );
}