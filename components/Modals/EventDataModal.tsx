import Image from "next/image";

const EventDataModal = ({
  showModal,
  eventData,
  closeModal,
}: {
  showModal: any;
  eventData: any;
  closeModal: any;
}) => {
  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div
            className=" w-full h-3/4 rounded-lg shadow-lg flex flex-col justify-evenly items-center mx-5 p-5 md:w-1/2 event-modal bg-gradient-to-br from-transparent to-fuchsia-200 backdrop-blur-sm "
            //   style={{overflowY: "scroll"}}
          >
            <div className="w-full h-10 flex flex-row justify-between items-center p">
              <div className="w-24 h-24 relative">
                <Image
                  src="https://i.imgur.com/G42sxIN.png"
                  alt="regalia logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h1 className="text-lg font-normal text-white py-3 text-left md:text-4xl">
                {eventData.name}
              </h1>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </button>
            </div>
            <div
              className="h-96 mt-10 w-full text-white text-left text-sm font-normal overflow-y-scroll"
              style={{
                fontFamily: "Unbounded, cursive",
              }}
              dangerouslySetInnerHTML={{ __html: eventData.rules_regulations }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDataModal;
