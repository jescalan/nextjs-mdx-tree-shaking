# Website Template

This repository contains a generic template for creating a new website
based on the standard platform used by HashiCorp.

## Documentation

### Install

To setup a new website, copy and paste this entire repository anywhere
in your project. This can be the root for a website-focused project, can be
the `website/` subdirectory, etc.

**Please copy only tagged releases, such as `v0.1.0`.**

After the site is copied, you can run `make website` (Docker) or
`make website-local` (faster, if you have Node installed locally) and
visit `http://localhost:3000` to see your website up and running!

You're ready to begin working on content! See the rest of the documentation
for how to author content as well as how to setup production deployment.

### Deploy

Websites can be configured to deploy in one or more ways:

  * **Manually** - This requires manually clicking a deploy button
    on Netlify.com. This is usefulf or humans.

  * **On Git Push** - This will automatically deploy the website anytime
    you push to a configured Git branch. This is useful for patterns such
    as having a `stable-website` branch outside of `master`.

  * **Webhook** - This will give you one or more URLs to `GET` to trigger
    a deploy. No auth is required, the URL is security through obscurity.
	This is useful for other automation systems, such as CI.

The methods for deployment are all configured via the Terraform automation,
explained in the next section.

#### Initial Setup

When you're ready to deploy your website publicly, you'll have to start
by configuring all the services that our platform uses, such as Netlify.
We've automated this with [Terraform](https://www.terraform.io/).

Copy the `terraform.tfvars.example` file to `terraform.tfvars` in this folder
and change the settings that are there. They should be documented with
comments.

Set the following environment variables for auth:

  * `GITHUB_TOKEN` - This should be a valid GitHub access token with `repo`
    access to the repository with your website. You can
	[create tokens here](https://github.com/settings/tokens).

  * `NETLIFY_TOKEN` - This should be a valid Netlify personal access token.
    You can [create a personal access token here](https://app.netlify.com/account/applications).

Then run `make terraform`. This will create and configure the website and
the outputs from Terraform will show where you can view the website, view
deploy progress, and more.

You shouldn't have to run Terraform again unless noted otherwise.

#### Teardown/Destroy

**To destroy your website,** run `terraform destroy`. This will remove all
Netlify configuration, delete deployment keys, and more.

### Local Development

You can develop the website locally with hot-reloading content and styles.
There are two options for local development:

`make website` will launch the local development website within Docker
(must have Docker for Mac, Windows, etc. installed). The benefit is that
you ONLY need Docker, and no other dependencies. The downside is that this
approach is slightly slower. The bootup time will be a minute or two, but
after that you will get hot-reloading and development will be fast.

`make website-local` will launch the local development website locally
on your machine. The only dependency is that you have [Node](https://nodejs.org/en/)
installed. This is much faster both to startup and reload.

In either scenario, you can **visit the local website at `http://localhost:3000`**.
When you modify content, the website should automatically reload, you do not
have to stop and restart the development environment.

### Creating Content

#### Pages

To create a page, create a Markdown (`mdx`), TypeScript (`tsx` or `ts`),
or JavaScript (`jsx` or `js`) file in the `pages/` directory. The path to
the file will also be the URL to the page.

Markdown files can be used for mostly static, text-based content. You can
read the documentation for that in the [Markdown section](#).

TypeScript and JavaScript files enable more complex behavior, data querying,
and more. These should be used for layout files, dynamic pages, etc.
For TypeScript or JavaScript files, the defaut ES6 export should be a
React Component. This will be rendered for the page. More documentation
can be found on the [Next.js website](https://nextjs.org/docs/#fetching-data-and-component-lifecycle).
Example:

```typescript
import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
      <div>
        Hello World {this.props.userAgent}
      </div>
    )
  }
}
```

#### Markdown

HashiCorp websites use Markdown as their primary content language. To create
a new page with Markdown, create a file ending in `.mdx` in the `pages/`
directory. The path in the pages directory will be the URL route. For example,
`pages/hello/world.mdx` will be served from the `/hello/world` URL.

This file can be standard Markdown and also supports
[YAML frontmatter](https://middlemanapp.com/basics/frontmatter/).
YAML frontmatter is optional, there are defaults for all keys.

```yaml
---
layout: "custom"
title: "My Title"
---
```

The significant keys in the YAML frontmatter are:

  * `layout` `(string)` - This is the name of the layout file to wrap the
    Markdown page with.
  * `title` `(string)` - This is the title of the page that will be set
    in the HTML title.
