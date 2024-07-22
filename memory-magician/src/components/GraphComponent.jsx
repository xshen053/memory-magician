// src/GraphComponent.js

import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { drawGraph } from './drawGraph'; // Assuming drawGraph is in the same directory

const GraphComponent = ({ baseUrl, isHome, pathColors, graphConfig }) => {
  useEffect(() => {
    drawGraph(baseUrl, isHome, pathColors, graphConfig);
  }, [baseUrl, isHome, pathColors, graphConfig]);

  return <div id="graph-container" style={{ width: '100%', height: '100vh' }} />;
};

export default GraphComponent;
