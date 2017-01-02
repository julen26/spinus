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

sp.Sound.prototype.loadFromAudio = function (audio) {
    this.m_audio = audio;
    this.handleLoadedSound();
};

sp.Sound.prototype.handleLoadedSound = function () {
    if (this.m_callback) {
	   this.m_callback();
    }
};

sp.Sound.prototype.play = function () {
    if (this.m_audio) {
       this.m_audio.play();
    }
};

sp.Sound.prototype.pause = function () {
    if (this.m_audio) {
       this.m_audio.pause();
    }
};

sp.Sound.prototype.stop = function () {
    if (this.m_audio) {
       this.m_audio.pause();
       this.setOffset(0);
    }
};

sp.Sound.prototype.setLoop = function (loop) {
    if (this.m_audio) {
       this.m_audio.loop = loop;
    }
};

sp.Sound.prototype.getLoop = function () {
    if (this.m_audio) {
       return this.m_audio.loop;
    }
    return false;
};

sp.Sound.prototype.setOffset = function (sec) {
    if (this.m_audio) {
       this.m_audio.currentTime = sec;
    }
};

sp.Sound.prototype.getOffset = function () {
    if (this.m_audio) {
       return this.m_audio.currentTime;
    }
    return 0;
};

sp.Sound.prototype.setSpeed = function (speed) {
    if (this.m_audio) {
       this.m_audio.playbackRate = speed;
    }
};

sp.Sound.prototype.getSpeed = function () {
    if (this.m_audio) {
       return this.m_audio.playbackRate;
    }
    return 0;
};

sp.Sound.prototype.setVolume = function (volume) {
    if (this.m_audio) {
       this.m_audio.volume = volume;
    }
};

sp.Sound.prototype.getVolume = function () {
    if (this.m_audio) {
       return this.m_audio.volume;
    }
    return 0;
};

sp.Sound.prototype.isPaused = function () {
    if (this.m_audio) {
       return this.m_audio.paused;
    }
    return false;
};

sp.Sound.prototype.playOnce = function () {
    if (this.m_audio) {
        var audio = this.m_audio.cloneNode();
        audio.play();
    }
};