import Image from "next/image";

import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/me.jpg"
          alt="An showing Max"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Alex</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular and React.
      </p>
    </section>
  );
};

export default Hero;
