var _NS = _NS || {};

_NS.BlendMode = function(srcColorFactor, dstColorFactor, colorEquation, srcAlphaFactor, dstAlphaFactor, alphaEquation) {
	this.srcColorFactor = srcColorFactor;
	this.dstColorFactor = dstColorFactor;
	this.colorEquation = colorEquation = _NS.BlendMode.Equation.Add;
	this.srcAlphaFactor = srcAlphaFactor || srcColorFactor;
	this.dstAlphaFactor = dstAlphaFactor || dstColorFactor;
	this.alphaEquation = alphaEquation || colorEquation;
};

_NS.BlendMode.Factor = {
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

_NS.BlendMode.Equation = {
    Add : 0,
    Subtract : 1,
    ReverseSubtract : 2
};

_NS.BlendMode.Alpha = new _NS.BlendMode(_NS.BlendMode.Factor.SrcAlpha, _NS.BlendMode.Factor.OneMinusSrcAlpha, _NS.BlendMode.Equation.Add,
                                        _NS.BlendMode.Factor.One, _NS.BlendMode.Factor.OneMinusSrcAlpha, _NS.BlendMode.Equation.Add);
//_NS.BlendMode.Add = new _NS.BlendMode(_NS.BlendMode.Factor.SrcAlpha, _NS.BlendMode.Factor.One, _NS.BlendMode.Equation.Add,
//                                      _NS.BlendMode.Factor.One, _NS.BlendMode.Factor.One, _NS.BlendMode.Equation.Add);
//_NS.BlendMode.Multiply = new _NS.BlendMode(_NS.BlendMode.Factor.DstColor, _NS.BlendMode.Factor.Zero, _NS.BlendMode.Equation.Add);