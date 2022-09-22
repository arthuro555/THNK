import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Translate, { translate } from "@docusaurus/Translate";

type NetworkingOption = {
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  title: string;
  description: JSX.Element;
};

const NetworkingOptionsList: NetworkingOption[] = [
  {
    title: translate({ message: "Local" }),
    Svg: require("@site/static/img/Couch_Multiplayer.svg").default,
    description: (
      <>
        <Translate>THNK games work in singleplayer by default!</Translate>
        <br />
        <Translate>
          Multiplayer on the local machine is possible as well with the
          split-screen adapter (coming soon!)
        </Translate>
      </>
    ),
  },
  {
    title: translate({ message: "LAN" }),
    Svg: require("@site/static/img/LAN.svg").default,
    description: (
      <Translate>
        You can easily make LAN games! With the WebSocket adapter (comming
        soon!), start a server on your machine and let other connect to it via
        your local IP
      </Translate>
    ),
  },
  {
    title: translate({ message: "World-wide" }),
    Svg: require("@site/static/img/WWW.svg").default,
    description: (
      <Translate>
        Players across the world can connect and play your game together with
        the THNK Cloud (coming soon!) and the P2P adapter
      </Translate>
    ),
  },
];

function Option({ title, Svg, description }: NetworkingOption) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <h3>{title}</h3>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function NetworkingOptions(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center">
          <h1><Translate>Create all kinds of multiplayer experiences!</Translate></h1>
        </div>
        <br />
        <div className="row">
          {NetworkingOptionsList.map((props, idx) => (
            <Option key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
