goog.provide('sp.BlendMode');

sp.BlendMode = function(srcColorFactor, dstColorFactor, colorEquation, srcAlphaFactor, dstAlphaFactor, alphaEquation) {
	this.srcColorFactor = srcColorFactor;
	this.dstColorFactor = dstColorFactor;
	this.colorEquation = colorEquation = sp.BlendMode.Equation.Add;
	this.srcAlphaFactor = srcAlphaFactor || srcColorFactor;
	this.dstAlphaFactor = dstAlphaFactor || dstColorFactor;
	this.alphaEquation = alphaEquation || colorEquation;
};

sp.BlendMode.Factor = {
    Zero : 0,
    One : 1,
    SrcColor : 2,
    OneMinusSrcColor : 3,
    DstColor : 4,
    OneMinusDstColor : 5,
    SrcAlpha : 6,
    OneMinusSrcAlpha : 7,
    DstAlpha : 8,
    OneMinusDstAlpha : 9,
    SrcAlphaSaturate : 10
};

sp.BlendMode.Equation = {
    Add : 0,
    Subtract : 1,
    ReverseSubtract : 2
};

//Predefined blend modes assuming that alpha is not premultiplied
sp.BlendMode.Alpha = new sp.BlendMode(sp.BlendMode.Factor.SrcAlpha, sp.BlendMode.Factor.OneMinusSrcAlpha, sp.BlendMode.Equation.Add,
                                        sp.BlendMode.Factor.One, sp.BlendMode.Factor.OneMinusSrcAlpha, sp.BlendMode.Equation.Add);
sp.BlendMode.Add = new sp.BlendMode(sp.BlendMode.Factor.SrcAlpha, sp.BlendMode.Factor.One, sp.BlendMode.Equation.Add,
                                      sp.BlendMode.Factor.One, sp.BlendMode.Factor.One, sp.BlendMode.Equation.Add);
sp.BlendMode.Multiply = new sp.BlendMode(sp.BlendMode.Factor.DstColor, sp.BlendMode.Factor.Zero, sp.BlendMode.Equation.Add);