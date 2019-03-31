
For deployment, run something like this:

```bash
./scripts/version 9.9.9 # build and stage the release
./scripts/publish 9.9.9 # publish to verdaccio (local npm server)
./scripts/publish 9.9.9 --production # publish to npm, push to github
```

Will create a detached+tagged release commit.
