// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Sound class imlpementation
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.Sound');
goog.require('sp');

/**
* Constructs Sound objects
* @class Represents a Sound object
*/
sp.Sound = function() {
    /** @private */
    this.audio_ = null;

    /** @private */
    this.callback_ = null;
};

/**
* Loads the sound from file
*
* @method
* @param {string} sourcePath Path of the sound file must be in the same domain
* @param {function} callback Callback function
*/
sp.Sound.prototype.loadFromFile = function (sourcePath, callback) {
    this.audio_ = new Audio();
	this.callback_ = callback;
    this.audio_.oncanplaythrough  = this.handleLoadedSound.bind(this);
    this.audio_.src = sourcePath;
};

/**
* Loads the audio from HTML audio element
*
* @method
* @param {HTMLAudioElement} audio HTML audio element
*/
sp.Sound.prototype.loadFromAudio = function (audio) {
    this.audio_ = audio;
    this.handleLoadedSound();
};

/** @private */
sp.Sound.prototype.handleLoadedSound = function () {
    if (this.callback_) {
	   this.callback_();
    }
};

/**
* Play the sound.
*
* @method
*/
sp.Sound.prototype.play = function () {
    if (this.audio_) {
       this.audio_.play();
    }
};

/**
* Pause the sound.
*
* @method
*/
sp.Sound.prototype.pause = function () {
    if (this.audio_) {
		this.audio_.pause();
    }
};

/**
* Stop the sound. Pauses and sets offset to zero.
*
* @method
*/
sp.Sound.prototype.stop = function () {
    if (this.audio_) {
       this.audio_.pause();
       this.setOffset(0);
    }
};

/**
* Enables or disables the loop.
*
* @method
* @param {bool} loop Enable loop
*/
sp.Sound.prototype.setLoop = function (loop) {
    if (this.audio_) {
		this.audio_.loop = loop;
    }
};

/**
* Get whether or not loop is enabled
*
* @method
* @returns {bool} Returns whether or not loop is enabled.
*/
sp.Sound.prototype.getLoop = function () {
    if (this.audio_) {
		return this.audio_.loop;
    }
    return false;
};

/**
* Set current offset.
*
* @method
* @param {float} sec Offset in seconds
*/
sp.Sound.prototype.setOffset = function (sec) {
	if (this.audio_) {
		this.audio_.currentTime = sec;
	}
};

/**
* Get current offset.
*
* @method
* @returns {float} Current offset in seconds
*/
sp.Sound.prototype.getOffset = function () {
    if (this.audio_) {
       return this.audio_.currentTime;
    }
    return 0;
};

/**
* Set the speed. It is used to generate what is known as pitch.
*
* @method
* @param {float} speed Relative speed
*/
sp.Sound.prototype.setSpeed = function (speed) {
    if (this.audio_) {
       this.audio_.playbackRate = speed;
    }
};

/**
* Get the speed.
*
* @method
* @returns {float} Current speed
*/
sp.Sound.prototype.getSpeed = function () {
    if (this.audio_) {
       return this.audio_.playbackRate;
    }
    return 0;
};

/**
* Set the volume.
*
* @method
* @param {float} volume Relative volume
*/
sp.Sound.prototype.setVolume = function (volume) {
    if (this.audio_) {
       this.audio_.volume = volume;
    }
};

/**
* Get the volume.
*
* @method
* @returns {float} Current volume
*/
sp.Sound.prototype.getVolume = function () {
    if (this.audio_) {
       return this.audio_.volume;
    }
    return 0;
};

/**
* Checks whether or not sound is paused.
*
* @method
* @returns {bool} True if sound is not playing
*/
sp.Sound.prototype.isPaused = function () {
    if (this.audio_) {
       return this.audio_.paused;
    }
    return false;
};

/**
* Plays sound once even if another sound is being played.
* Internally it clones the audio element, and plays it once.
*
* @method
*/
sp.Sound.prototype.playOnce = function () {
    if (this.audio_) {
        var audio = this.audio_.cloneNode();
        audio.play();
    }
};