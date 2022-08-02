import fs from "fs";
import path from "path";

import batchPackages from "@lerna/batch-packages";
import { getPackages } from "@lerna/project";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

import autoExternal from "rollup-plugin-auto-external";
import typescript from "rollup-plugin-typescript2";
import sourcemaps from "rollup-plugin-sourcemaps";
import { uglify } from "rollup-plugin-uglify";

import sizes from "@atomico/rollup-plugin-sizes";

async function getSortedPackages() {
  const packages = await getPackages(__dirname);

  return batchPackages(packages).reduce((arr, batch) => arr.concat(batch), []);
}

async function build() {
  const config = [];

  const packages = await getSortedPackages();

  packages.forEach((pkg) => {
    const basePath = path.relative(__dirname, pkg.location);
    const input = path.join(basePath, "src/index.ts");
    const { name, main, umd, module } = pkg.toJSON();

    const basePlugins = [
      
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      sizes(),
      uglify({ mangle: { toplevel: true } }),
      sourcemaps(),
    ];

    config.push({
      input,
      output: [
        {
          name,
          file: path.join(basePath, main),
          format: "cjs",
          sourcemap: true,
          exports: "auto",
        },
        {
          name,
          file: path.join(basePath, module),
          format: "es",
          sourcemap: true,
        },
      ],
      plugins: [
        autoExternal({
          packagePath: path.join(basePath, "package.json"),
        }),
        ...basePlugins,
        typescript({
          useTsconfigDeclarationDir: true,
          clean: true,
          tsconfig: fs.existsSync(`${basePath}/tsconfig.json`)
            ? `${basePath}/tsconfig.json`
            : "tsconfig.json",
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
              declarationDir: basePath + "/dist/packages/",
              paths: {
                "@/*": ["packages/*/src"],
              },
            },
            include: [`packages/${name.replace("@/", "")}/src/*`],
          },
        }),
      ],
    });
  });

  return config;
}

export default build;
