Here a cheatsheet to remember how to test / deploy the website:

To test locally, run:
```
npm run dev
```

To build:
```
npm run build
```

Now the `dist` folder will have been created. We can test it by running:
```
npm run preview
```
Should look the same as `npm run dev`.

If everything looks fine:
```
npm run deploy
```
This will deploy the changes into the `gh-pages` branch, and the website will be updated in a few (2-3) minutes. We can check the status in the `Actions` tab in GitHub.
