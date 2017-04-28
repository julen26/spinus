var sp=sp||{};sp.Sound=function(){this.callback_=this.audio_=null};sp.Sound.prototype.loadFromFile=function(a,b){this.audio_=new Audio;this.callback_=b;this.audio_.oncanplaythrough=this.handleLoadedSound.bind(this);this.audio_.src=a};sp.Sound.prototype.loadFromAudio=function(a){this.audio_=a;this.handleLoadedSound()};sp.Sound.prototype.handleLoadedSound=function(){this.callback_&&this.callback_()};sp.Sound.prototype.play=function(){this.audio_&&this.audio_.play()};
sp.Sound.prototype.pause=function(){this.audio_&&this.audio_.pause()};sp.Sound.prototype.stop=function(){this.audio_&&(this.audio_.pause(),this.setOffset(0))};sp.Sound.prototype.setLoop=function(a){this.audio_&&(this.audio_.loop=a)};sp.Sound.prototype.getLoop=function(){return this.audio_?this.audio_.loop:!1};sp.Sound.prototype.setOffset=function(a){this.audio_&&(this.audio_.currentTime=a)};sp.Sound.prototype.getOffset=function(){return this.audio_?this.audio_.currentTime:0};
sp.Sound.prototype.setSpeed=function(a){this.audio_&&(this.audio_.playbackRate=a)};sp.Sound.prototype.getSpeed=function(){return this.audio_?this.audio_.playbackRate:0};sp.Sound.prototype.setVolume=function(a){this.audio_&&(this.audio_.volume=a)};sp.Sound.prototype.getVolume=function(){return this.audio_?this.audio_.volume:0};sp.Sound.prototype.isPaused=function(){return this.audio_?this.audio_.paused:!1};sp.Sound.prototype.playOnce=function(){this.audio_&&this.audio_.cloneNode().play()};sp.extend=function(a,b){for(var c in b.prototype)b.prototype.hasOwnProperty(c)&&(a.prototype[c]=b.prototype[c]);return a.prototype};sp.Rect=function(a,b,c,d){this.x=a||0;this.y=b||0;this.w=c||0;this.h=d||0};sp.Rect.prototype.set=function(a,b,c,d){this.x=a;this.y=b;this.w=c;this.h=d};sp.Rect.prototype.equals=function(a){return this.x==a.x&&this.y==a.y&&this.w==a.w&&this.h==a.h};sp.Vector2=function(a,b){this.x=a||0;this.y=b||0};sp.Vector2.prototype.set=function(a,b){this.x=a;this.y=b};sp.Vector2.prototype.equals=function(a){return this.x==a.x&&this.y==a.y};sp.Vector2.computeNormal=function(a,b){var c=new sp.Vector2(a.y-b.y,b.x-a.x),d=Math.sqrt(c.x*c.x+c.y*c.y);0!=d&&(c.x/=d,c.y/=d);return c};sp.Vector2.dotProduct=function(a,b){return a.x*b.x+a.y*b.y};sp.Vector2.add=function(a,b){return new sp.Vector2(a.x+b.x,a.y+b.y)};
sp.Vector2.sub=function(a,b){return new sp.Vector2(a.x-b.x,a.y-b.y)};sp.Vector2.mul=function(a,b){return new sp.Vector2(a.x*b,a.y*b)};sp.Vector2.div=function(a,b){return new sp.Vector2(a.x/b,a.y/b)};sp.BlendMode=function(a,b,c,d,e,f){this.srcColorFactor=a;this.dstColorFactor=b;this.colorEquation=c=sp.BlendMode.Equation.Add;this.srcAlphaFactor=d||a;this.dstAlphaFactor=e||b;this.alphaEquation=f||c};sp.BlendMode.Factor={ZERO:0,ONE:1,SRC_COLOR:2,ONE_MINUS_SRC_COLOR:3,DST_COLOR:4,ONE_MINUS_DST_COLOR:5,SRC_ALPHA:6,ONE_MINUS_SRC_ALPHA:7,DST_ALPHA:8,ONE_MINUS_DST_ALPHA:9,SRC_ALPHA_SATURATE:10};sp.BlendMode.Equation={ADD:0,SUBTRACT:1,REVERSE_SUBTRACT:2};
sp.BlendMode.ALPHA=new sp.BlendMode(sp.BlendMode.Factor.SRC_ALPHA,sp.BlendMode.Factor.ONE_MINUS_SRC_ALPHA,sp.BlendMode.Equation.ADD,sp.BlendMode.Factor.ONE,sp.BlendMode.Factor.ONE_MINUS_SRC_ALPHA,sp.BlendMode.Equation.ADD);sp.BlendMode.ADD=new sp.BlendMode(sp.BlendMode.Factor.SRC_ALPHA,sp.BlendMode.Factor.ONE,sp.BlendMode.Equation.ADD,sp.BlendMode.Factor.ONE,sp.BlendMode.Factor.ONE,sp.BlendMode.Equation.ADD);
sp.BlendMode.MULTIPLY=new sp.BlendMode(sp.BlendMode.Factor.DST_COLOR,sp.BlendMode.Factor.ZERO,sp.BlendMode.Equation.ADD);sp.Transform=function(){this.matrix_=[];this.matrix_[0]=1;this.matrix_[4]=0;this.matrix_[8]=0;this.matrix_[12]=0;this.matrix_[1]=0;this.matrix_[5]=1;this.matrix_[9]=0;this.matrix_[13]=0;this.matrix_[2]=0;this.matrix_[6]=0;this.matrix_[10]=1;this.matrix_[14]=0;this.matrix_[3]=0;this.matrix_[7]=0;this.matrix_[11]=0;this.matrix_[15]=1};
sp.Transform.prototype.set=function(a,b,c,d,e,f,g,h,k){this.matrix_[0]=a;this.matrix_[4]=b;this.matrix_[8]=0;this.matrix_[12]=c;this.matrix_[1]=d;this.matrix_[5]=e;this.matrix_[9]=0;this.matrix_[13]=f;this.matrix_[2]=0;this.matrix_[6]=0;this.matrix_[10]=1;this.matrix_[14]=0;this.matrix_[3]=g;this.matrix_[7]=h;this.matrix_[11]=0;this.matrix_[15]=k};sp.Transform.prototype.getMatrix=function(){return this.matrix_};
sp.Transform.prototype.getInverse=function(){var a=this.matrix_[0]*(this.matrix_[15]*this.matrix_[5]-this.matrix_[7]*this.matrix_[13])-this.matrix_[1]*(this.matrix_[15]*this.matrix_[4]-this.matrix_[7]*this.matrix_[12])+this.matrix_[3]*(this.matrix_[13]*this.matrix_[4]-this.matrix_[5]*this.matrix_[12]);if(0!=a)(new sp.Transform).set((this.matrix_[15]*this.matrix_[5]-this.matrix_[7]*this.matrix_[13])/a,-(this.matrix_[15]*this.matrix_[4]-this.matrix_[7]*this.matrix_[12])/a,(this.matrix_[13]*this.matrix_[4]-
this.matrix_[5]*this.matrix_[12])/a,-(this.matrix_[15]*this.matrix_[1]-this.matrix_[3]*this.matrix_[13])/a,(this.matrix_[15]*this.matrix_[0]-this.matrix_[3]*this.matrix_[12])/a,-(this.matrix_[13]*this.matrix_[0]-this.matrix_[1]*this.matrix_[12])/a,(this.matrix_[7]*this.matrix_[1]-this.matrix_[3]*this.matrix_[5])/a,-(this.matrix_[7]*this.matrix_[0]-this.matrix_[3]*this.matrix_[4])/a,(this.matrix_[5]*this.matrix_[0]-this.matrix_[1]*this.matrix_[4])/a);else return new sp.Transform};
sp.Transform.prototype.combine=function(a){var b=this.matrix_;a=a.getMatrix();this.set(b[0]*a[0]+b[4]*a[1]+b[12]*a[3],b[0]*a[4]+b[4]*a[5]+b[12]*a[7],b[0]*a[12]+b[4]*a[13]+b[12]*a[15],b[1]*a[0]+b[5]*a[1]+b[13]*a[3],b[1]*a[4]+b[5]*a[5]+b[13]*a[7],b[1]*a[12]+b[5]*a[13]+b[13]*a[15],b[3]*a[0]+b[7]*a[1]+b[15]*a[3],b[3]*a[4]+b[7]*a[5]+b[15]*a[7],b[3]*a[12]+b[7]*a[13]+b[15]*a[15]);return this};sp.Transform.prototype.translate=function(a,b){var c=new sp.Transform;c.set(1,0,a,0,1,b,0,0,1);return this.combine(c)};
sp.Transform.prototype.scale=function(a,b){var c=new sp.Transform;c.set(a,0,0,0,b,0,0,0,1);return this.combine(c)};sp.Transform.prototype.rotate=function(a){var b=a*Math.PI/180;a=Math.cos(b);var b=Math.sin(b),c=new sp.Transform;c.set(a,-b,0,b,a,0,0,0,1);return this.combine(c)};sp.Transform.prototype.transformPoint=function(a,b){var c=new Vector2;c.set(this.matrix_[0]*a+this.matrix_[4]*b+this.matrix_[12],this.matrix_[1]*a+this.matrix_[5]*b+this.matrix_[13]);return c};sp.Transformable=function(){this.transform_=new sp.Transform;this.scale_=new sp.Vector2(1,1);this.origin_=new sp.Vector2;this.rotation_=0;this.position_=new sp.Vector2;this.needsUpdate_=!1};sp.Transformable.prototype.getTransform=function(){this.needsUpdate_&&this.updateTransform();return this.transform_};sp.Transformable.prototype.move=function(a,b){this.setPosition(this.position_.x+a,this.position_.y+b)};
sp.Transformable.prototype.scale=function(a,b){this.setScale(this.scale_.x*a,this.scale_.y*b)};sp.Transformable.prototype.rotate=function(a){this.setRotation(this.rotation_+a)};sp.Transformable.prototype.setScale=function(a,b){this.scale_.x=a;this.scale_.y=b;this.needsUpdate_=!0};sp.Transformable.prototype.setOrigin=function(a,b){this.origin_.x=a;this.origin_.y=b;this.needsUpdate_=!0};
sp.Transformable.prototype.setRotation=function(a){this.rotation_=a%360;0>this.rotation_&&(this.rotation_+=360);this.rotation_=a;this.needsUpdate_=!0};sp.Transformable.prototype.setPosition=function(a,b){this.position_.x=a;this.position_.y=b;this.needsUpdate_=!0};sp.Transformable.prototype.getScale=function(){return this.scale_};sp.Transformable.prototype.getOrigin=function(){return this.origin_};sp.Transformable.prototype.getRotation=function(){return this.rotation_};
sp.Transformable.prototype.getPosition=function(){return this.position_};sp.Transformable.prototype.updateTransform=function(){this.transform_.set(1,0,0,0,1,0,0,0,1);this.transform_.translate(this.position_.x,this.position_.y).rotate(this.rotation_).scale(this.scale_.x,this.scale_.y).translate(-this.origin_.x,-this.origin_.y)};sp.Drawable=function(){};sp.Drawable.prototype.draw=function(a,b){throw"Drawable object must implement the method: draw";};sp.Color=function(a,b,c,d){this.r=a||0;this.g=b||0;this.b=c||0;this.a=d||255};sp.Color.prototype.equals=function(a){return this.r==a.r&&this.g==a.g&&this.b==a.b&&this.a==a.a};sp.Color.prototype.getRGBAString=function(){return"rgba("+Math.floor(this.r)+","+Math.floor(this.g)+","+Math.floor(this.b)+","+this.a/255+")"};
sp.Color.prototype.getHexString=function(){var a=Math.floor(this.r).toString(16),a=1==a.length?"0"+a:a,b=Math.floor(this.g).toString(16),b=1==b.length?"0"+b:b,c=Math.floor(this.b).toString(16),c=1==c.length?"0"+c:c;return"#"+a+b+c};sp.Color.fromNormalized=function(a,b,c,d){return new sp.Color(Math.floor(255*a),Math.floor(255*b),Math.floor(255*c),Math.floor(255*d))};sp.Color.random=function(){return sp.Color.fromNormalized(Math.random(),Math.random(),Math.random(),Math.random())};
sp.Color.fromHex=function(a){return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?new sp.Color(parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)):new sp.Color};
sp.Color.fromName=function(a){return sp.Color.fromHex({aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",
darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",
gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",
lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",
oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",
silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}[a.toLowerCase()])};sp.Vertex=function(a,b,c){this.position=a||new sp.Vector2(0,0);this.color=b||new sp.Color(255,255,255);this.texCoords=c||new sp.Vector2(0,0)};sp.Vertex.prototype.set=function(a,b,c){this.position=a;this.color=b;this.texCoords=c};sp.Vertex.prototype.equals=function(a){return this.position.equals(a.position)&&this.color.equals(a.color)&&this.texCoords.equals(a.texCoords)};sp.PrimitiveType={POINTS:0,LINES:1,LINE_STRIP:2,LINE_LOOP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6};sp.VertexArray=function(a,b){this.primitiveType_=a||sp.PrimitiveType.POINTS;this.vertices_=[];b=b||0;for(var c=0;c<b;c++)this.vertices_.push(new sp.Vertex)};sp.extend(sp.VertexArray,sp.Drawable);sp.VertexArray.prototype.getVertexCount=function(){return this.vertices_.length};sp.VertexArray.prototype.getVertex=function(a){return this.vertices_[a]};sp.VertexArray.prototype.clear=function(){return this.vertices_.clear()};sp.VertexArray.prototype.addVertex=function(a){return this.vertices_.push(a)};
sp.VertexArray.prototype.resize=function(a){var b=a-this.vertices_.length;if(0<b)for(a=0;a<b;a++)this.vertices_.push(new sp.Vertex);else 0>b&&(this.vertices_=this.vertices_.slice(0,a))};sp.VertexArray.prototype.getPrimitiveType=function(){return this.primitiveType_};sp.VertexArray.prototype.setPrimitiveType=function(a){this.primitiveType_=a};sp.VertexArray.prototype.draw=function(a,b){a.drawVertices(this.vertices_,this.primitiveType_,b)};
sp.VertexArray.getPositionArray=function(a){for(var b=[],c=0;c<a.length;c++)b.push(a[c].position.x),b.push(a[c].position.y);return b};sp.VertexArray.getColorArray=function(a){for(var b=[],c=0;c<a.length;c++)b.push(a[c].color.r/255),b.push(a[c].color.g/255),b.push(a[c].color.b/255),b.push(a[c].color.a/255);return b};sp.VertexArray.getTexCoordsArray=function(a){for(var b=[],c=0;c<a.length;c++)b.push(a[c].texCoords.x),b.push(a[c].texCoords.y);return b};sp.RenderOptions=function(a,b,c,d){this.blendMode=d||sp.BlendMode.ALPHA;this.transform=a||new sp.Transform;this.texture=b;this.shader=c};sp.Shader=function(a){this.shaderProgram_=null;this.context_=a;this.uniforms_={};this.attributes_={}};sp.Shader.prototype.getShaderProgram=function(){return this.shaderProgram_};
sp.Shader.prototype.compile=function(a,b){var c=this.context_.GL();this.shaderProgram_&&c.deleteProgram(this.shaderProgram_);this.shaderProgram_=c.createProgram();if(a){var d=c.createShader(c.VERTEX_SHADER);c.shaderSource(d,a);c.compileShader(d);c.attachShader(this.shaderProgram_,d)}b&&(d=c.createShader(c.FRAGMENT_SHADER),c.shaderSource(d,b),c.compileShader(d),c.attachShader(this.shaderProgram_,d));c.linkProgram(this.shaderProgram_)};
sp.Shader.prototype.loadFromScript=function(a,b){this.context_.GL();var c=document.getElementById(a),d=document.getElementById(b);this.compile(c.text,d.text)};sp.Shader.prototype.use=function(){this.context_.GL().useProgram(this.shaderProgram_)};sp.Shader.prototype.getUniformLocation=function(a){var b=this.context_.GL();if(this.uniforms_[a])return this.uniforms_[a];this.uniforms_[a]=b.getUniformLocation(this.shaderProgram_,a);return this.uniforms_[a]};
sp.Shader.prototype.getAttribLocation=function(a){var b=this.context_.GL();if(this.attributes_[a])return this.attributes_[a];this.attributes_[a]=b.getAttribLocation(this.shaderProgram_,a);return this.attributes_[a]};sp.Shader.prototype.uniformiv=function(a,b){var c=this.context_.GL(),d=this.getUniformLocation(a),e=b.length;if(0<e&&5>e)c["uniform"+e+"iv"](d,new int32Array(b))};
sp.Shader.prototype.uniformfv=function(a,b){var c=this.context_.GL(),d=this.getUniformLocation(a),e=b.length;if(0<e&&5>e)c["uniform"+e+"fv"](d,new Float32Array(b))};sp.Shader.prototype.uniformMatrixfv=function(a,b){var c=this.context_.GL(),d=this.getUniformLocation(a),e=b.length;15<e?c.uniformMatrix4fv(d,c.FALSE,new Float32Array(b)):8<e?c.uniformMatrix3fv(d,c.FALSE,new Float32Array(b)):3<e&&c.uniformMatrix2fv(d,c.FALSE,new Float32Array(b))};
sp.DefaultShader=function(a,b){b=b||!1;var c=new sp.Shader(a);c.compile("\n#define hasTexture "+(1==b?"1":"0")+"\n\n#if hasTexture\nattribute vec2 a_texCoord;varying vec2 v_texCoord;\n#endif\nattribute vec2 a_position;attribute vec4 a_color;uniform vec2 u_resolution;uniform mat4 u_transform;uniform mat4 u_view;uniform mat4 u_projection;varying vec4 v_color;void main() {\n#if hasTexture\nv_texCoord = a_texCoord;\n#endif\ngl_Position = vec4( (u_projection * u_view * u_transform * vec4(a_position, 0, 1)).xy, 0, 1);v_color = a_color;}",
"precision mediump float;\n#define hasTexture "+(1==b?"1":"0")+"\n\n#if hasTexture\nuniform sampler2D u_image;varying vec2 v_texCoord;\n#endif\nvarying vec4 v_color;void main() {\n#if hasTexture\nvec4 tex = texture2D(u_image, v_texCoord);gl_FragColor = tex * v_color;\n#else\ngl_FragColor = v_color;\n#endif\n}");return c};sp.View=function(a,b){this.transform_=new sp.Transform;this.size_=new sp.Vector2(a||640,b||480);this.scale_=new sp.Vector2(1,1);this.rotation_=0;this.center_=new sp.Vector2(this.size_.x/2,this.size_.y/2);this.needsUpdate_=!0;this.projection_=new sp.Transform;this.projection_.set(2/this.size_.x,0,0,0,-2/this.size_.y,0,-1,1,1);this.viewport_=new sp.Rect(0,0,1,1)};sp.View.prototype.getTransform=function(){this.needsUpdate_&&this.updateTransform();return this.transform_};
sp.View.prototype.getProjection=function(){return this.projection_};sp.View.prototype.move=function(a,b){this.setCenter(this.center_.x+a,this.center_.y+b)};sp.View.prototype.scale=function(a,b){this.setScale(this.scale_.x*a,this.scale_.y*b)};sp.View.prototype.rotate=function(a){this.setRotation(this.rotation_+a)};sp.View.prototype.setScale=function(a,b){this.scale_.x=a;this.scale_.y=b;this.needsUpdate_=!0};
sp.View.prototype.setRotation=function(a){this.rotation_=a%360;0>this.rotation_&&(this.rotation_+=360);this.rotation_=a;this.needsUpdate_=!0};sp.View.prototype.setCenter=function(a,b){this.center_.x=a;this.center_.y=b;this.needsUpdate_=!0};sp.View.prototype.setViewport=function(a){this.viewport_=a};sp.View.prototype.getScale=function(){return this.scale_};sp.View.prototype.getRotation=function(){return this.rotation_};sp.View.prototype.getCenter=function(){return this.center_};
sp.View.prototype.getViewport=function(){return this.viewport_};sp.View.prototype.updateTransform=function(){this.transform_.set(1,0,0,0,1,0,0,0,1);this.transform_.rotate(this.rotation_).scale(this.scale_.x,this.scale_.y).translate(-this.center_.x,-this.center_.y)};sp.Context=function(a){this.canvas_=document.getElementById(a);this.gl_=null;if(!this.canvas_)throw"Specified canvas element is missing.";if(window.WebGLRenderingContext)this.gl_=this.canvas_.getContext("webgl")||this.canvas_.getContext("experimental-webgl");else throw"WebGL context is required and it's not supported by the browser.";if(!this.gl_)throw"Unable to initialize a valid context. Your browser may not support it.";this.viewportWidth_=this.canvas_.width;this.viewportHeight_=this.canvas_.height;
this.currentView_=this.defaultView_=new sp.View(this.viewportWidth_,this.viewportHeight_);this.defaultShader_=new sp.DefaultShader(this);this.defaultShaderTextured_=new sp.DefaultShader(this,!0);this.vertexPositionBuffer=this.gl_.createBuffer();this.vertexColorBuffer=this.gl_.createBuffer();this.vertexTexCoordsBuffer=this.gl_.createBuffer();this.gl_.viewport(0,0,this.viewportWidth_,this.viewportHeight_);this.gl_.clearColor(0,0,0,1);this.gl_.enable(this.gl_.BLEND);this.gl_.clear(this.gl_.COLOR_BUFFER_BIT)};
sp.Context.prototype.getCanvas=function(){return this.canvas_};sp.Context.prototype.GL=function(){return this.gl_};sp.Context.prototype.getViewportWidth=function(){return this.viewportWidth_};sp.Context.prototype.getViewportHeight=function(){return this.viewportHeight_};sp.Context.prototype.getView=function(){return this.currentView_};sp.Context.prototype.setView=function(a){return this.currentView_=a};sp.Context.prototype.getDefaultShader=function(){return this.defaultShader_};
sp.Context.prototype.getDefaultShaderTextured=function(){return this.defaultShaderTextured_};sp.Context.prototype.clear=function(a){a=a||new sp.Color;this.gl_.clearColor(a.r/255,a.g/255,a.b/255,a.a/255);this.gl_.clear(this.gl_.COLOR_BUFFER_BIT)};sp.Context.prototype.draw=function(a,b){a.draw(this,b||new sp.RenderOptions)};
sp.Context.prototype.drawVertices=function(a,b,c){var d=this.GL();c||(c=new sp.RenderOptions,c.shader=this.getDefaultShader());var e=c.blendMode;e||(e=sp.BlendMode.ALPHA);var f=[d.ZERO,d.ONE,d.SRC_COLOR,d.ONE_MINUS_SRC_COLOR,d.DST_COLOR,d.ONE_MINUS_DST_COLOR,d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA,d.DST_ALPHA,d.ONE_MINUS_DST_ALPHA,d.SRC_ALPHA_SATURATE],g=[d.FUNC_ADD,d.FUNC_SUBTRACT,d.FUNC_REVERSE_SUBTRACT];this.gl_.blendFuncSeparate(f[e.srcColorFactor],f[e.dstColorFactor],f[e.srcAlphaFactor],f[e.dstAlphaFactor]);
this.gl_.blendEquationSeparate(g[e.colorEquation],g[e.alphaEquation]);c.shader||(c.shader=c.texture?this.getDefaultShaderTextured():this.getDefaultShader());c.shader.use();d.bindBuffer(d.ARRAY_BUFFER,this.vertexPositionBuffer);e=sp.VertexArray.getPositionArray(a);d.bufferData(d.ARRAY_BUFFER,new Float32Array(e),d.STATIC_DRAW);d.bindBuffer(d.ARRAY_BUFFER,this.vertexColorBuffer);e=sp.VertexArray.getColorArray(a);d.bufferData(d.ARRAY_BUFFER,new Float32Array(e),d.STATIC_DRAW);d.bindBuffer(d.ARRAY_BUFFER,
this.vertexTexCoordsBuffer);e=sp.VertexArray.getTexCoordsArray(a);d.bufferData(d.ARRAY_BUFFER,new Float32Array(e),d.STATIC_DRAW);d.bindBuffer(d.ARRAY_BUFFER,this.vertexPositionBuffer);e=c.shader.getAttribLocation("a_position");d.enableVertexAttribArray(e);d.vertexAttribPointer(e,2,d.FLOAT,!1,0,0);d.bindBuffer(d.ARRAY_BUFFER,this.vertexColorBuffer);e=c.shader.getAttribLocation("a_color");d.enableVertexAttribArray(e);d.vertexAttribPointer(e,4,d.FLOAT,!1,0,0);c.texture&&(d.bindBuffer(d.ARRAY_BUFFER,
this.vertexTexCoordsBuffer),e=c.shader.getAttribLocation("a_texCoord"),d.enableVertexAttribArray(e),d.vertexAttribPointer(e,2,d.FLOAT,!1,0,0));c.shader.uniformfv("u_resolution",[this.viewportWidth_,this.viewportHeight_]);e=c.transform.getMatrix();c.shader.uniformMatrixfv("u_transform",e);e=this.currentView_.getTransform().getMatrix();c.shader.uniformMatrixfv("u_view",e);e=this.currentView_.getProjection().getMatrix();c.shader.uniformMatrixfv("u_projection",e);e=this.currentView_.getViewport();d.viewport(e.x*
this.viewportWidth_,this.viewportHeight_-(e.y+e.h)*this.viewportHeight_,e.w*this.viewportWidth_,e.h*this.viewportHeight_);c.texture&&(d.activeTexture(d.TEXTURE0),d.bindTexture(d.TEXTURE_2D,c.texture.getTextureId()));d.drawArrays([d.POINTS,d.LINES,d.LINE_STRIP,d.LINE_LOOP,d.TRIANGLES,d.TRIANGLE_STRIP,d.TRIANGLE_FAN][b],0,a.length);d.bindTexture(d.TEXTURE_2D,null)};sp.Texture=function(a,b,c,d){this.context_=a;this.smooth_=b||!1;this.repeat_=c||!1;this.forcePOT_=d||!1;this.textureId_=this.image_=null;this.size_=new sp.Vector2;this.callback_=null};sp.Texture.prototype.loadFromFile=function(a,b){this.image_=new Image;this.callback_=b;this.image_.src=a;this.image_.onload=this.handleLoadedTexture.bind(this)};sp.Texture.prototype.loadFromImage=function(a){this.image_=a;this.handleLoadedTexture()};
sp.Texture.prototype.handleLoadedTexture=function(){var a=this.context_.GL();this.size_=new sp.Vector2(this.image_.width,this.image_.height);this.textureId_=a.createTexture();a.bindTexture(a.TEXTURE_2D,this.textureId_);if(this.forcePOT_&&!this.isPowerOfTwo()){var b=document.createElement("canvas").getContext("2d");b.canvas.width=this.nextHighestPowerOfTwo(this.size_.x);b.canvas.height=this.nextHighestPowerOfTwo(this.size_.y);b.drawImage(this.image_,0,0,this.image_.width,this.image_.height);this.size_.x=
b.canvas.width;this.size_.y=b.canvas.height;this.image_=b.canvas}a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,this.image_);this.isPowerOfTwo()?(a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,this.smooth_?a.LINEAR_MIPMAP_NEAREST:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,this.repeat_?a.REPEAT:a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,this.repeat_?a.REPEAT:a.CLAMP_TO_EDGE)):(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,
this.smooth_?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),this.repeat_=!1);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,this.smooth_?a.LINEAR:a.NEAREST);a.bindTexture(a.TEXTURE_2D,null);this.callback_&&this.callback_()};sp.Texture.prototype.getTextureId=function(){return this.textureId_};sp.Texture.prototype.getSize=function(){return this.size_};
sp.Texture.prototype.setSmooth=function(a){gl.bindTexture(gl.TEXTURE_2D,this.textureId_);this.isPowerOfTwo()?gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,this.smooth_?gl.LINEAR_MIPMAP_NEAREST:gl.NEAREST):gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,this.smooth_?gl.LINEAR:gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,this.smooth_?gl.LINEAR:gl.NEAREST);this.smooth_=a};
sp.Texture.prototype.setRepeat=function(a){gl.bindTexture(gl.TEXTURE_2D,this.textureId_);this.isPowerOfTwo()?(gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,a?gl.REPEAT:gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,a?gl.REPEAT:gl.CLAMP_TO_EDGE),this.repeat_=a):(gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE),this.repeat_=!1)};
sp.Texture.prototype.isPowerOfTwo=function(){return this.size_?0==(this.size_.x&this.size_.x-1)&&0==(this.size_.y&this.size_.y-1):!1};sp.Texture.prototype.nextHighestPowerOfTwo=function(a){a--;for(var b=1;16>=b;b<<=1)a|=a>>b;return a+1};sp.Shape=function(a,b){sp.Transformable.call(this);this.outlineThickness_=0;this.outlineColor_=new sp.Color;this.vertexArray_=new sp.VertexArray(sp.PrimitiveType.TRIANGLE_FAN,a);this.outlineVertexArray_=new sp.VertexArray(sp.PrimitiveType.TRIANGLE_STRIP,2<a?2*a+2:0);this.needsTexCoordsUpdate_=this.needsColorUpdate_=this.needsUpdate_=!1;this.texture_=null;this.setTexture(b)};sp.extend(sp.Shape,sp.Transformable);sp.extend(sp.Shape,sp.Drawable);
sp.Shape.prototype.setPointCount=function(a){this.vertexArray_.resize(a);this.needsTexCoordsUpdate_=this.needsColorUpdate_=this.needsUpdate_=!0};sp.Shape.prototype.getPointCount=function(){return this.vertexArray_.getVertexCount()};sp.Shape.prototype.addPoint=function(a,b){this.vertexArray_.addVertex(sp.Vertex(a,b));this.needsTexCoordsUpdate_=this.needsColorUpdate_=this.needsUpdate_=!0};
sp.Shape.prototype.setPointPosition=function(a,b){a<this.vertexArray_.getVertexCount()&&(this.vertexArray_.getVertex(a).position=b,this.needsTexCoordsUpdate_=this.needsUpdate_=!0)};sp.Shape.prototype.setPointColor=function(a,b){a<this.vertexArray_.getVertexCount()&&(this.vertexArray_.getVertex(a).color=b)};sp.Shape.prototype.setOutlineThickness=function(a){this.outlineThickness_=a;this.needsUpdate_=!0};sp.Shape.prototype.setOutlineColor=function(a){this.outlineColor_=a;this.needsColorUpdate_=!0};
sp.Shape.prototype.updateOutlineColor=function(){for(var a=this.outlineVertexArray_.getVertexCount(),b=0;b<a;b++)this.outlineVertexArray_.getVertex(b).color=this.outlineColor_};
sp.Shape.prototype.updateOutline=function(){var a=this.vertexArray_.getVertexCount();this.outlineVertexArray_.resize(2*a+2);for(var b=0;b<a;b++){var c=this.vertexArray_.getVertex(b),d=0==b?this.vertexArray_.getVertex(a-1):this.vertexArray_.getVertex(b-1),e=b==a-1?this.vertexArray_.getVertex(0):this.vertexArray_.getVertex(b+1),d=sp.Vector2.computeNormal(d.position,c.position),e=sp.Vector2.computeNormal(c.position,e.position),f=sp.Vector2.sub(this.vertexArray_.getVertex(0).position,c.position);0<sp.Vector2.dotProduct(d,
f)&&(d.x=-d.x,d.y=-d.y);0<sp.Vector2.dotProduct(e,f)&&(e.x=-e.x,e.y=-e.y);f=1+(d.x*e.x+d.y*e.y);d=new sp.Vector2((d.x+e.x)/f,(d.y+e.y)/f);this.outlineVertexArray_.getVertex(2*b).position=c.position;this.outlineVertexArray_.getVertex(2*b+1).position=new sp.Vector2(c.position.x+d.x*this.outlineThickness_,c.position.y+d.y*this.outlineThickness_)}this.outlineVertexArray_.getVertex(2*a).position=this.outlineVertexArray_.getVertex(0).position;this.outlineVertexArray_.getVertex(2*a+1).position=this.outlineVertexArray_.getVertex(1).position};
sp.Shape.prototype.setTexture=function(a){if(this.texture_=a){this.needsTexCoordsUpdate_=!0;a=this.texture_.getSize();for(var b=0;b<this.vertexArray_.getVertexCount();b++){var c=this.vertexArray_.getVertex(b);c.texCoords=new sp.Vector2(c.position.x/a.x,c.position.y/a.y)}}};sp.Shape.prototype.getTexture=function(){return this.texture_};
sp.Shape.prototype.updateTexCoords=function(){if(this.texture_)for(var a=this.texture_.getSize(),b=0;b<this.vertexArray_.getVertexCount();b++){var c=this.vertexArray_.getVertex(b);c.texCoords=new sp.Vector2(c.position.x/a.x,c.position.y/a.y)}};
sp.Shape.prototype.draw=function(a,b){b.transform=this.getTransform();b.texture=this.texture_;this.needsTexCoordsUpdate_&&(this.updateTexCoords(),this.needsTexCoordsUpdate_=!1);this.vertexArray_.draw(a,b);0<this.outlineThickness_&&(b.texture=null,this.needsUpdate_&&(this.updateOutline(),this.needsUpdate_=!1),this.needsColorUpdate_&&(this.updateOutlineColor(),this.needsColorUpdate_=!1),this.outlineVertexArray_.draw(a,b))};sp.CircleShape=function(a,b){sp.Shape.call(this,30);this.radius_=a||0;this.update();this.setColor(b)};sp.extend(sp.CircleShape,sp.Shape);sp.CircleShape.prototype.setRadius=function(a){this.radius_=a;this.update()};sp.CircleShape.prototype.setPointCount=function(a){sp.Shape.prototype.setPointCount.call(this,a);this.update()};
sp.CircleShape.prototype.update=function(){var a=this.getPointCount();if(2<a)for(var b=2*Math.PI/a,c=0;c<a;c++){var d=b*c,d=new sp.Vector2(Math.cos(d)*this.radius_,Math.sin(d)*this.radius_);this.setPointPosition(c,d)}};sp.CircleShape.prototype.setColor=function(a){a=a||new sp.Color;for(var b=this.getPointCount(),c=0;c<b;c++)this.setPointColor(c,a)};sp.RectangleShape=function(a,b,c){sp.Shape.call(this,4);this.size_=null;this.setSize(a,b);this.setColor(c)};sp.extend(sp.RectangleShape,sp.Shape);sp.RectangleShape.prototype.setSize=function(a,b){this.size_=new sp.Vector2(a,b);this.setPointPosition(0,new sp.Vector2(0,0));this.setPointPosition(1,new sp.Vector2(a,0));this.setPointPosition(2,new sp.Vector2(a,b));this.setPointPosition(3,new sp.Vector2(0,b))};
sp.RectangleShape.prototype.setColor=function(a){a=a||new sp.Color;this.setPointColor(0,a);this.setPointColor(1,a);this.setPointColor(2,a);this.setPointColor(3,a)};sp.RectangleShape.prototype.getSize=function(){return this.size_};sp.RectangleShape.prototype.setColors=function(a,b,c,d){a=a||new sp.Color;b=b||new sp.Color;c=c||new sp.Color;d=d||new sp.Color;this.setPointColor(0,a);this.setPointColor(1,b);this.setPointColor(2,c);this.setPointColor(3,d)};sp.Sprite=function(a){sp.Transformable.call(this);this.vertexArray_=new sp.VertexArray(sp.PrimitiveType.TRIANGLE_FAN,4);this.texture_=null;this.setTexture(a)};sp.extend(sp.Sprite,sp.Transformable);sp.extend(sp.Sprite,sp.Drawable);
sp.Sprite.prototype.setTexture=function(a){if(this.texture_=a)a=this.texture_.getSize(),this.vertexArray_.getVertex(0).position=new sp.Vector2(0,0),this.vertexArray_.getVertex(1).position=new sp.Vector2(a.x,0),this.vertexArray_.getVertex(2).position=new sp.Vector2(a.x,a.y),this.vertexArray_.getVertex(3).position=new sp.Vector2(0,a.y);this.vertexArray_.getVertex(0).texCoords=new sp.Vector2(0,0);this.vertexArray_.getVertex(1).texCoords=new sp.Vector2(1,0);this.vertexArray_.getVertex(2).texCoords=new sp.Vector2(1,
1);this.vertexArray_.getVertex(3).texCoords=new sp.Vector2(0,1);this.textureRect_=new sp.Rect(0,0,1,1)};sp.Sprite.prototype.getTexture=function(){return this.texture_};
sp.Sprite.prototype.setTextureRect=function(a){if(this.texture_){var b=this.texture_.getSize();this.vertexArray_.getVertex(0).position=new sp.Vector2(0,0);this.vertexArray_.getVertex(1).position=new sp.Vector2(b.x*a.w,0);this.vertexArray_.getVertex(2).position=new sp.Vector2(b.x*a.w,b.y*a.h);this.vertexArray_.getVertex(3).position=new sp.Vector2(0,b.y*a.h)}this.textureRect_=a;this.vertexArray_.getVertex(0).texCoords=new sp.Vector2(a.x,a.y);this.vertexArray_.getVertex(1).texCoords=new sp.Vector2(a.x+
a.w,a.y);this.vertexArray_.getVertex(2).texCoords=new sp.Vector2(a.x+a.w,a.y+a.h);this.vertexArray_.getVertex(3).texCoords=new sp.Vector2(a.x,a.y+a.h)};sp.Sprite.prototype.getTextureRect=function(){return this.textureRect_};sp.Sprite.prototype.setColor=function(a){a=a||new sp.Color;this.vertexArray_.getVertex(0).color=a;this.vertexArray_.getVertex(1).color=a;this.vertexArray_.getVertex(2).color=a;this.vertexArray_.getVertex(3).color=a};
sp.Sprite.prototype.draw=function(a,b){b.transform=this.getTransform();b.texture=this.texture_;this.vertexArray_.draw(a,b)};sp.TextStyle={NORMAL:0,BOLD:1,ITALIC:2,UNDERLINE:4,STRIKETHROUGH:8};
sp.Text=function(a,b,c,d,e,f,g){sp.Transformable.call(this);this.texture_=null;this.string_="";this.width_=b||100;this.height_=c||100;this.font_=d||"Arial";this.characterSize_=e||12;this.style_=f||sp.TextStyle.NORMAL;this.color_=g||new sp.Color;this.vertexArray_=new sp.VertexArray(sp.PrimitiveType.TRIANGLE_FAN,4);this.vertexArray_.getVertex(0).texCoords=new sp.Vector2(0,0);this.vertexArray_.getVertex(1).texCoords=new sp.Vector2(1,0);this.vertexArray_.getVertex(2).texCoords=new sp.Vector2(1,1);this.vertexArray_.getVertex(3).texCoords=
new sp.Vector2(0,1);this.vertexArray_.getVertex(0).color=this.color_;this.vertexArray_.getVertex(1).color=this.color_;this.vertexArray_.getVertex(2).color=this.color_;this.vertexArray_.getVertex(3).color=this.color_;this.needsTextureUpdate_=!0;this.setString(a)};sp.extend(sp.Text,sp.Transformable);sp.extend(sp.Text,sp.Drawable);sp.Text.prototype.setString=function(a){a=a||"";a!=this.string_&&(this.string_=a,this.needsTextureUpdate_=!0)};
sp.Text.prototype.setFont=function(a){this.font_=a;this.needsTextureUpdate_=!0};sp.Text.prototype.setCharacterSize=function(a){this.characterSize_=a;this.needsTextureUpdate_=!0};sp.Text.prototype.setStyle=function(a){this.style_=a;this.needsTextureUpdate_=!0};
sp.Text.prototype.setColor=function(a){this.color_=a||new sp.Color;this.vertexArray_.getVertex(0).color=this.color_;this.vertexArray_.getVertex(1).color=this.color_;this.vertexArray_.getVertex(2).color=this.color_;this.vertexArray_.getVertex(3).color=this.color_};
sp.Text.prototype.updateTexture=function(a){var b=a.GL(),c=document.createElement("canvas").getContext("2d");if(c){c.width=this.width_;c.height=this.height_;c.canvas.width=this.width_;c.canvas.height=this.height_;c.fillStyle="#ffffff";var d=this.characterSize_+"px "+this.font_;0!=(this.style_&sp.TextStyle.BOLD)&&(d="bold "+d);0!=(this.style_&sp.TextStyle.ITALIC)&&(d="italic "+d);c.font=d;c.textBaseline="top";c.fillText(this.string_,0,0);var e=c.measureText(this.string_).width,d=this.characterSize_/
15,f;"center"==c.textAlign?(f=-e/2,e/=2):"right"==c.textAlign?(f=-e,e=0):f=0;var g;0!=(this.style_&sp.TextStyle.UNDERLINE)&&(g=this.characterSize_,c.beginPath(),c.strokeStyle=c.fillStyle,c.lineWidth=d,c.moveTo(f,g),c.lineTo(e,g),c.stroke());0!=(this.style_&sp.TextStyle.STRIKETHROUGH)&&(g=this.characterSize_/1.5,c.beginPath(),c.strokeStyle=c.fillStyle,c.lineWidth=d,c.moveTo(f,g),c.lineTo(e,g),c.stroke());this.texture_&&b.deleteTexture(this.texture_.getTextureId());this.texture_=new sp.Texture(a);this.texture_.loadFromImage(c.canvas);
a=this.texture_.getSize();this.vertexArray_.getVertex(0).position=new sp.Vector2(0,0);this.vertexArray_.getVertex(1).position=new sp.Vector2(a.x,0);this.vertexArray_.getVertex(2).position=new sp.Vector2(a.x,a.y);this.vertexArray_.getVertex(3).position=new sp.Vector2(0,a.y);this.needsTextureUpdate_=!1}};sp.Text.prototype.draw=function(a,b){this.needsTextureUpdate_&&this.updateTexture(a);this.texture_&&(b.transform=this.getTransform(),b.texture=this.texture_,this.vertexArray_.draw(a,b))};