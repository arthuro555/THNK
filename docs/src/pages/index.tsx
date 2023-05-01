import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import NetworkingOptions from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import Logo from "./Logo.svg";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={clsx(styles.heroLogo)}>
          <Logo />
          <h1 className={clsx(styles.heroHeaderText, styles.heroText)}>
            <Translate>THNK</Translate>
          </h1>
        </div>
        <p className={clsx("hero__subtitle", styles.heroText)}>
          <Translate>
            The GDevelop Multiplayer Framework for everyone!
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--lg"
            to="/docs/why-thnk"
          >
            <Translate>Why THNK?</Translate>
          </Link>
          <Link
            className="button button--lg"
            to="/docs/getting-started/"
          >
            <Translate>Get started</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      description={translate({
        message:
          "THNK is an authoritative multiplayer games frameworks for the GDevelop game engine. It is made for everyone - all use cases are supported! From local multiplayer, to LAN, MMOs, and even singleplayer, all are available with the press of a button!",
      })}
    >
      <HomepageHeader />
      <main>
        <NetworkingOptions />
      </main>
    </Layout>
  );
}
