
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
