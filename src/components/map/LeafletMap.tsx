import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Icon, type LatLngExpression, type Map as LeafletMapInstance } from "leaflet";
import type {
  MapContainerProps,
  MarkerProps,
  TileLayerProps,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface LeafletMapMarker {
  id: string;
  position: LatLngExpression;
  popup?: React.ReactNode;
  icon?: Icon;
  markerProps?: Omit<MarkerProps, "position" | "icon" | "children">;
}

export interface LeafletMapProps {
  center: LatLngExpression;
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
  tileUrl?: string;
  attribution?: string;
  tileLayerProps?: Omit<TileLayerProps, "url" | "attribution">;
  mapProps?: Omit<
    MapContainerProps,
    "center" | "zoom" | "className" | "style" | "children"
  >;
  markers?: LeafletMapMarker[];
  markerIcon?: Icon;
  children?: React.ReactNode;
  onMapReady?: (map: LeafletMapInstance) => void;
  onZoomChange?: (zoom: number) => void;
  autoSyncView?: boolean;
  onMapClick?: (event: unknown) => void;
  onMoveEnd?: (event: unknown) => void;
}

function LeafletMapUpdater({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);

  return null;
}

function LeafletZoomListener({
  onChange,
}: {
  onChange: (zoom: number) => void;
}) {
  const map = useMapEvents({
    zoomend: () => {
      onChange(map.getZoom());
    },
  });

  return null;
}

function LeafletEventListener({
  onMapClick,
  onMoveEnd,
}: {
  onMapClick?: (event: unknown) => void;
  onMoveEnd?: (event: unknown) => void;
}) {
  useMapEvents({
    click: (event) => onMapClick?.(event),
    moveend: (event) => onMoveEnd?.(event),
  });

  return null;
}

const defaultMarkerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function LeafletMap({
  center,
  zoom = 13,
  className,
  style,
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution = "&copy; OpenStreetMap contributors",
  tileLayerProps,
  mapProps,
  markers = [],
  markerIcon = defaultMarkerIcon,
  children,
  onMapReady,
  onZoomChange,
  autoSyncView = true,
  onMapClick,
  onMoveEnd,
}: LeafletMapProps) {
  const mapRef = useRef<LeafletMapInstance | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    onMapReady?.(mapRef.current);
  }, [onMapReady]);

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={zoom}
      className={cn("h-[400px] w-full", className)}
      style={style}
      {...mapProps}
    >
      {autoSyncView ? <LeafletMapUpdater center={center} zoom={zoom} /> : null}
      {onZoomChange ? <LeafletZoomListener onChange={onZoomChange} /> : null}
      {onMapClick || onMoveEnd ? (
        <LeafletEventListener onMapClick={onMapClick} onMoveEnd={onMoveEnd} />
      ) : null}
      <TileLayer attribution={attribution} url={tileUrl} {...tileLayerProps} />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={marker.icon ?? markerIcon}
          {...marker.markerProps}
        >
          {marker.popup ? <Popup>{marker.popup}</Popup> : null}
        </Marker>
      ))}
      {children}
    </MapContainer>
  );
}
