import { MDXProvider } from '@mdx-js/tag'

export default meta => {
  const LayoutComponent = ({ children }) => {
    return (
      <MDXProvider>
        <div className='page'>
          <h1>{meta.name}</h1>
          {children}
        </div>
      </MDXProvider>
    )
  }

  return LayoutComponent
}
