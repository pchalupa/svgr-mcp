import { type Config, transform } from "@svgr/core";

export async function convertSvgToReact({
  svg,
  componentName = "MyComponent",
  options = {},
}: {
  svg: string;
  componentName?: string;
  options: Config;
}): Promise<string> {
  const plugins = ["@svgr/plugin-jsx"];

  if (options.svgo !== false) {
    plugins.unshift("@svgr/plugin-svgo");
  }

  if (options.prettier !== false) {
    plugins.push("@svgr/plugin-prettier");
  }

  return await transform(
    svg,
    {
      plugins: plugins,
      ...options,
    },
    {
      componentName,
    },
  );
}
