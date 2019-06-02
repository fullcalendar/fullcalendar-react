
4.2.0
-----
- bugfix: if `header`/`footer` were specified as object literals,
  any change to ANY of the FullCalendar component's props would trigger
  a full rerender.
- new dependency: fast-deep-equal
