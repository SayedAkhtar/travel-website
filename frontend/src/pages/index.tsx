import React, { useState, useEffect } from "react";
import Head from "next/head";
import Container from "@/components/common/Container";
import DestinationList from "@/components/UI/DestinationList";
import Heading from "@/components/common/Heading";
import HowWeWork from "../components/featured/HowWeWork";
import { products } from "../data/ActivityData";
import ProductSlider from "@/components/UI/ProductSlider";
import BannerSlider from "../components/featured/BannerSlider";
import { useMediaQuery } from "react-responsive";
import { deviceSize } from "@/components/Responsive";
import MobileHero from "@/components/Hero/MobileHero";
import DesktopHero from "@/components/Hero/DesktopHero";
import PartnerLogo from "@/components/featured/PartnerLogo";
import CardSkelton from "@/components/Animation/CardSkelton";
import { getHomePageActivity, getHomePageTour } from "../lib/api";

const Index = (props: any) => {
  const [activities, setActivities] = useState([]);
  const [tourData, setTourData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: deviceSize.tablet });

  useEffect(() => {
    setIsLoading(true);
    const filterActivityData: any = products.filter(
      (item) => item.category === "activity"
    );
    const filterTourData: any = products.filter(
      (item) => item.category === "tour"
    );

    setActivities(filterActivityData);
    setTourData(filterTourData);
    setIsLoading(false);
  }, []);

  return (
    <>
      <div>
        <Head>
          <title>Adventure, Activity Online Travel Portal</title>
          <meta name="description" content="Online tour booking system" />
        </Head>
      </div>
      {isTablet ? <MobileHero /> : <DesktopHero />}

      {/* <section className="">
        <Container>
          <Heading
            textAlign="center"
            heading="Explore Top Destination"
            subheading="Top Destination"
          />
          <DestinationList locationData={props?.destination} />
        </Container>
      </section> */}

      <section className="pt-0">
        <Container>
          <Heading
            textAlign="center"
            heading="Top Adventure Activity"
            subheading="TOP ADVENTURE"
          />
          <ProductSlider data={props?.activityData} isLoading={isLoading} />
        </Container>
      </section>

      <section className="bg-lightBg">
        <HowWeWork />
      </section>

      {props?.tourData.length > 3 ? (
        <section>
          <Container>
            <Heading
              heading="Recommended Tour Package"
              subheading="Top Rated Experience"
              textAlign="center"
            />

            <ProductSlider data={props?.tourData} isLoading={isLoading} />
          </Container>
        </section>
      ) : (
        ""
      )}

      <section>
        <Container>
          <Heading
            heading="Top Rated Brands"
            subheading="Our Valuable Partner"
            textAlign="center"
          />
          <PartnerLogo />
        </Container>
      </section>
    </>
  );
};

export const getStaticProps = async () => {
  const activityData = await getHomePageActivity();
  const tourData = await getHomePageTour();

  return {
    props: {
      tourData,
      activityData,
    },
    revalidate: 360,
  };
};

export default Index;
