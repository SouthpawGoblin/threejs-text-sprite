# threejs-text-sprite
### Function for generating multi-line text sprite for Three.js.

See the [demo page](https://southpawgoblin.github.io/threejs-text-sprite/) here, using Three.js version r107.

Inspired by [https://stemkoski.github.io/Three.js/Sprite-Text-Labels.html](https://stemkoski.github.io/Three.js/Sprite-Text-Labels.html)

## Usage
Download and include `threejs-text-sprite.js` in your page after `three.js`
```
<script src="path/to/three.min.js"></script>
<script src="path/to/threejs-text-sprite.js"></script>
```

then call `generateTextSprite` function to generate the sprite
```
var textSprite = generateTextSprite(myText, myConfig);
```

## Configuration
|property|default value|
|-|-|
|fontFace|'Ariel'|
|fontSize|18|
|fontColor|'rgba(0, 0, 0, 1)'|
|fontBold|false|
|fontItalic|false|
|textAlign|'left'|
|borderThickness|4|
|borderColor|'rgba(0, 0, 0, 1)'|
|borderRadius|0|
|backgroundColor|'rgba(255, 255, 255, 1)'|
