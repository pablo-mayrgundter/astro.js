require('esbuild').build({
  entryPoints: ['src/Orbit.js'],
  minify: false,
  // https://esbuild.github.io/api/#keep-names
  // We use code identifiers e.g. in ItemProperties for their names
  keepNames: true,
  // Splitting
  // Entry points (our src/index.jsx) are currently not named with
  // cache-busting segments, like index-x84nfi.js, so we should be
  // careful with our caching, i.e. not putting much index.jsx.
  // See:
  //   https://esbuild.github.io/api/#chunk-names
  //   https://github.com/evanw/esbuild/issues/16
  splitting: false,
  format: 'esm',
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
  bundle: true,
  outfile: 'dist/astro.min.js',
}).catch(() => process.exit(1))
