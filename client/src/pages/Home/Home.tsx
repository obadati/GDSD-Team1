import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../../store/rootReducer";
import Hero, { HeroProps } from "./components/Hero/Hero";
import TrendingPropertyCard, {
  TrendingCardProps,
} from "./components/TrendingPropertyCard/TrendingPropertyCard";
import "./Home.scss";

const HomePage: React.FC<PropsFromRedux> = ({ properties }) => {
  const heroProps: HeroProps = {
    heading: "Get real time market average prices based on your preferences",
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis at
    quaerat eos nihil repudiandae nulla vero in, aut officia cumque
    dignissimos obcaecati, esse quisquam sunt. Atque earum nam quisquam
    eius? Possimus, quos culpa officia neque voluptas exercitationem
    tempora, consequuntur consequatur et alias dolorum dolores repellat
    officiis impedit? Magni consequuntur animi in veritatis vitae,
    necessitatibus earum itaque saepe aut placeat aliquid! Excepturi culpa,
    minima ipsa veniam suscipit commodi`,
    cta: { label: "get avg prices", handler: () => {} },
  };

  const trendingProperties: TrendingCardProps[] = [
    {
      heading: "Nice house 45km away from city center",
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis at
    quaerat eos nihil repudiandae nulla vero in, aut officia cumque
    dignissimos obcaecati, esse quisquam sunt. Atque earum nam quisquam
    eius? Possimus, quos culpa officia neque voluptas exercitationem
    tempora, consequuntur consequatur et alias dolorum dolores repellat
    officiis impedit?`,
      cta: { label: "Read More", handler: () => {} },
    },
    {
      heading: "5 room house for sharing",
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis at
    quaerat eos nihil repudiandae nulla vero in, aut officia cumque
    dignissimos obcaecati, esse quisquam sunt. Atque earum nam quisquam
    eius? Possimus, quos culpa officia neque voluptas exercitationem
    tempora, consequuntur consequatur et alias dolorum dolores repellat
    officiis impedit?`,
      cta: { label: "Read More", handler: () => {} },
    },
  ];
  return (
    <div className='home-page'>
      <Hero {...heroProps} />
      <div className='trending'>
        {trendingProperties.map((card) => (
          <TrendingPropertyCard {...card} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  properties: state.properties.properties,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomePage);
