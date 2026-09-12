export function About() {
  return (
    <div className="doc">
      <span className="eyebrow">what this is</span>
      <h1>On reading the world this way</h1>

      <p>
        This is a map of <strong>kārakatva</strong> — the doctrine of significations. In
        classical jyotiṣa each graha is not primarily a planet but a <em>principle</em>, and
        the same principle is held to recur at every scale of experience. Śani is not
        “Saturn, which makes bad things happen”. Śani is contraction, time, friction and
        limit — and therefore bones, and elders, and mines, and the astringent taste, and
        pre-dawn, and rust, and the reply you withheld because saying it would cost you
        something.
      </p>

      <h2>Why bother looking at it</h2>
      <p>
        You do not have to believe that a planet causes anything to find this interesting.
        What is in front of you is a classification system that a civilisation refined over
        roughly two millennia, which sorts the entire furniture of human life into nine
        categories — and which turns out to be startlingly consistent when you test it
        against things its authors never saw. That is a real intellectual object. It is
        worth looking at closely before deciding what you think of it.
      </p>
      <p>
        The most interesting question is not <em>is it true</em>. It is: what kind of
        structure is this, that sorting by it produces groups that feel coherent to almost
        everyone who reads them?
      </p>

      <h2>Where the content comes from</h2>
      <p>The kāraka lists are drawn from the classical literature:</p>
      <ul>
        <li><cite>Bṛhat Parāśara Horā Śāstra</cite> — the foundational text; the chapters on graha characteristics and significations.</li>
        <li><cite>Uttara Kālāmṛta</cite> of Kālidāsa — by a distance the most extensive kāraka lists in the tradition.</li>
        <li><cite>Phaladeepikā</cite> of Mantreśvara — significations, professions and materials.</li>
        <li><cite>Prashna Marga</cite> — the bodily and pathological correspondences.</li>
      </ul>
      <p>
        Entries marked <sup className="chip-ext">ext</sup> are <strong>reasoned extensions</strong>:
        they are not in the texts, and I have placed them by applying the stated principle to
        something the authors had no access to. They are clearly marked precisely so you can
        discount them, or argue with them. Being able to tell the two apart is the whole
        basis for taking the rest seriously.
      </p>

      <h2>Two colour systems, and why they disagree</h2>
      <p>
        The spheres on the home page are rendered as the bodies actually look —
        Mercury is grey rock, Mars is rust, Jupiter has belts. The accent colour used
        for each graha everywhere else in this app is a different thing entirely: it
        is the colour the <em>texts</em> assign, and it is part of the kāraka data.
      </p>
      <ul>
        <li><strong>Sūrya</strong> — copper-red · <strong>Chandra</strong> — white · <strong>Maṅgala</strong> — blood red</li>
        <li><strong>Budha</strong> — green, the colour of dūrvā grass · <strong>Guru</strong> — yellow, tawny gold</li>
        <li><strong>Śukra</strong> — bright white, variegated · <strong>Śani</strong> — black, dark blue</li>
        <li><strong>Rāhu</strong> — smoke · <strong>Ketu</strong> — grey, many-coloured</li>
      </ul>
      <p>
        So Budha is green here while Mercury is grey there, and that is not an error.
        The classical colour belongs to the principle — it turns up again in the cloth,
        the stone, the grain and the offering associated with that graha — and it was
        never a claim about the planet's appearance. Showing both, side by side, is the
        clearest way to make the difference between the two obvious.
      </p>

      <h2>The behavioural sections</h2>
      <p>
        Every graha has a <em>strengthened by</em> and a <em>depleted by</em> list. These are
        deliberately limited to actions, attitudes and habits — there are no gemstones,
        mantras or ritual remedies here. That is an editorial choice, not a judgement on
        those practices: behavioural guidance is the part that stands on its own, that you
        can test against your own week, and that needs no metaphysical commitment from you
        at all.
      </p>
      <p>
        Read the pairs as a description of a pattern rather than a set of rules. “Śani is
        depleted by shortcuts, especially the ones that work” is worth sitting with whether
        or not you think Saturn is involved.
      </p>

      <h2>What this is not</h2>
      <p>
        It is not prediction, and there is no birth chart anywhere in it. It is not medical
        advice — the body lens is a map of classical symbolic correspondence, and nothing in
        it should inform a decision about your health. It is not financial advice. And it is
        not a claim that any of these mappings is causal.
      </p>

      <h2>Notes on the build</h2>
      <p>
        449 mapped items across 10 lenses and 9 grahas. The planets are drawn with
        procedural SVG rather than images, so they stay sharp at any size and need no
        network request. The horā calculation uses the NOAA
        solar equations against your device’s location, which never leaves your browser;
        without location it falls back to a 6am/6pm day and says so. Every view has its own
        URL, so any lens or any graha can be linked directly.
      </p>
    </div>
  );
}
