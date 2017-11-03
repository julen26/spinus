// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Mouse class imlpementation
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.Mouse');
goog.require('sp');
goog.require('sp.Vector2');

sp.Mouse = {
    pressed_ : [],
    position_ : new sp.Vector2()
};

sp.Mouse.isButtonPressed = function (key) {
    return !!sp.Mouse.pressed_[key];
};

sp.Mouse.pressButton = function (key) {
    sp.Mouse.pressed_[key] = true;
};

sp.Mouse.releaseButton = function (key) {
    sp.Mouse.pressed_[key] = false;
};

sp.Mouse.getPosition = function () {
    return position_;
};


/** 
* Enum for keys
* @enum {number}
*/
sp.Mouse.Button = {
    LEFT : 0,
    MIDDLE : 1,
    RIGHT : 2
};

window.addEventListener('mousedown', function(event) {
    sp.Mouse.pressButton(event.button);
});
window.addEventListener('mouseup', function(event) {
    sp.Mouse.releaseButton(event.button);
});
window.addEventListener('mousemove', function(event) {
    sp.Mouse.position_.x = event.clientX;
    sp.Mouse.position_.y = event.clientY;
});
