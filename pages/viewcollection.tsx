import React, { ReactPropTypes, useEffect } from "react";
import { startCreating } from "../lib/artengine/mainClient";

interface ViewCollectionProps {
  collectionSize: number;
  layerObjects: any[];
}

function ViewCollection(props: ViewCollectionProps) {
  useEffect(() => {
    startCreating(props.collectionSize, props.layerObjects);
  });

  return <div>ViewCollection</div>;
}

export default ViewCollection;
