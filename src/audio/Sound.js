goog.provide('sp.Sound');

/**
* Constructs Sound objects
* @class Represents a Sound object
*/
sp.Sound = function() {
};

/**
* Loads the sound from file
*
* @method
* @param {string} sourcePath - Path of the sound file must be in the same domain
* @param {function} callback - Callback function
*/
sp.Sound.prototype.loadFromFile = function (sourcePath, callback) {
    this.m_audio = new Audio();
	this.m_callback = callback;
    this.m_audio.oncanplaythrough  = this.handleLoadedSound.bind(this);
    this.m_audio.src = sourcePath;
};

/**
* Loads the audio from HTML audio element
*
* @method
* @param {HTMLAudioElement} audio - HTML audio element
*/
sp.Sound.prototype.loadFromAudio = function (audio) {
    this.m_audio = audio;
    this.handleLoadedSound();
};

sp.Sound.prototype.handleLoadedSound = function () {
    if (this.m_callback) {
	   this.m_callback();
    }
};

/**
* Play the sound.
*
* @method
*/
sp.Sound.prototype.play = function () {
    if (this.m_audio) {
       this.m_audio.play();
    }
};

/**
* Pause the sound.
*
* @method
*/
sp.Sound.prototype.pause = function () {
    if (this.m_audio) {
		this.m_audio.pause();
    }
};

/**
* Stop the sound. Pauses and sets offset to zero.
*
* @method
*/
sp.Sound.prototype.stop = function () {
    if (this.m_audio) {
       this.m_audio.pause();
       this.setOffset(0);
    }
};

/**
* Enables or disables the loop.
*
* @method
* @param {bool} loop - Enable loop
*/
sp.Sound.prototype.setLoop = function (loop) {
    if (this.m_audio) {
		this.m_audio.loop = loop;
    }
};

/**
* Get whether or not loop is enabled
*
* @method
* @returns {bool} Returns whether or not loop is enabled.
*/
sp.Sound.prototype.getLoop = function () {
    if (this.m_audio) {
		return this.m_audio.loop;
    }
    return false;
};

/**
* Set current offset.
*
* @method
* @param {float} sec - Offset in seconds
*/
sp.Sound.prototype.setOffset = function (sec) {
	if (this.m_audio) {
		this.m_audio.currentTime = sec;
	}
};

/**
* Get current offset.
*
* @method
* @returns {float} Current offset in seconds
*/
sp.Sound.prototype.getOffset = function () {
    if (this.m_audio) {
       return this.m_audio.currentTime;
    }
    return 0;
};

/**
* Set the speed. It is used to generate what is known as pitch.
*
* @method
* @param {float} speed - Relative speed
*/
sp.Sound.prototype.setSpeed = function (speed) {
    if (this.m_audio) {
       this.m_audio.playbackRate = speed;
    }
};

/**
* Get the speed.
*
* @method
* @returns {float} Current speed
*/
sp.Sound.prototype.getSpeed = function () {
    if (this.m_audio) {
       return this.m_audio.playbackRate;
    }
    return 0;
};

/**
* Set the volume.
*
* @method
* @param {float} volume - Relative volume
*/
sp.Sound.prototype.setVolume = function (volume) {
    if (this.m_audio) {
       this.m_audio.volume = volume;
    }
};

/**
* Get the volume.
*
* @method
* @returns {float} Current volume
*/
sp.Sound.prototype.getVolume = function () {
    if (this.m_audio) {
       return this.m_audio.volume;
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
    if (this.m_audio) {
       return this.m_audio.paused;
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
    if (this.m_audio) {
        var audio = this.m_audio.cloneNode();
        audio.play();
    }
};