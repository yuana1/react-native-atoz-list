This package is just a fork of the work of brentvatne: https://github.com/brentvatne/fixed-height-windowed-list-view-experiment

I fixed some issues with the scrolling not working correctly and exposed the main listview component as AtoZList.
The scroll performance is great for large lists which is why I switched to using brentvatne's implementation.

## IMPORTANT
sometimes setTimeout function won't work well(delay more than we set).You can use [react-native-background-timer](https://www.npmjs.com/package/react-native-background-timer) instead of built-in setTimeout.
```js
import BackgroundTimer from 'react-native-background-timer';
global.setTimeout = BackgroundTimer.setTimeout;
global.clearTimeout = BackgroundTimer.clearTimeout;
global.setInterval = BackgroundTimer.setInterval;
global.clearInterval = BackgroundTimer.clearInterval;
```

![Alt text](http://i.imgur.com/8JPUnt5.gif "Example")

## Install
```js
yarn add https://github.com/yuana1/react-native-atoz-list.git
```

## Usage

```js
import AtoZList from 'react-native-atoz-list';

..
...

let myData = {
    'A': [{..}, {...}, {...}],
    'B': [{..}, {..}, {..}],
    'C': [{..}, {..}, {..}]
}

render(
    return(
        <AtoZList
                sectionHeaderHeight={20}
                cellHeight={60}
                data={myData}
                renderCell={this._renderCellComponent}
                renderSection={this._renderSectionComponent}
        />
    );


);

```

## Props
Note: You need to set the section height and cellHeight.sectionHeaderHeight and cellHeight must equal to the height value of renderSection and renderCell


| property        | Description           |
| ------------- |-------------|
| sectionHeaderHeight      | The height of each header section |
| cellHeight      | The height of each cellheightred      |
| data            | The data that will be displayed. This should be an object in the format  { 'A': [{..}, {..}], 'B': [{..}]} |
| renderCell | This function will render you cell componenet. It will be passed the objects from each element in the data arrays.      |
| renderSection | This function will render your section headers. It will be passed an object with key 'sectionId'. The value of 'sectionId' will be the keys from your data object. i.e 'A', 'B', 'C' etc..      |
| onEndReached | Called when all rows have been rendered and the list has been scrolled to within onEndReachedThreshold of the bottom. The native scroll event is provided. |
| alphabetContainerStyle | The style of alphabet container |
| renderLetters | This function will render you letters componenet. |
| initialNumToRender | The number of initial render.Default 20 |

## Authors

Raheel Govindji <rgovindji@gmail.com>
brentvatne https://github.com/brentvatne
