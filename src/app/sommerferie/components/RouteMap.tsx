"use client";

import { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const stops: { name: string; pos: [number, number]; emoji: string }[] = [
  { name: "Oslo", pos: [59.91, 10.75], emoji: "🏠" },
  { name: "Legoland, Billund", pos: [55.735, 9.13], emoji: "🧱" },
  { name: "Vestkysten", pos: [55.56, 8.08], emoji: "🏖️" },
  { name: "Hirtshals", pos: [57.59, 9.97], emoji: "⛴️" },
];

const routeCoords: [number, number][] = [
  // Oslo → south through Norway
  [59.91, 10.75],
  [59.66, 10.68],
  [59.43, 10.66],
  [59.22, 10.93],
  [59.1, 11.25],
  // Sweden west coast (E6)
  [58.94, 11.17],
  [58.72, 11.32],
  [58.35, 11.93],
  [57.71, 11.97], // Gothenburg
  // South through Sweden
  [56.67, 12.86],
  [56.04, 12.69],
  [55.68, 12.57], // Copenhagen area
  // Across Zealand + Funen
  [55.46, 12.18],
  [55.33, 11.14], // Storebælt
  [55.4, 10.39], // Odense
  [55.71, 9.54], // Vejle
  // Billund
  [55.735, 9.13],
  // West to coast
  [55.62, 8.48],
  [55.56, 8.08], // Blåvand / Vestkysten
  // North along west coast
  [56.0, 8.13],
  [56.36, 8.11],
  [56.71, 8.21], // Thyborøn
  [56.96, 8.69], // Thisted
  [57.25, 9.46],
  [57.46, 9.98], // Hjørring
  [57.59, 9.97], // Hirtshals
  // Ferry to Larvik + drive to Oslo
  [59.05, 10.03], // Larvik
  [59.13, 10.22],
  [59.44, 10.18],
  [59.74, 10.2],
  [59.91, 10.75], // Oslo
];

const ferryStartIdx = routeCoords.findIndex(
  (c) => c[0] === 57.59 && c[1] === 9.97
);
const ferryEndIdx = routeCoords.findIndex(
  (c) => c[0] === 59.05 && c[1] === 10.03
);
const roadBefore = routeCoords.slice(0, ferryStartIdx + 1);
const ferry = routeCoords.slice(ferryStartIdx, ferryEndIdx + 1);
const roadAfter = routeCoords.slice(ferryEndIdx);

export default function RouteMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [57.5, 10.5],
      zoom: 5,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Road segments
    L.polyline(roadBefore, {
      color: "#0369a1",
      weight: 3,
      opacity: 0.8,
    }).addTo(map);

    L.polyline(roadAfter, {
      color: "#0369a1",
      weight: 3,
      opacity: 0.8,
    }).addTo(map);

    // Ferry segment (dashed)
    L.polyline(ferry, {
      color: "#0369a1",
      weight: 3,
      opacity: 0.5,
      dashArray: "8 8",
    }).addTo(map);

    // Markers
    for (const s of stops) {
      const icon = L.divIcon({
        html: `<span style="font-size:24px;line-height:1">${s.emoji}</span>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker(s.pos, { icon }).addTo(map).bindPopup(`<b>${s.name}</b>`);
    }

    // Fit the route bounds
    const bounds = L.latLngBounds(routeCoords);
    map.fitBounds(bounds, { padding: [30, 30] });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-2xl shadow-sm"
      style={{ height: 480, width: "100%" }}
    />
  );
}
