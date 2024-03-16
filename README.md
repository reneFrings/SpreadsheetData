# What you can do with this class?

Load data from a google spreadsheet and get the data as an object array.

![spreadsheet](https://user-images.githubusercontent.com/62351899/141842148-5f5f884b-b277-4d47-b722-16e71416161c.jpg)

# Usage

```
    /** Create an instance and pass your google api key, spreadsheet id and sheet name. */
    const movieData = new SpreadsheetData(
        'your apiKey',
        'spreadsheet id',
        'sheet name'
    );

    /** Load data */
    movieData.load.then((data) => console.table(data));
```

## Result

# Please first share the spreadsheet so that anyone who has the link can open it.

![spreadsheet-share](https://user-images.githubusercontent.com/62351899/142073193-6606a6a6-30cd-4b23-a30a-a754804d7bcd.jpg)

![link-aendern](https://user-images.githubusercontent.com/62351899/142073239-ba39baa8-1b5e-4776-9c37-f87f59c76e43.jpg)

![link-bestaetigen](https://user-images.githubusercontent.com/62351899/142073265-2de2dce2-145c-460e-8580-29705668ab2c.jpg)

# Sheet ID - You can find the ID

# Tested for

## Windows 10 Desktop

- Chrome
