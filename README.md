# React Galaxy Web Background

A tiny React component that renders a fullscreen, animated galaxy-style background.
Easy to install, drop-in, and customize via simple props.

---

## Installation

```bash
npm install react-galaxy-web-background
# or
yarn add react-galaxy-web-background
```

## Usage

```tsx
import React from 'react';
import { GalaxyBackground } from 'react-galaxy-web-background';

function App() {
  return (
    <div>
      <GalaxyBackground />
      {/* your content here */}
    </div>
  );
}

export default App;
```

By default it uses sensible settings for a subtle, interactive effect.

## Props

| Prop             | Type     | Default                   | Description                                 |
| ---------------- | -------- | ------------------------- | ------------------------------------------- |
| `density`        | `number` | `0.5`                     | Dots per pixel of viewport width            |
| `maxDistance`    | `number` | `50`                      | Maximum distance (px) to draw a line       |
| `hoverRadius`    | `number` | `100`                     | Radius (px) around cursor to enable lines   |
| `fps`            | `number` | `30`                      | Animation framerate                         |
| `dotSize`        | `number` | `1`                       | Maximum radius of each dot (px)             |
| `lineSize`       | `number` | `0.1`                     | Width of connection lines (px)              |
| `dotColor`       | `string` | `'#ffffff'`               | Fill color of dots                          |
| `lineColor`      | `string` | `'rgba(255,255,255,0.8)'` | Stroke color of connection lines            |
| `backgroundColor`| `string` | `'#282c34'`               | CSS background-color of the canvas element  |


## License
Licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) © 2025 iRewiewer.