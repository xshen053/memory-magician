# Bug 1


after running `amplify publish`, not able to visit the website

## solution

`
 Yes, I tried to make react app by Getting started document.
When I executed 'amplify init', Prompt listens to me 'default' is 'build'. But　Infact, the name of distribution folder was 'dist'.
This was cause of the error.

So I guessed that correct name is 'dist'.
`

after generate a file
run `npm run build` to generate `dist` directory

and before run `amplify publish`, run `amplify configure project`, and configure

`distribute diretory` to `dist`

it works then

# Bug 2

cannot load sources in ios when using ngrok



## Solution

> need to add a header 

Frontend side

in each `axios`, add this header

```Javascript
  function fetchTodaysMemories() {
    axios
      .get("https://9d50-66-160-179-28.ngrok-free.app/api/memory/", {
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
```

Backend side

in `settings.py`

```py
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'ngrok-skip-browser-warning',  # Add your custom header here
]
```
