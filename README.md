Antithesis client
=================

[![BSD licensed](https://img.shields.io/badge/license-BSD-blue.svg)][license]

[license]: https://github.com/bibliotechie/client/blob/master/LICENSE

The Antithesis client is a browser-based tool for making annotations on
Antithesis pages. It’s a client for the [Antithesis server][service], where it
is intended to be directly embedded. It's a fork of the
[Hypothesis client][upstream]. Aside from the goal of integrating with the
Antithesis server, it's also intended to be more privacy-conscious, by removing
all third-party requests, so that all data stays on the Antithesis server.

![Screenshot of Hypothesis client](/images/screenshot.png?raw=true)

[service]: https://github.com/bibliotechie/antithesis
[upstream]: https://github.com/hypothesis/client


Development
-----------

To build the client, you need to have `make`, [Node.js][node] v6.3+, and
[Yarn][yarn] installed. If you're using Debian/Ubuntu/etc., note that while it's
likely possible to get Node.js and Yarn from the default apt repos, it's
generally not recommended, since they don't get frequent updates. Follow the
instructions on the respective sites to install them instead.

Once you have those set up, building consists of running `make app` in the top
level source directory, with the `API_URL` environment variable set to the URL
of the API root. If this is intended to be a production build, you should also
set `NODE_ENV=production`. If you're using oauth for some reason (Antithesis
doesn't support it, but h does), then you'll also need to set the
`OAUTH_CLIENT_ID` environment variable. 

To install on the Antithesis server, copy the `build/` directory as Antithesis's
`root/client/` directory. If it hasn't been set up already, you'll
also need to add the following line to the "HTML code to append to each regular
page" setting of the full Antithesis site config (it's under "Layout" on that
page):

`<script src="http://[antithesis-url]/client/boot.js"></script>`

where `[antithesis-url]` is the location you're running the Antithesis server.

[git]: https://git-scm.com/
[node]: https://nodejs.org/
[yarn]: https://yarnpkg.com/lang/en/


License
-------

The Hypothesis client is released under the [2-Clause BSD License][bsd2c],
sometimes referred to as the "Simplified BSD License". Some third-party
components are included. They are subject to their own licenses. All of the
license information can be found in the included [LICENSE][license] file.

[bsd2c]: http://www.opensource.org/licenses/BSD-2-Clause
[license]: https://github.com/hypothesis/client/blob/master/LICENSE
