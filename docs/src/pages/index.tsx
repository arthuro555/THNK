import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import NetworkingOptions from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import Translate, { translate } from "@docusaurus/Translate";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <Translate>THNK</Translate>
        </h1>
        <p className="hero__subtitle">
          <Translate>
            The GDevelop Multiplayer Framework for everyone!
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/why-thnk"
          >
            <Translate>Why THNK?</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/category/getting-started/"
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
