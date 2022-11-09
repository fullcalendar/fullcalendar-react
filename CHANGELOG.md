
v5.11.1 (2022-04-20)
--------------------
FIX: restore accidentally-removed support for React 17 (#182)


v5.11.0 (2022-04-08)
--------------------

- support for React 18
- fix CalendarContent crashes when suspended in concurrent mode (#177)


v5.4.0 (2020-11-11)
-------------------

- react 17 support
- better compatibility with Webpack 5, deeming `resolve.fullySpecified` unnecessary ([core-5822])
- dist files now include a CJS file. ESM is still used by default in most environments ([core-5929])

[core-5822]: https://github.com/fullcalendar/fullcalendar/issues/5822
[core-5929]: https://github.com/fullcalendar/fullcalendar/issues/5929


...
... this changelog does not mention all releases.
... visit the github releases page as well as the main fullcalendar repo.
...


v5.2.0 (2020-07-30)
-------------------

bugfix: dayMinWidth causes error "NowTimer(...): Nothing was returned from render..." (#80)


4.2.0 (2019-06-02)
------------------

- bugfix: if `header`/`footer` were specified as object literals,
  any change to ANY of the FullCalendar component's props would trigger
  a full rerender.
- new dependency: fast-deep-equal
  automatically bundled with UMD dist
