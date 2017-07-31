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

You'll want to have git and Node 6+ installed and then run the following command:

```
git clone git@github.com:tmpvar/sm-808.git
cd sm-808
npm install
```

## tests

There are some tests that cover the core behavior of the step sequencer in [test/](test)

These tests can be run via the following command:

```
npm test
```

## cli example

The basic demonstration of this repo is the cli. The gif in the challenge was
followed here as a sanity check as I worked through the problem space.

```
node bin/four-on-the-floor.js
```

the output from this command looks something like:

![four-on-the-floor](https://user-images.githubusercontent.com/46673/28761125-72b75372-757a-11e7-9a14-0eea4db682d6.gif)

## electron example

I attempted to mimic some of the stylings of the Roland TR-808.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Roland_TR-808_%28large%29.jpg/1024px-Roland_TR-808_%28large%29.jpg)

While attempting

![screen shot 2017-07-30 at 9 24 08 pm](https://user-images.githubusercontent.com/46673/28760972-48831290-7579-11e7-8152-db0192964ffe.png)

Run the following command in the `sm-808` folder to check out the electron app!

```
npm start
```
