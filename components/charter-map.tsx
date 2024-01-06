"use client";

import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "/features.json";

export default function CharterMap({ className }: { className?: string }) {
  return (
    <ComposableMap
      className={className + " bg-slate-50"}
      projection="geoMercator"
    >
      <ZoomableGroup center={[0, 0]}>
        <Marker coordinates={[-97, 40]} style={{ default: { color: "red" } }} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="fill-slate-500 stroke-slate-300"
                // fill="#67AC5D"
                // stroke="#000000"
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
