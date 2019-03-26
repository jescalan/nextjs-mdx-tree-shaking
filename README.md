# Nextjs & MDX Tree Shaking Tests

A set of tests to see how nextjs and mdx react with regard to webpack's tree shaking. In this branch I have narrowed the issue down as far as I'm able. In this branch, there are only three files - the `index` file requires only one export out of the mdx file. The mdx file `example` exports itself as a page. And the `foo` file does literally nothing, just is a page that says "hello".

In this state, the entirety of `example.mdx`'s contents are imported into `index.jsx`'s bundle. If you delete `foo.jsx`, for some reason, webpack will tree shake the unused contents from `example.mdx` from `index.jsx`'s bundle. It is beyond me why this is happening, but it is!

I added the `next-size` plugin because it allows an easy, quick check as to whether tree shaking happened by looking at the size in the CLI output, instead of booting the server. I have confirmed that this plugin doesn't have any effect on this specific issue, but it can easily be removed to confirm.

The quickest way to test, I have found, is to use `npm run build` and check the output size of `index.js` - if it's above 1kb it hasn't been tree shaken. To reproduce the issue, simply delete `foo.jsx` and build again.
