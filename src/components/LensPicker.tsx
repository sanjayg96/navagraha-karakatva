import { DOMAINS } from '../data/domains';
import { navigate } from '../router';

export function LensPicker() {
  return (
    <div className="home">
      <div className="home-hero">
        <span className="eyebrow">Jyotiṣa · kārakatva</span>
        <h1>
          The grahas are not<br />planets. They are <em>principles</em>,<br />and they are everywhere.
        </h1>
        <p className="home-lede">
          Almost everyone meets astrology as a birth chart — a diagram of where some
          planets were when you were born, which is both the shallowest part of the
          system and the easiest to dismiss. The older idea underneath is stranger and
          much more interesting. Each graha is a <strong>kind of force</strong>, and that
          same force is held to recur at every scale of experience: in a part of the body,
          a type of person, a place, a material, a taste, a stretch of time, a way of
          speaking, a way of handling money.
        </p>
        <div className="home-claim">
          Bones. An elderly watchman. A mine. Bitter taste. Pre-dawn. Delay. Iron.
          Patience. — One cluster. Not by superstition: they are all things that
          <em> time has already worked on</em>.
        </div>
        <p className="home-lede">
          So: pick a slice of ordinary life below. Forty-odd apparently unrelated things
          will sort themselves into nine groups in front of you. Then you can open any
          group and read what holds it together — and what, behaviourally, strengthens or
          depletes that force in a life.
        </p>
      </div>

      <div className="lens-head">
        <span className="eyebrow">Choose a lens</span>
        <hr className="rule" />
        <span className="eyebrow">{DOMAINS.length} of 10</span>
      </div>

      <div className="lens-grid">
        {DOMAINS.map((d, i) => (
          <button className="lens-card" key={d.id} onClick={() => navigate({ view: 'lens', domain: d.id })}>
            <span className="lens-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="lens-title">{d.title}</span>
            <span className="lens-sub">{d.subtitle}</span>
          </button>
        ))}
      </div>

      <p className="home-foot">
        Drawn from the classical kārakatva literature — <cite>Bṛhat Parāśara Horā Śāstra</cite>,{' '}
        <cite>Uttara Kālāmṛta</cite>, <cite>Phaladeepikā</cite>, <cite>Prashna Marga</cite>. A few
        entries are reasoned from the principle rather than attested in the texts; those are
        marked <sup className="chip-ext">ext</sup>. This is a map of a symbolic system, offered
        for pattern-recognition and self-reflection. It is not prediction, and it is not
        medical or financial advice. <a href="#/about">More on what this is and isn’t →</a>
      </p>
    </div>
  );
}
