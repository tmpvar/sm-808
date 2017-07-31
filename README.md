# sm-808

This is my javascript interpretation/implementation of the [slicers/sm-808] coding challenge.

The core functionality lives in [models](models) and includes:

[Pattern](models/pattern.js)

`Pattern` is data structure that stores note state as velocity and the associated machinery
to determine if the current 'global step' matches any notes that need to be played.

[Song](models/song.js)

Instances of `Song` enable much of what you would expect in a sequencer

- global step - which is used to drives patterns
- play/pause/stop
- live BPM control via `Song#setBPM`
- some sugar for manipulating patterns

## install

```
git clone git@github.com/tmpvar/sm-808.git
cd sm-808
npm install
```

## tests

```
npm test
```

## cli example

The basic demonstration of this repo is the cli. The output from the challenge was
followed here to use as a sanity check ans I worked through the problem space.

```
node bin/four-on-the-floor.js
```

the output from this command looks something like:

![four-on-the-floor](https://user-images.githubusercontent.com/46673/28761125-72b75372-757a-11e7-9a14-0eea4db682d6.gif)

## electron example

![screen shot 2017-07-30 at 9 24 08 pm](https://user-images.githubusercontent.com/46673/28760972-48831290-7579-11e7-8152-db0192964ffe.png)

```
npm start
```
