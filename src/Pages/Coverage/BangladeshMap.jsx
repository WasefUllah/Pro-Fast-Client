import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import ReactDOMServer from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

// Convert icon to HTML
const locationHTML = ReactDOMServer.renderToString(
  <FaMapMarkerAlt color="blue" size="30px" />
);

// Custom icon for markers
const locationIcon = L.divIcon({
  html: `<div style="transform: translate(-50%, -100%);">${locationHTML}</div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// 🔍 Component to control map based on search
const SearchControl = ({ wareHouses, query }) => {
  const map = useMap();

  // When query changes, search and pan if matched
  if (query) {
    const found = wareHouses.find(
      (w) => w.district.toLowerCase() === query.toLowerCase()
    );

    if (found) {
      map.flyTo([found.latitude, found.longitude], 12, { duration: 1 });
    }
  }

  return null;
};

const BangladeshMap = ({ wareHouses }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const position = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="absolute z-10 top-4 left-1/2 -translate-x-1/2">
        <form
          onSubmit={handleSearch}
          className="mb-10 flex justify-center gap-4 "
        >
          <input
            type="text"
            placeholder="Enter district name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="rounded-lg p-1 text-white text-lg border-1 border-gray-700 w-64 bg-gray-400"
          />
          <button type="submit" className="btn btn-primary text-black">
            Search
          </button>
        </form>
      </div>

      {/* Map Container */}
      <MapContainer
        center={position}
        zoom={7}
        className="h-[500px] w-full  -z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Handle the actual map panning */}
        <SearchControl wareHouses={wareHouses} query={searchQuery} />

        {/* All warehouse markers */}
        {wareHouses.map((wareHouse, index) => (
          <Marker
            key={index}
            position={[wareHouse.latitude, wareHouse.longitude]}
            icon={locationIcon}
          >
            <Popup>
              <span className="font-semibold">{wareHouse.district}</span>
              <br />
              {wareHouse.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
