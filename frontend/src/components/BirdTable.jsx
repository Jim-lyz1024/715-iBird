import BirdTableRow from "./BirdTableRow";
export default function BirdTable({ trip, setMapCenter, setSelectedImage, mapHeight, windowHeight }) {
    const tableHeight = windowHeight - 45 - 60 - mapHeight;
    return (
        <div style={{ width: "100%", maxHeight: `${tableHeight}px`, overflowY: "auto" }}>
            {trip && trip.images.length !== 0 ?
                <table style={{ width: "100%" }}>
                    <tbody>
                        {[...trip.images].reverse().map((image, index) => (
                            <BirdTableRow key={image._id} image={image} setMapCenter={setMapCenter} setSelectedImage={setSelectedImage} />
                        ))}
                    </tbody>
                </table>
                :
                <h3 style={{
                    width: "100%",
                    overflowY: "auto",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: `${tableHeight / 2.5}px`
                }}>You didn't find any birds.</h3>
            }
        </div>
    );
}
