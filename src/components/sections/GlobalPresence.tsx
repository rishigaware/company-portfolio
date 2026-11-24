import { geoNaturalEarth1, geoPath, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { offices } from "@/data/content";
import { Counter } from "@/components/motion/Counter";
import { WorldMap, type MapPin } from "./WorldMap";

const W = 1000;
const H = 500;

/**
 * Real world map (Natural Earth projection, world-atlas 110m country outlines).
 * Geometry is projected here on the server; only SVG path strings go to the client.
 */
function buildMap() {
  const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
  const countries = feature(topo, topo.objects.countries) as FeatureCollection<Geometry, { name: string }>;
  // Drop Antarctica so the map uses the space for inhabited land.
  countries.features = countries.features.filter((f) => f.properties?.name !== "Antarctica");

  const projection = geoNaturalEarth1().fitExtent(
    [
      [10, 10],
      [W - 10, H - 10],
    ],
    countries,
  );
  const path = geoPath(projection);

  const countryPaths = countries.features.map((f) => ({ name: f.properties?.name ?? "", d: path(f) ?? "" }));
  const activeCountries = new Set(offices.map((o) => o.country === "USA" ? "United States of America" : o.country === "UAE" ? "United Arab Emirates" : o.country));

  const hq = offices.find((o) => o.hq)!;
  const pins: MapPin[] = offices.map((o) => {
    const [x, y] = projection([o.lng, o.lat])!;
    return { city: o.city, x, y, hq: !!o.hq, labelLeft: "labelLeft" in o && !!o.labelLeft };
  });

  // Great-circle routes from HQ, sampled and projected so they curve naturally on the map.
  const arcs = offices
    .filter((o) => !o.hq)
    .map((o) => {
      const interp = geoInterpolate([hq.lng, hq.lat], [o.lng, o.lat]);
      const pts = Array.from({ length: 41 }, (_, i) => projection(interp(i / 40))!);
      return { city: o.city, d: "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") };
    });

  return {
    countries: countryPaths.map((c) => ({ ...c, active: activeCountries.has(c.name) })),
    pins,
    arcs,
  };
}

const map = buildMap();

export function GlobalPresence() {
  return (
    <section className="mx-auto max-w-[1760px] px-5 py-14 md:px-10 md:py-20 lg:py-24">
      <div className="mb-10 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-teal">Global presence</p>
          <h2 className="font-display text-h2 font-semibold tracking-tight">Local support in 22 countries</h2>
        </div>
        <dl className="grid grid-cols-3 gap-4">
          {[
            { v: 22, s: "", l: "Countries" },
            { v: 6, s: "", l: "Regional hubs" },
            { v: 120, s: "+", l: "Field engineers" },
          ].map((s) => (
            <div key={s.l} className="border-l border-line pl-4">
              <dd className="font-display text-3xl font-semibold text-teal">
                <Counter value={s.v} suffix={s.s} />
              </dd>
              <dt className="text-sm text-mist">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 p-3 md:p-6">
          <WorldMap width={W} height={H} countries={map.countries} pins={map.pins} arcs={map.arcs} />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {offices.map((o) => (
            <li key={o.city} className="flex items-center justify-between rounded-2xl border border-line px-5 py-4">
              <span>
                <span className="block font-medium">
                  {o.city}, {o.country}
                </span>
                <span className="text-sm text-mist">{o.role}</span>
              </span>
              {o.hq && <span className="rounded-full bg-teal px-3 py-1 text-xs text-ink">HQ</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
