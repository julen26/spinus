// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Primitive types definition
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.PrimitiveType');
goog.require('sp');

/** 
* Enum for primitive types
* @enum {number}
*/
sp.PrimitiveType = {
    POINTS : 0,
    LINES : 1,
    LINE_STRIP : 2,
    LINE_LOOP : 3,
    TRIANGLES : 4,
    TRIANGLE_STRIP : 5,
    TRIANGLE_FAN : 6
};