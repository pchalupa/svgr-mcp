#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { convertSvgToReact } from "./svgr.js";

const server = new McpServer({
  name: "svgr-mcp",
  version: "1.1.0",
});

server.registerTool(
  "convert_svg_to_react",
  {
    description: "Convert SVG content or file to React component using SVGR",
    inputSchema: z.object({
      svg: z
        .string()
        .describe("SVG content as string or file path to SVG file"),
      componentName: z
        .string()
        .optional()
        .describe("Name for the React component (default: MyComponent)"),
      options: z
        .object({
          icon: z
            .union([z.boolean(), z.string(), z.number()])
            .optional()
            .describe("Replace SVG width and height with a custom value"),
          native: z
            .boolean()
            .optional()
            .describe("Modify all SVG nodes for React Native"),
          typescript: z
            .boolean()
            .optional()
            .describe("Generate TypeScript component"),
          dimensions: z
            .boolean()
            .optional()
            .describe("Keep width and height attributes from the root SVG tag"),
          expandProps: z
            .union([z.enum(["start", "end"]), z.boolean()])
            .optional()
            .describe("Forward properties to the SVG tag"),
          prettier: z
            .boolean()
            .optional()
            .describe("Format output with Prettier"),
          prettierConfig: z
            .record(z.string(), z.unknown())
            .optional()
            .describe("Specify Prettier config"),
          svgo: z
            .boolean()
            .optional()
            .describe("Use SVGO to optimize SVG code"),
          ref: z.boolean().optional().describe("Add ref support to component"),
          memo: z
            .boolean()
            .optional()
            .describe("Wrap component with React.memo"),
          replaceAttrValues: z
            .record(z.string(), z.string())
            .optional()
            .describe("Replace an attribute value by another"),
          svgProps: z
            .record(z.string(), z.string())
            .optional()
            .describe("Add props to the root SVG tag"),
          titleProp: z.boolean().optional().describe("Add title prop support"),
          descProp: z
            .boolean()
            .optional()
            .describe("Add description prop support"),
          jsxRuntime: z
            .enum(["classic", "automatic", "classic-preact"])
            .optional()
            .describe("Specify a JSX runtime to use"),
          exportType: z
            .enum(["named", "default"])
            .optional()
            .describe("Specify export type (named or default)"),
        })
        .default({})
        .describe("SVGR configuration options"),
    }),
  },
  async (args) => {
    try {
      const jsCode = await convertSvgToReact(args);

      return {
        content: [
          {
            type: "text",
            text: jsCode,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error converting SVG: ${
              error instanceof Error ? error.message : error
            }`,
          },
        ],
      };
    }
  }
);

server.registerPrompt(
  "svg_to_react_native",
  {
    title: "SVG to React Native Component",
    description:
      "Convert SVG to React Native component with TypeScript and named export",
    argsSchema: {
      svg: z
        .string()
        .describe("SVG content as string or file path to SVG file"),
    },
  },
  ({ svg }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Convert the following SVG:\n\n${svg}\n\nUse the tool "convert_svg_to_react" with these options:\n- native: true\n- typescript: true\n- jsxRuntime: automatic\n- exportType: named`,
        },
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main();
