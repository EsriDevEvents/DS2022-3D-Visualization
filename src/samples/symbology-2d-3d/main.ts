import Fullscreen from "@arcgis/core/widgets/Fullscreen";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import Expand from "@arcgis/core/widgets/Expand";
import Daylight from "@arcgis/core/widgets/Daylight";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";

let map = new Map({
  basemap: "topo-vector",
  ground: {
    surfaceColor: "white",
  },
});

let view = new SceneView({
  container: "viewDiv",
  map: map,
  qualityProfile: "high",
  camera: {
    position: { x: -0.17162553, y: 51.48422402, z: 171.46968 },
    heading: 331.12,
    tilt: 74.0,
  },
});

if (view.environment.lighting?.type === "sun") {
  view.environment.lighting.directShadowsEnabled = true;
}

view.ui.empty("top-left");

const daylightExpand = new Expand({
  view: view,
  content: new Daylight({
    view: view,
  }),
  group: "top-right",
  expanded: false,
});
view.ui.add(daylightExpand, "top-right");

let graphicsLayerPlaceholders = new GraphicsLayer();
graphicsLayerPlaceholders.elevationInfo = { mode: "on-the-ground" };
map.add(graphicsLayerPlaceholders);

let graphicsLayerDraped = new GraphicsLayer();
graphicsLayerDraped.elevationInfo = { mode: "on-the-ground" };
graphicsLayerDraped.visible = false;
map.add(graphicsLayerDraped);

let graphicsLayer = new GraphicsLayer();
graphicsLayer.visible = false;
map.add(graphicsLayer);

const placeholderSymbol = new PointSymbol3D({
  symbolLayers: [
    new IconSymbol3DLayer({
      resource: { primitive: "circle" },
      material: { color: "red" },
      //anchor: "bottom",
      outline: {
        color: "brown",
        size: "1px",
      },
      size: 10,
    }),
  ],
});

const pin2DPoint = new Point({
  x: -0.176,
  y: 51.48791,
  z: 0,
});

const pin2DSymbol = new PointSymbol3D({
  symbolLayers: [
    {
      type: "icon",
      resource: { href: "pin.png" },
      anchor: "bottom",
      size: 30,
    },
  ],
});

const pin2DGraphic = new Graphic({
  geometry: pin2DPoint,
  symbol: pin2DSymbol,
});

graphicsLayer.add(pin2DGraphic);

const pin2DPlaceholder = new Graphic({
  geometry: pin2DPoint,
  symbol: placeholderSymbol,
});

graphicsLayerPlaceholders.add(pin2DPlaceholder);

const pin3DPoint = new Point({
  x: -0.175,
  y: 51.4877,
  z: -4,
});
const pin3DPointPlaceholder = new Point({
  x: -0.175 + 0.000037,
  y: 51.4877 + 0.000125,
  z: -4,
});

const pin3DSymbol = new PointSymbol3D({
  symbolLayers: [
    new ObjectSymbol3DLayer({
      resource: { href: "./pin/ubermapin.gltf" },
      material: { color: [66, 126, 245] },
      height: 20,
    }),
  ],
});

const pin3DGraphic = new Graphic({
  geometry: pin3DPoint,
  symbol: pin3DSymbol,
});
graphicsLayer.add(pin3DGraphic);

const pin3DPlaceholder = new Graphic({
  geometry: pin3DPointPlaceholder,
  symbol: placeholderSymbol,
});
graphicsLayerPlaceholders.add(pin3DPlaceholder);

const plane2DPoint = new Point({
  x: -0.174,
  y: 51.48791,
  z: 0,
});

const plane2DSymbol = new PointSymbol3D({
  symbolLayers: [
    new IconSymbol3DLayer({
      resource: { href: "plane.png" },
      anchor: "bottom",
      size: 40,
    }),
  ],
});

function toggleSymbology() {
  graphicsLayerPlaceholders.visible = !graphicsLayerPlaceholders.visible;
  graphicsLayerDraped.visible = !graphicsLayerDraped.visible;
  graphicsLayer.visible = !graphicsLayer.visible;
}

(document.getElementById("toggle-symbology") as HTMLButtonElement).onclick = toggleSymbology;

view.ui.add("paneDiv", "bottom-right");

const fullscreen = new Fullscreen({
  view: view,
});

view.ui.add(fullscreen, "bottom-left");
