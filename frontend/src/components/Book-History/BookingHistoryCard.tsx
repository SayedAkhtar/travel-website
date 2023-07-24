import Date from "./Date";
import TourInfo from "./TourInfo";
export default function BookingHistoryCard(props: any) {
  let newDate: any = "2023-07-24T11:43:43.919Z";
  console.log("TOdya's data", newDate);

  return (
    <>
      <div className="flex flex-row shadow-[0_3px_10px_rgb(0,0,0,0.4)] py-5 px-1 mx-3 rounded-2xl">
        <Date dateOfBooking={newDate} />
        <TourInfo tourData={props.bookingInfo} />
      </div>
    </>
  );
}
