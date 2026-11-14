import { Link } from "react-router";
import "./Onboarding.css";

function Onboarding() {
  return (
    <main className="onboarding">
      <section className="onboarding__card" aria-labelledby="onboarding-title">
        <div className="onboarding__visual" aria-hidden="true">
          <div className="onboarding__illustration" />
        </div>

        <div className="onboarding__content">
          <p className="onboarding__eyebrow">Onboarding</p>
          <h1 className="onboarding__title" id="onboarding-title">
            Manage What To Do
          </h1>
          <p className="onboarding__description">
            The best way to manage what you have to do, don&apos;t forget your
            plans.
          </p>
          <Link className="onboarding__button" to="/home">
            Get Started
            <span className="onboarding__button-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Onboarding;
