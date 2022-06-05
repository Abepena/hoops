import EventBanner from "../../components/Events/EventBanner";
import PageWrapper from "../../components/Layout/PageWrapper";
import { server } from "../../config";
import EventContent from "../../components/Events/EventContent";
import EventRegisterModal from "components/Modals/EventRegisterModal";
import EventHero from "components/Heros/EventHero";

const Event = ({ event }) => {
  return (
    <PageWrapper>
      <EventHero img_url={event.img_url} title={event.name}/>
      {/* <EventBanner>
        <h1 className="transition-all bg-white text-3xl text-black px-10 py-4 shadow-md hover:shadow-orange-600 hover:shadow-2xl rounded -m-6 font-bold">
          {event.name}
        </h1>
      </EventBanner> */}
      <div className="container mx-auto">
        <EventContent event={event} />
      </div>
      <EventRegisterModal />
    </PageWrapper>
  );
};
export async function getServerSideProps(ctx) {
  // Get event by id
  const res = await fetch(`${server}/api/events/${ctx.query.id}`);
  const json = await res.json();
  const { event } = json;
  return {
    props: { event },
  };
}

export default Event;
