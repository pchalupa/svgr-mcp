# SVGR MCP Server

A Model Context Protocol (MCP) server that exposes [SVGR](https://react-svgr.com/) functionality to convert SVG content into React components.

## Features

- **SVG to React Conversion**: Transforms raw SVG strings into valid React components.
- **Configurable Output**: Supports extensive SVGR configuration options including TypeScript generation, React Native support, and Prettier formatting.
- **Optimization**: Optional SVGO integration for optimizing SVG content before conversion.

```json
{
  "mcpServers": {
    "svgr": {
      "command": "npx",
      "args": ["svgr-mcp@latest"],
      "type": "stdio"
    }
  }
}
```

## API Reference

### Tools

#### `convert_svg_to_react`

Converts an SVG string into a React component.

**Input Schema:**

| Parameter       | Type     | Description                                   | Default         |
| :-------------- | :------- | :-------------------------------------------- | :-------------- |
| `svg`           | `string` | **Required**. The raw SVG content to convert. | -               |
| `componentName` | `string` | Name for the generated React component.       | `"MyComponent"` |
| `options`       | `object` | Configuration options for SVGR.               | `{}`            |

**Options Object:**

The `options` parameter supports the following keys:

- **`icon`** (`boolean | string | number`): Replace SVG width and height with a custom value.
- **`native`** (`boolean`): Modify all SVG nodes for React Native.
- **`typescript`** (`boolean`): Generate TypeScript component.
- **`dimensions`** (`boolean`): Keep width and height attributes from the root SVG tag.
- **`expandProps`** (`"start" | "end" | boolean`): Forward properties to the SVG tag.
- **`prettier`** (`boolean`): Format output with Prettier.
- **`prettierConfig`** (`object`): Specify custom Prettier configuration.
- **`svgo`** (`boolean`): Use SVGO to optimize SVG code.
- **`ref`** (`boolean`): Add ref support to the component.
- **`memo`** (`boolean`): Wrap component with `React.memo`.
- **`replaceAttrValues`** (`object`): Map of attribute values to replace.
- **`svgProps`** (`object`): Add props to the root SVG tag.
- **`titleProp`** (`boolean`): Add title prop support.
- **`descProp`** (`boolean`): Add description prop support.
- **`jsxRuntime`** (`"classic" | "automatic" | "classic-preact"`): Specify the JSX runtime to use.
- **`exportType`** (`"named" | "default"`): Specify export type (named or default).

**Return Value:**

Returns a text content block containing the generated React component code.

**Example Usage:**

```json
{
  "name": "convert_svg_to_react",
  "arguments": {
    "svg": "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\"><circle cx=\"24\" cy=\"24\" r=\"20\"/></svg>",
    "componentName": "CircleIcon",
    "options": {
      "typescript": true,
      "icon": true
    }
  }
}
```
