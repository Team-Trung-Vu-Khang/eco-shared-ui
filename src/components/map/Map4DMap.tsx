import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    map4d?: {
      Map: new (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => Map4DMapInstance;
      LatLng: new (lat: number, lng: number) => unknown;
      Marker?: new (options: Record<string, unknown>) => unknown;
    };
  }
}

interface Map4DMapInstance {
  setCenter?: (center: unknown) => void;
  setZoom?: (zoom: number) => void;
  getZoom?: () => number;
  addListener?: (
    eventName: string,
    handler: (event?: unknown) => void,
  ) => { remove?: () => void };
  remove?: () => void;
}

export interface Map4DMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
  mapOptions?: Record<string, unknown>;
  scriptUrl?: string;
  containerProps?: Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "className" | "style"
  >;
  onMapReady?: (map: Map4DMapInstance) => void;
  onSdkLoadError?: () => void;
  onZoomChange?: (zoom: number) => void;
  autoSyncView?: boolean;
  children?: React.ReactNode;
  onMapClick?: (event: unknown) => void;
  onMoveEnd?: (event: unknown) => void;
}

export function Map4DMap({
  apiKey,
  center,
  zoom = 14,
  className,
  style,
  mapOptions,
  scriptUrl = "https://api.map4d.vn/sdk/map/js?key=",
  containerProps,
  onMapReady,
  onSdkLoadError,
  onZoomChange,
  autoSyncView = true,
  children,
  onMapClick,
  onMoveEnd,
}: Map4DMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map4DMapInstance | null>(null);
  const zoomListenerRef = useRef<{ remove?: () => void } | null>(null);
  const clickListenerRef = useRef<{ remove?: () => void } | null>(null);
  const moveEndListenerRef = useRef<{ remove?: () => void } | null>(null);
  const optionsRef = useRef(mapOptions);
  const centerRef = useRef(center);
  const zoomRef = useRef(zoom);
  const onMapReadyRef = useRef(onMapReady);
  const onSdkLoadErrorRef = useRef(onSdkLoadError);

  useEffect(() => {
    optionsRef.current = mapOptions;
  }, [mapOptions]);

  useEffect(() => {
    centerRef.current = center;
  }, [center]);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    onMapReadyRef.current = onMapReady;
  }, [onMapReady]);

  useEffect(() => {
    onSdkLoadErrorRef.current = onSdkLoadError;
  }, [onSdkLoadError]);

  useEffect(() => {
    if (!containerRef.current || !apiKey) return;

    const scriptId = "eco-shared-ui-map4d-sdk";

    const initMap = () => {
      if (!containerRef.current || !window.map4d) return;

      const map = new window.map4d.Map(containerRef.current, {
        center: [centerRef.current.lat, centerRef.current.lng],
        zoom: zoomRef.current,
        ...optionsRef.current,
      });

      mapRef.current = map;
      onMapReadyRef.current?.(map);
    };

    if (window.map4d) {
      initMap();
      return;
    }

    const existingScript = document.getElementById(scriptId) as
      | HTMLScriptElement
      | null;

    if (existingScript) {
      existingScript.addEventListener("load", initMap, { once: true });
      return () => existingScript.removeEventListener("load", initMap);
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `${scriptUrl}${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    script.onerror = () => onSdkLoadErrorRef.current?.();
    document.head.appendChild(script);
  }, [apiKey, scriptUrl]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.addListener) return;

    zoomListenerRef.current?.remove?.();
    if (!onZoomChange) return;

    zoomListenerRef.current = map.addListener("zoom_changed", () => {
      const currentZoom = map.getZoom?.();
      if (typeof currentZoom === "number") onZoomChange(currentZoom);
    });
  }, [onZoomChange]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.addListener) return;

    clickListenerRef.current?.remove?.();
    if (!onMapClick) return;

    clickListenerRef.current = map.addListener("click", (event) => {
      onMapClick(event);
    });
  }, [onMapClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.addListener) return;

    moveEndListenerRef.current?.remove?.();
    if (!onMoveEnd) return;

    moveEndListenerRef.current = map.addListener("idle", (event) => {
      onMoveEnd(event);
    });
  }, [onMoveEnd]);

  useEffect(() => {
    if (!window.map4d || !mapRef.current || !autoSyncView) return;

    const nextCenter = new window.map4d.LatLng(center.lat, center.lng);
    mapRef.current.setCenter?.(nextCenter);
    mapRef.current.setZoom?.(zoom);
  }, [autoSyncView, center.lat, center.lng, zoom]);

  useEffect(() => {
    return () => {
      zoomListenerRef.current?.remove?.();
      clickListenerRef.current?.remove?.();
      moveEndListenerRef.current?.remove?.();
      mapRef.current?.remove?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("h-[400px] w-full", className)}
      style={style}
      {...containerProps}
    >
      {children}
    </div>
  );
}
