﻿
function getInt(e) {
    return Math.floor(Math.random() * 1e5) % e
}

function distanceBetweenPoints(e, t, n, r) {
    return Math.sqrt((e - n) * (e - n) + (t - r) * (t - r))
}

function removeClip(e) {
    if (e && e.parent)
        e.parent.removeChild(e)
}

function cjp(e, t) {
    return new createjs.Point(e, t)
}

function createSpriteFromSpritesheet(e) {
    var t = new createjs.Sprite(App.game.atlas, e);
    t.gotoAndStop(e);
    t.framerate = 30;
    return t
}

function addChild(e, t) {
    t.addChild(e)
}

function createBitmap(e) {
    var t = new createjs.Bitmap(App.game.preloader.loader.getResult(e));
    return t
}

function limitDt(e) {
    return e
}

function limit(e, t, n) {
    if (e < t)
        e = t;
    if (e > n)
        e = n;
    return e
}

function lerp(e, t, n) {
    return e + n * (t - e)
}

function lerpAngle(e, t, n) {
    var r = Math.abs(t - e);
    if (r > 180) {
        if (t > e)
            e += 360;
        else
            t += 360
    }
    var i = e + (t - e) * n;
    return normalizeAngle(i)
}

function normalizeAngle(e, t, n) {
    if (typeof t === "undefined") {
        t = 0
    }
    if (typeof n === "undefined") {
        n = 360
    }
    while (e > n)
        e -= 360;
    while (e < t)
        e += 360;
    return e
}

function sign(e) {
    return e > 0 ? 1 : -1
}

function rotatePoint(e, t) {
    t *= Math.PI / 180;
    var n = Math.sin(t);
    var r = Math.cos(t);
    var i = e.x * r - e.y * n;
    var s = e.x * n + e.y * r;
    e.x = i;
    e.y = s
}

function createAnimation(e, t, n, r, i, s, o) {
    if (typeof i === "undefined") {
        i = 1
    }
    if (typeof s === "undefined") {
        s = null
    }
    if (typeof o === "undefined") {
        o = 0
    }
    var u = [];
    for (var a = n; a <= r; ++a) {
        var f = spriteSheetInfo.animations[t + (a <= 9 ? "000" : "00") + a][0];
        if (f == undefined || f == null || isNaN(f))
            console.log("ERROR");
        var l = 1 + (a == r ? o : 0);
        for (var c = 0; c < l; ++c)
            u.push(f)
    }
    spriteSheetInfo.animations[e] = {
        frames: u,
        next: s ? s : e,
        speed: i
    }
}

function createFontFrames(e) {
    var t = "abcdefghijklmnopqrstuvwxyz1234567890!-./:%";
    for (var n = 0; n < t.length; ++n) {
        var r = t.charCodeAt(n);
        var i = t.charAt(n);
        if (e.animations[r.toString()])
            e.animations[i] = e.animations[i.toUpperCase()] = e.animations[r.toString()]
    }
}

function getTextSize(e) {
    var t = e.text.length;
    var n = e.letterSpacing;
    var r = 0;
    var i = 0;
    for (var s = 0; s < t; ++s) {
        var o = e.text.charAt(s);
        var u = e._getFrame(o, e.spriteSheet);
        if (o == " ")
            r += e.spaceWidth;
        else {
            i = Math.max(i, u.rect.height);
            r += u.rect.width + (s == 0 ? 0 : n)
        }
    }
    textSize.x = r;
    textSize.y = i;
    return textSize
}

function traceChildren(e, t) {
    if (typeof t === "undefined") {
        t = 0
    }
    var n = e.getBounds();
    var r = e instanceof createjs.Container ? e : null;
    console.log(t, e.x, e.y, n ? n.width : "null", n ? n.height : "null", r != null);
    if (Math.abs(e.x) > 2e3 || Math.abs(e.y) > 2e3)
        console.log("error!");
    if (r) {
        for (var i = 0; i < r.getNumChildren(); ++i)
            traceChildren(r.getChildAt(i), t + 1)
    }
}

function touchHandlerDummy(e) {
    //e.preventDefault();
    return false
}

function getButtonAnimation(e) {
    var t = new AnimatedNode(App.game.animationManager.getAnimation("buttons anim"), 1 / 30, new SingleFlameSelector(e));
    t.addAction(t.totalFrames - 1, 0);
    return t
}

function isOrientationLocked() {
    if (!viewporter || !viewporter.ACTIVE) {
        return false
    }
    var e = window.innerWidth > window.innerHeight && window.innerWidth <= 640;
    return e || viewporter.isLandscape()
}
var DESIGN_FPS = 60;
var CACHE_ENABLED = false;
var ANIM_SCALE = 1.5 * 59 / 60;
var apiInstance;
var splashScreenData;
var textSize = new createjs.Point;
var spriteSheetInfo;
var jellyAnimation = [
    [0, 0, 1, 1, 0, 0],
    [0, -.2, .990325927734375, 1.0163421630859375, 0, 0],
    [0, -.85, .9597015380859375, 1.0679931640625, 0, 0],
    [0, -2, .90777587890625, 1.1556243896484375, 0, 0],
    [0, -3.45, .839111328125, 1.271484375, 0, 0],
    [0, -5.05, .7647552490234375, 1.3969268798828125, 0, 0],
    [0, -6.5, .6983184814453125, 1.5090484619140625, 0, 0],
    [0, -7.55, .6492462158203125, 1.591827392578125, 0, 0],
    [0, -8.15, .6207122802734375, 1.639984130859375, 0, 0],
    [0, -8.25, .611724853515625, 1.6551513671875, 0, 0],
    [],
    [0, 0, 1, 1, 0, 0],
    [4.6, 4.65, 1.26666259765625, .8162329058533069, 10.772172752407087, 0],
    [9.2, 9.25, 1.5333251953125, .6334487873339344, 21.620468223663323, 0],
    [1.4, 5.8, 1.357635498046875, .7792788568603103, 4.05452351570284, 0],
    [-6.45, 2.35, 1.1819305419921875, .925467115184136, -13.191458606259076, 0],
    [-3.2, -.95, 1.01348876953125, 1.0567754423261255, -6.526565175237877, 0],
    [0, -4.25, .8450469970703125, 1.1888885498046875, 0, 0],
    [3.1, -2.7, .916717529296875, 1.1285485952784342, 4.535063497453464, 0],
    [6.15, -1.2, .9883880615234375, 1.0687622833051502, 9.273376151585296, 0],
    [4.15, .75, 1.0811309814453125, .9769953841175838, 6.047881985238391, 0],
    [2.05, 2.75, 1.17388916015625, .8857241411063542, 3.0237858101727397, 0],
    [0, 4.65, 1.26666259765625, .7944488525390625, 0, 0],
    [-1.05, 3.6, 1.2183380126953125, .8434575932408014, -2.2819930520332434, 0],
    [-2.1, 2.5, 1.1699981689453125, .8924740830067877, -4.7535541622246456, 0],
    [-3.15, 1.45, 1.1216888427734375, .9418679675355531, -7.136990075539856, 0],
    [-2.15, .4, 1.0753631591796875, .9839297937141035, -4.753827686686492, 0],
    [-1.05, -.6, 1.029022216796875, 1.0264039447029814, -2.2833587267059414, 0],
    [0, -1.6, .982696533203125, 1.0688934326171875, 0, 0],
    [.35, -1.4, .98492431640625, 1.0602445053925167, .76441515641352, 0],
    [.65, -1.15, .9871673583984375, 1.0516431573527776, 1.527337074008301, 0],
    [1, -1, .9893951416015625, 1.0431331771009533, 2.416159750495339, 0],
    [.8, -.8, .99151611328125, 1.0343828507167612, 1.7963521419677733, 0],
    [.6, -.6, .994110107421875, 1.0238889971616911, 1.274073376721887, 0],
    [.3, -.3, .996612548828125, 1.013729485673602, .7555049507628127, 0],
    [.15, -.15, .9985198974609375, 1.005977596469548, .27288878198426403, 0],
    [.05, -.05, .9996490478515625, 1.0014191343430145, .020952607033734694, 0],
    [0, 0, 1, 1, 0, 0],
    [],
    [0, 0, 1, 1, 0, 0],
    [-3.1, 4.7, 1.2722930908203125, .8187573190593543, -12.296938381755353, 0],
    [-6.05, 9.25, 1.5333251953125, .6460869700694191, -24.292097544945918, 0],
    [-3.4, 7.5, 1.4423065185546875, .7204993841632751, -13.813460697163393, 0],
    [4.45, 2.35, 1.1819305419921875, .9355071077774614, 15.599698062593149, 0],
    [1.1, -2.6, .9299468994140625, 1.124781958325034, 3.7958751937056974, 0],
    [0, -4.25, .8450469970703125, 1.1888885498046875, 0, 0],
    [-1.55, -3.5, .8802642822265625, 1.1655771151376606, -3.769569469169909, 0],
    [-6.65, -1.2, .9883880615234375, 1.0949985387914987, -15.574157460853087, 0],
    [-3.2, 1.9, 1.131103515625, .9404279496175882, -7.525715889629254, 0],
    [-.8, 4, 1.23388671875, .8297270091149772, -1.771513169863411, 0],
    [0, 4.65, 1.26666259765625, .7944488525390625, 0, 0],
    [.3, 4.3, 1.2503662109375, .8108758237352302, .7504296864670579, 0],
    [1.15, 3.15, 1.1992034912109375, .8624714277595207, 3.0282379744694623, 0],
    [2.45, 1.45, 1.1216888427734375, .9409700566331797, 6.686171094964038, 0],
    [1.15, -.2, 1.0460205078125, 1.0104446895887182, 3.012378226202557, 0],
    [.25, -1.25, .9978179931640625, 1.0549051829487366, .5569361237827479, 0],
    [0, -1.6, .982696533203125, 1.0688934326171875, 0, 0],
    [-.1, -1.55, .9834136962890625, 1.066086335325182, -.056584761061770905, 0],
    [-.4, -1.35, .9857177734375, 1.0571861051189553, -.7997087181308729, 0],
    [-.85, -1, .9893951416015625, 1.0429154773788731, -2.1138051796834247, 0],
    [-.6, -.75, .9922332763671875, 1.0313194037738669, -1.512497983808231, 0],
    [-.45, -.55, .99493408203125, 1.0204045992999402, -1.0024859970574198, 0],
    [-.25, -.25, .9971923828125, 1.011363047612536, -.5160785678648097, 0],
    [-.1, -.1, .9987640380859375, 1.0049139140583043, -.06176924245222892, 0],
    [0, -.05, .9997100830078125, 1.0011749644321115, -.015718287616209636, 0],
    [0, 0, 1, 1, 0, 0],
    [],
    [0, 0, 1, 1, 0, 0],
    [0, 2.55, 1.126678466796875, .8877716064453125, 0, 0],
    [0, 8.3, 1.4143829345703125, .6329193115234375, 0, 0],
    [0, 10.65, 1.5333251953125, .527557373046875, 0, 0],
    [0, 9.25, 1.4581298828125, .5888671875, 0, 0],
    [0, 4.95, 1.2271728515625, .77716064453125, 0, 0],
    [0, -.65, .9223480224609375, 1.0257110595703125, 0, 0],
    [0, -4.7, .70281982421875, 1.2047119140625, 0, 0],
    [0, -5.9, .632843017578125, 1.2617645263671875, 0, 0],
    [0, -5.55, .6529541015625, 1.2469329833984375, 0, 0],
    [0, -4.45, .7166595458984375, 1.1999664306640625, 0, 0],
    [0, -2.75, .822998046875, 1.1215667724609375, 0, 0],
    [0, -.55, .9564361572265625, 1.0231781005859375, 0, 0],
    [0, 1.65, 1.087371826171875, .9266510009765625, 0, 0],
    [0, 3.3, 1.1884765625, .8520965576171875, 0, 0],
    [0, 4.3, 1.24798583984375, .8082275390625, 0, 0],
    [0, 4.65, 1.26666259765625, .7944488525390625, 0, 0],
    [0, 4.45, 1.2573394775390625, .803497314453125, 0, 0],
    [0, 3.8, 1.2279052734375, .8321685791015625, 0, 0],
    [0, 2.7, 1.177947998046875, .88079833984375, 0, 0],
    [0, 1.25, 1.1118927001953125, .9450836181640625, 0, 0],
    [0, -.35, 1.040374755859375, 1.0146942138671875, 0, 0],
    [0, -1.75, .9764556884765625, 1.0768890380859375, 0, 0],
    [0, -2.8, .92926025390625, 1.122833251953125, 0, 0],
    [0, -3.35, .9018096923828125, 1.1495513916015625, 0, 0],
    [0, -3.6, .893157958984375, 1.157958984375, 0, 0],
    [0, -3.55, .894927978515625, 1.1553497314453125, 0, 0],
    [0, -3.35, .9004974365234375, 1.147125244140625, 0, 0],
    [0, -3.05, .910064697265625, 1.13299560546875, 0, 0],
    [0, -2.6, .9233245849609375, 1.11334228515625, 0, 0],
    [0, -2.05, .9392852783203125, 1.089752197265625, 0, 0],
    [0, -1.5, .956085205078125, 1.0649566650390625, 0, 0],
    [0, -.95, .971588134765625, 1.0419921875, 0, 0],
    [0, -.6, .984222412109375, 1.0233154296875, 0, 0],
    [0, -.25, .993194580078125, 1.01007080078125, 0, 0],
    [0, -.05, .9983673095703125, 1.002410888671875, 0, 0],
    [0, 0, 1, 1, 0, 0],
    []
];
var animationLen = jellyAnimation.length;
var mapButtons = [
    [
        [125.1, 2883.75, true, 1, 1],
        [173.35, 2846, false, 1, 1],
        [244.45, 2838.65, false, 1, 1],
        [314.7, 2830.6, false, 1, 1],
        [350.4, 2797.2, false, 1, 1],
        [331.8, 2754.8, true, 1, 1],
        [281.75, 2718.5, false, 1, 1],
        [268.55, 2684.2, false, 1, 1],
        [303.6, 2650.8, false, 1, 1],
        [358.6, 2630, false, 1, 1],
        [433.1, 2605.55, true, 1, 1],
        [501.7, 2590.45, false, 1, 1],
        [554.55, 2567.65, false, 1, 1],
        [568.75, 2528.7, false, 1, 1],
        [546, 2492.5, false, 1, 1],
        [509, 2455.3, true, 1, 1],
        [434.65, 2415.3, false, 1, 1],
        [373.9, 2398.3, false, 1, 1],
        [307, 2382.8, false, 1, 1],
        [244.45, 2367.7, false, 1, 1],
        [163.2, 2338.4, true, 1, 1],
        [112.25, 2300.5, false, 1, 1],
        [74.05, 2249.75, false, 1, 1],
        [63.45, 2189.7, false, 1, 1],
        [64.65, 2122.25, false, 1, 1],
        [86.75, 2062.45, true, 1, 1],
        [150.95, 2024.3, false, 1, 1],
        [226.75, 2022.6, false, 1, 1],
        [284.95, 2054.7, false, 1, 1],
        [317.05, 2103.25, false, 1, 1],
        [366.2, 2147.25, true, 1, 1],
        [432.05, 2178.1, false, 1, 1],
        [508.55, 2173.6, false, 1, 1],
        [551.3, 2120.1, false, 1, 1],
        [538.7, 2058.6, false, 1, 1],
        [520.1, 2008.45, true, 1, 1],
        [503.4, 1948.85, false, 1, 1],
        [458.9, 1888.95, false, 1, 1],
        [411, 1833.05, false, 1, 1],
        [377.05, 1744.4, false, 1, 1],
        [366.55, 1638.4, false, 1, 1],
        [366.55, 1515, false, 1, 1],
        [361.9, 1397.45, true, 1, 1],
        [353.35, 1345.4, false, 1, 1],
        [383.85, 1293.3, false, 1, 1],
        [466, 1269.55, false, 1, 1],
        [527.1, 1240, false, 1, 1],
        [552.9, 1183, true, 1, 1],
        [532.3, 1128.85, false, 1, 1],
        [487.05, 1080.65, false, 1, 1],
        [428.9, 1033.8, false, 1, 1],
        [366.55, 1004.2, false, 1, 1],
        [283.05, 981.05, true, 1, 1],
        [189.45, 950.25, false, 1, 1],
        [154.5, 892.45, false, 1, 1],
        [202.2, 854.45, false, 1, 1],
        [267.9, 827.55, false, 1, 1],
        [318.9, 789.55, false, 1, 1],
        [336.75, 733.05, false, 1, 1],
        [338.45, 668.2, true, 1.20001220703125, 1.20001220703125]
    ],
    [
        [184, 1934, true, 1, 1],
        [268, 1885, false, 1, 1],
        [328, 1830, false, 1, 1],
        [369, 1773, false, 1, 1],
        [369, 1714, true, 1, 1],
        [359, 1666, false, 1, 1],
        [313, 1629, false, 1, 1],
        [265, 1589, false, 1, 1],
        [207, 1564, false, 1, 1],
        [141, 1530, true, 1, 1],
        [172, 1480, false, 1, 1],
        [249, 1467, false, 1, 1],
        [340, 1449, false, 1, 1],
        [336, 1391, false, 1, 1],
        [307, 1330, true, 1, 1],
        [333, 1282, false, 1, 1],
        [387, 1255, false, 1, 1],
        [453, 1241, false, 1, 1],
        [523, 1212, false, 1, 1],
        [546, 1160, true, 1, 1],
        [535, 1111, false, 1, 1],
        [493, 1079, false, 1, 1],
        [431, 1050, false, 1, 1],
        [371, 1030, false, 1, 1],
        [289, 1016, true, 1, 1],
        [181, 997, false, 1, 1],
        [123, 980, false, 1, 1],
        [90, 934, false, 1, 1],
        [104, 881, false, 1, 1],
        [313, 805, true, 1, 1],
        [413, 806, false, 1, 1],
        [505, 789, false, 1, 1],
        [567, 741, false, 1, 1],
        [552, 678, false, 1, 1],
        [513, 622, true, 1, 1]
    ],
    [
        [510, 1931, true, 1, 1],
        [453, 1887, false, 1, 1],
        [404, 1845, false, 1, 1],
        [378, 1787, false, 1, 1],
        [373, 1717, true, 1, 1],
        [356, 1668, false, 1, 1],
        [354, 1606, false, 1, 1],
        [356, 1550, false, 1, 1],
        [359, 1492, false, 1, 1],
        [370, 1438, true, 1, 1],
        [362, 1395, false, 1, 1],
        [334, 1353, false, 1, 1],
        [336, 1315, false, 1, 1],
        [372, 1282, false, 1, 1],
        [420, 1246, true, 1, 1],
        [484, 1227, false, 1, 1],
        [532, 1211, false, 1, 1],
        [563, 1185, false, 1, 1],
        [571, 1147, false, 1, 1],
        [545, 1111, true, 1, 1],
        [520, 1075, false, 1, 1],
        [478, 1051, false, 1, 1],
        [419, 1032, false, 1, 1],
        [374, 1019, false, 1, 1],
        [323, 998, true, 1, 1],
        [264, 985, false, 1, 1],
        [201, 961, false, 1, 1],
        [146, 902, false, 1, 1],
        [175, 860, false, 1, 1],
        [228, 826, true, 1, 1],
        [301, 802, false, 1, 1],
        [356, 780, false, 1, 1],
        [400, 738, false, 1, 1],
        [373, 693, false, 1, 1],
        [349, 651, true, 1, 1]
    ]
];
var __extends = this.__extends || function(e, t) {
    function r() {
        this.constructor = e
    }
    for (var n in t)
        if (t.hasOwnProperty(n))
            e[n] = t[n];
    r.prototype = t.prototype;
    e.prototype = new r
};
var ObjectPool = function() {
        function e() {
            this.fieldObjects = new Array;
            this.destroyAnimations = [];
            this.scores = {};
            var e = 90;
            for (var t = 0; t < 5; ++t) {
                if (t == 4)
                    e = 15;
                var n = [];
                for (var r = 0; r < e; ++r) {
                    n.push(new FieldObject(t))
                }
                if (t <= 3) {
                    this.destroyAnimations.push([]);
                    for (var r = 0; r < e; ++r)
                        this.destroyAnimations[t].push(new GemDestroyAnimation(t))
                }
                this.fieldObjects.push(n)
            }
            for (var t = 3; t < 20; ++t) {
                var i = this.getText((t * CellObject.BASE_SCORE).toString(), null, 0, 0, 0);
                var s = this.getText((t * CellObject.BASE_SCORE).toString(), null, 0, 0, 0);
                this.returnText(i);
                this.returnText(s)
            }
        }
        e.prototype.getText = function(e, t, n, r, i) {
            if (typeof r === "undefined") {
                r = -1
            }
            if (typeof i === "undefined") {
                i = -1
            }
            var s = this.scores[e];
            if (!s) {
                s = [];
                this.scores[e] = s
            }
            var o = s.length > 0 ? s.splice(0, 1)[0] : new JumpText(e, n);
            o.init(r > 0 || !t ? r : t.pos.x, i > 0 || !t ? i : t.pos.y, t);
            return o
        };
        e.prototype.returnText = function(e) {
            var t = e.text;
            var n = this.scores[t];
            if (!n) {
                n = [];
                this.scores[t] = n
            }
            e.release();
            n.push(e)
        };
        e.prototype.getObject = function(e, t, n, r) {
            if (typeof r === "undefined") {
                r = -1
            }
            if (r > Match3Level.instance.assetNumber)
                r = -1;
            while (true) {
                var i = r >= 0 ? r : getInt(Math.min(n, this.fieldObjects.length));
                if (this.fieldObjects[i].length > 0) {
                    var s = this.fieldObjects[i].splice(0, 1)[0];
                    return s.init(e, t)
                }
                r = -1
            }
            return null
        };
        e.prototype.returnObject = function(e) {
            e.release();
            this.fieldObjects[e.colorType].push(e)
        };
        e.prototype.getDestroyAnimation = function(e, t, n, r) {
            var i = this.destroyAnimations[e].splice(0, 1)[0];
            i.init(t, n, r);
            return i
        };
        e.prototype.returnGemDestroy = function(e) {
            this.destroyAnimations[e.color].push(e);
            e.release()
        };
        return e
    }
    ();
var GameObject = function() {
        function e() {
            this.sprite = null;
            this.isDestroyed = false;
            this.isWaitingForDestruction = false;
            this.isLocked = false;
            this.stage = App.game.stage;
            this.level = Match3Level.instance
        }
        e.prototype.canBeVisible = function(e) {
            return true
        };
        e.prototype.update = function(e) {};
        e.prototype.destroy = function() {
            removeClip(this.sprite);
            this.sprite = null;
            this.isDestroyed = true
        };
        return e
    }
    ();
var FieldBonusType;
(function(e) {
    e[e["kBonusNone"] = 0] = "kBonusNone";
    e[e["kHorizontalLize"] = 1] = "kHorizontalLize";
    e[e["kVerticalLine"] = 2] = "kVerticalLine";
    e[e["kBombBonus"] = 3] = "kBombBonus";
    e[e["kColorBonus"] = 4] = "kColorBonus";
    e[e["kCrossBonus"] = 5] = "kCrossBonus";
    e[e["kThickCrossBonus"] = 6] = "kThickCrossBonus";
    e[e["kLargeBombBonus"] = 7] = "kLargeBombBonus";
    e[e["kColorLineBonus"] = 8] = "kColorLineBonus";
    e[e["kColorBombBonus"] = 9] = "kColorBombBonus";
    e[e["kColorColorBonus"] = 10] = "kColorColorBonus"
})(FieldBonusType || (FieldBonusType = {}));
var TweenData = function() {
        function e() {
            this.initPos = new createjs.Point;
            this.endPos = new createjs.Point;
            this.currentTime = 0;
            this.totalTime = 0;
            this.corner = false
        }
        e.prototype.init = function(e, t, n, r, i, s) {
            this.initPos.x = e;
            this.initPos.y = t;
            this.endPos.x = n;
            this.endPos.y = r;
            this.totalTime = i;
            this.currentTime = 0;
            this.corner = s
        };
        e.prototype.update = function(e, t) {
            this.currentTime += e;
            var n = false;
            if (this.currentTime >= this.totalTime) {
                this.currentTime = this.totalTime;
                n = true
            }
            var r = this.currentTime / this.totalTime;
            if (!this.corner)
                r *= r * r;
            t.pos.x = this.initPos.x + (this.endPos.x - this.initPos.x) * r;
            t.pos.y = this.initPos.y + (this.endPos.y - this.initPos.y) * r;
            if (n)
                t.stopMove()
        };
        return e
    }
    ();
var FieldObject = function(e) {
        function t(t) {
            e.call(this);
            this.isMoving = true;
            this.SPEED = 200;
            this.lastTarget = new createjs.Point(0, 0);
            this.currentTile = 6;
            this.bonusType = 0;
            this.isActive = false;
            this.isCustom = false;
            this.moveCornerCount = 0;
            this.timeSinceStop = 0;
            this.isMovedAfterCorner = false;
            this.rowMoveAfterConterCount = 0;
            this.currentFrame = 0;
            this.isPlaying = false;
            this.animationPower = 1;
            this.animationSpeed = 1;
            this.stopSpeed = 0;
            this.nextIdleTime = 0;
            this.timeSinceAnim = 0;
            this.isCached = false;
            this.playBonusAnimationIn = -1;
            this.isHighValue = false;
            this.highValueIn = -1;
            this.frameTime = 1 / 30;
            this.pos = new createjs.Point(0, 0);
            this.animPos = new createjs.Point(0, 0);
            this.tween = new TweenData;
            this.prevNeighbours = [null, null, null, null];
            this.colorType = t;
            this.sprite = new createjs.Sprite(App.game.atlas, this.getFileName());
            this.sprite.gotoAndStop(this.getFileName());
            var n = this.sprite.getBounds();
            this.sprite.regX = n.width / 2;
            this.sprite.regY = n.height / 2
        }
        __extends(t, e);
        t.prototype.setNextIdleTime = function() {
            this.nextIdleTime = 1 + Math.random() * 78;
            this.timeSinceAnim = 0
        };
        t.prototype.getFileName = function() {
            if (this.isPushable)
                return "cupcake";
            if (this.bonusType == 4)
                return "bonus color";
            var e = t.assetNames[this.colorType] + t.bonusNames[this.bonusType];
            if (!this.isBonus && this.isHighValue)
                e += " bonus";
            return e
        };
        t.prototype.setHighValue = function() {
            if (this.isBonus)
                return;
            this.isHighValue = true;
            this.sprite.gotoAndStop(this.getFileName());
            this.playJellyAnimation(1, 1)
        };
        t.prototype.setHighValueIn = function(e) {
            this.highValueIn = e
        };
        Object.defineProperty(t.prototype, "isPushable", {
            get: function() {
                return this.colorType == 4
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.init = function(e, n) {
            this.cell = e;
            e.object = this;
            this.isHighValue = false;
            createjs.Tween.removeTweens(this.pos);
            createjs.Tween.removeTweens(this.sprite);
            this.level = Match3Level.instance;
            addChild(this.sprite, this.level.gemLayer);
            this.pos.x = n.x;
            this.pos.y = n.y;
            this.sprite.x = n.x;
            this.sprite.y = n.y;
            this.animPos.x = this.animPos.y = 0;
            this.isMoving = false;
            this.isWaitingForDestruction = false;
            this.isPlaying = false;
            this.currentFrame = 0;
            this.isMoving = false;
            this.sprite.visible = true;
            this.animationPower = 1;
            this.stopSpeed = 1;
            this.animationSpeed = 1;
            this.setNextIdleTime();
            this.isCached = false;
            this.playBonusAnimationIn = -1;
            this.bonusType = 0;
            this.sprite.gotoAndStop(this.getFileName());
            var r = Math.abs(this.sprite.x - e.pos.x) + Math.abs(this.sprite.y - e.pos.y) < 1;
            this.setFrame(-1, true, r);
            var i = this.sprite.getBounds();
            this.sprite.regX = i.width / 2;
            this.sprite.regY = i.height / 2;
            this.highValueIn = -1;
            if (!this.isActive) {
                t.activeCount++;
                this.isActive = true
            }
            return this
        };
        t.prototype.release = function() {
            this.setCache(false);
            removeClip(this.sprite);
            this.sprite.visible = false;
            this.highValueIn = -1;
            createjs.Tween.removeTweens(this.pos);
            createjs.Tween.removeTweens(this.sprite);
            this.isMoving = false;
            this.isWaitingForDestruction = false;
            this.animPos.x = this.animPos.y = 0;
            this.setFrame(-1);
            this.isHighValue = false;
            this.isPlaying = false;
            this.currentFrame = 0;
            this.playBonusAnimationIn = -1;
            this.isMoving = false;
            this.animationPower = 1;
            this.stopSpeed = 1;
            this.animationSpeed = 1;
            this.isCached = false;
            this.bonusType = 0;
            if (this.isActive) {
                t.activeCount--;
                this.isActive = false
            }
            return this
        };
        t.prototype.setCache = function(e, t, n) {
            if (typeof t === "undefined") {
                t = true
            }
            if (typeof n === "undefined") {
                n = false
            }
            if (!CACHE_ENABLED || e && this.bonusType == 4)
                return;
            if ((this.isCached != e || n) && this.sprite.parent) {
                this.isCached = e;
                this.sprite.visible = !e;
                if (t)
                    this.level.updateCacheCell(this.cell, e)
            }
        };
        Object.defineProperty(t.prototype, "isBonus", {
            get: function() {
                return this.bonusType != 0
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.setBonusType = function(e) {
            if (this.bonusType != e) {
                this.isHighValue = false;
                this.bonusType = e;
                var t = e == 4 ? 4 : e == 3 ? 5 : e == 1 ? 2 : 3;
                this.sprite.gotoAndStop(this.getFileName());
                var n = this.sprite.getBounds();
                this.sprite.regX = n.width / 2;
                this.sprite.regY = n.height / 2;
                this.playJellyAnimation(1, 1);
                this.setCache(false, true, true)
            }
        };
        t.prototype.onSpellExplosion = function(e) {
            if (typeof e === "undefined") {
                e = -1
            }
            this.sprite.visible = false
        };
        t.prototype.isSwapable = function() {
            return true
        };
        t.prototype.moveTo = function(e, t, n, r, i) {
            if (typeof n === "undefined") {
                n = false
            }
            if (typeof r === "undefined") {
                r = 0
            }
            if (typeof i === "undefined") {
                i = false
            }
            this.isMoving = true;
            var s = n ? .5 : 1;
            this.lastTarget.x = e;
            this.lastTarget.y = t;
            this.timeSinceStop = 0;
            if (!i && this.isMovedAfterCorner) {
                this.rowMoveAfterConterCount++;
                if (this.rowMoveAfterConterCount > 1) {
                    this.rowMoveAfterConterCount = 0;
                    this.isMovedAfterCorner = false
                }
            } else
                this.rowMoveAfterConterCount = 0;
            this.isMovedAfterCorner = false;
            var o = 300 * Math.pow(.6, limit(this.moveCornerCount, 0, 4));
            this.moveCornerCount++;
            var u = distanceBetweenPoints(e, t, this.pos.x, this.pos.y);
            if (u < 1)
                o = 10;
            if (i) {
                var a = this.level.stageToGrid(this.sprite.x, this.sprite.y);
                a.x = Math.floor(a.x);
                a.y = Math.floor(a.y);
                for (var f = a.y - 1; f >= 0; --f)
                    if (this.validatePos(a.x, f)) {
                        var l = this.level.cells[a.x][f];
                        if (l && l.object && !l.object.isMoving)
                            l.object.isMovedAfterCorner = true
                    }
            }
            this.tween.init(this.pos.x, this.pos.y, e, t, o / 1e3, i);
            if (!this.isPushable && u > 10) {
                this.stopSpeed = .7 + Math.random() * .3;
                this.playAnimation(0, .6)
            }
            this.setCache(false)
        };
        t.prototype.setFrame = function(e, t, n) {
            if (typeof t === "undefined") {
                t = true
            }
            if (typeof n === "undefined") {
                n = true
            }
            var r = animationLen;
            var i = e < 0 || e >= r ? null : jellyAnimation[e];
            var s = e + 1 < 0 || e + 1 >= r ? null : jellyAnimation[e + 1];
            var o = i == null || i.length <= 0;
            var u = !o && s != null && s.length > 0;
            var a = this.currentFrame - e;
            var f = this.animationPower;
            if (o) {
                this.animPos.x = 0;
                this.animPos.y = 0;
                this.sprite.scaleX = 1;
                this.sprite.scaleY = 1;
                this.sprite.skewX = 0;
                this.sprite.skewY = 0
            } else if (t) {
                this.setCache(false);
                var l = !u;
                this.animPos.x = Match3Level.TILE_SIZE_FACTOR * (l ? i[0] * f : f * (i[0] + a * (s[0] - i[0])));
                this.animPos.y = Match3Level.TILE_SIZE_FACTOR * (l ? i[1] * f : f * (i[1] + a * (s[1] - i[1])));
                this.sprite.scaleX = 1 * (l ? 1 + (i[2] - 1) * f : 1 + (i[2] + a * (s[2] - i[2]) - 1) * f);
                this.sprite.scaleY = 1 * (l ? 1 + (i[3] - 1) * f : 1 + (i[3] + a * (s[3] - i[3]) - 1) * f);
                this.sprite.skewX = l ? i[4] * f : f * (i[4] + a * (s[4] - i[4]));
                this.sprite.skewY = l ? i[5] * f : f * (i[5] + a * (s[5] - i[5]))
            }
            if (o) {
                if (!this.isMoving && n)
                    this.setCache(true);
                this.isPlaying = false;
                this.currentFrame = 0
            }
        };
        t.prototype.playAnimation = function(e, t, n) {
            if (typeof t === "undefined") {
                t = 1
            }
            if (typeof n === "undefined") {
                n = 1
            }
            this.animationPower = t;
            this.animationSpeed = n;
            this.currentFrame = e;
            this.isPlaying = true
        };
        t.prototype.playJellyAnimation = function(e, t) {
            var n = getInt(3);
            this.playAnimation(n == 0 ? 11 : n == 1 ? 39 : 67, e, t)
        };
        t.prototype.stopMove = function() {
            var e = this;
            this.isMoving = false;
            this.timeSinceStop = 0;
            if (!this.isPushable && this.isPlaying) {
                this.playJellyAnimation(this.stopSpeed, .75 + Math.random() * .5)
            }
            if (this.isPushable && this.cell.y == this.level.fieldHeight - 1) {
                this.level.objects.push(Match3Level.pool.getText("100", this.cell, 0));
                var t = this.level.gridToStage(this.cell.x, this.level.fieldHeight);
                createjs.Tween.get(this.pos, {
                    loop: false
                }).wait(0).to({
                    x: t.x,
                    y: t.y
                }, 300, createjs.Ease.cubicIn).call(function() {
                    return e.pushDown()
                });
                SoundsManager.instance.playSound("cake_down")
            } else
                SoundsManager.instance.playSound("stop_move")
        };
        t.prototype.pushDown = function() {
            this.cell.object = null;
            this.level.target.onTargetPush();
            Match3Level.pool.returnObject(this)
        };
        t.prototype.changeType = function(e, t) {
            if (typeof t === "undefined") {
                t = false
            }
        };
        t.prototype.update = function(e) {
            if (!this.isMoving) {
                this.timeSinceStop += e;
                if (this.timeSinceStop >= .5)
                    this.moveCornerCount = 0
            }
            if (this.sprite) {
                if (this.isPlaying) {
                    var t = e * this.animationSpeed;
                    while (t > 0 && ~~this.currentFrame != 9 && this.isPlaying) {
                        this.currentFrame += t >= this.frameTime ? 1 : t / this.frameTime;
                        t -= this.frameTime;
                        this.setFrame(~~this.currentFrame, t <= this.frameTime)
                    }
                } else {
                    this.timeSinceAnim += e;
                    if (this.timeSinceAnim >= this.nextIdleTime) {
                        this.setNextIdleTime()
                    }
                }
                if (this.isMoving)
                    this.tween.update(e, this);
                if (this.playBonusAnimationIn >= 0) {
                    this.playBonusAnimationIn -= e;
                    if (this.isBonus && this.playBonusAnimationIn < 0) {
                        this.playBonusAnimation()
                    }
                }
                if (this.highValueIn >= 0) {
                    this.highValueIn -= e;
                    if (this.highValueIn < 0)
                        this.setHighValue()
                }
                this.sprite.x = this.pos.x + this.animPos.x;
                this.sprite.y = this.pos.y + this.animPos.y
            }
        };
        t.prototype.playBonusAnimation = function() {
            if (this.bonusType == 4)
                this.level.objects.push(new SinglePlayObject(this.sprite.x, this.sprite.y, "color bonus", 37, this.level.gemDestroyLayer, 67, 61, ANIM_SCALE));
            else {
                this.level.objects.push(new BonusDestroyAnimation(this.sprite.x, this.sprite.y, this.getFileName(), this.cell))
            }
            this.sprite.visible = false
        };
        t.prototype.validatePos = function(e, t) {
            return e >= 0 && t >= 0 && e < App.level.fieldWidth && t < App.level.fieldHeight
        };
        t.prototype.getNeighbourObject = function(e, t, n) {
            var r = this.cell.x + e;
            var i = this.cell.y + t;
            if (r < 0 || r >= App.level.fieldWidth)
                return null;
            if (!this.isMoving) {
                if (!this.validatePos(r, i))
                    return null;
                o = App.level.cells[r][i].object;
                if (o && !o.isMoving && o.colorType == this.colorType)
                    return o;
                else
                    return null
            } else {
                for (var s = -1; s < App.level.fieldHeight; s++) {
                    if (s != -1 && !this.validatePos(r, s))
                        continue;
                    var o = s == -1 ? this.prevNeighbours[n] : App.level.cells[r][s].object;
                    if (o && !o.isDestroyed && o.colorType == this.colorType) {
                        var u = Math.abs(o.sprite.x - (this.sprite.x + e * App.level.tileSize)) < .5;
                        var a = Math.abs(o.sprite.y - (this.sprite.y + t * App.level.tileSize)) < .5;
                        if (u && a) {
                            return o
                        }
                    }
                }
            }
            return null
        };
        t.TILE_SIZE = 35;
        t.destroyCount = 0;
        t.GEM_SCALE = 1;
        t.GEM_KILL_DELAY = .07;
        t.assetNames = ["blue", "green", "purple", "orange"];
        t.bonusNames = ["", " horizontal", " vertical", " bomb", " bomb"];
        t.activeCount = 0;
        return t
    }
    (GameObject);
var Match3Level = function(e) {
        function t() {
            e.call(this);
            this.isPaused = false;
            this.currentMove = 0;
            this.isGenerated = false;
            this.isLocked = false;
            this._isHardLocked = false;
            this.isEnded = false;
            this.score = 0;
            this.pushPositions = [];
            this.objects = [];
            this.customMatches = new Array;
            this.comboAmount = 0;
            this.maxCombo = 0;
            this.comboTimer = t.COMBO_TIME;
            this.turnedOff = false;
            this.isSelectBlocked = false;
            this.fieldCount = 5;
            this.fpsText = null;
            this.timeSinceLastAction = 0;
            this.movesLeft = 0;
            this.showWinMenuIn = -1;
            this.playLoseIn = 1.3;
            this.cellData = null;
            this.needToUpdateGemCache = false;
            this.cachedSprites = {};
            this.showTargetIn = -1;
            this.underGemLayer = new createjs.Container;
            this.gemLayer = new createjs.Container;
            this.gemCacheLayer = new createjs.Container;
            this.blockLayer = new createjs.Container;
            this.gemDestroyLayer = new createjs.Container;
            this.blockDestroyLayer = new createjs.Container;
            this.bonusLayer = new createjs.Container;
            this.bonusIndicatorLayer = new createjs.Container;
            this.hudLayer = new createjs.Container;
            t.instance = this;
            var n = ["blue bomb", "blue horizontal", "blue vertical", "blue", "green bomb", "green horizontal", "green vertical", "green", "orange bomb", "orange horizontal", "orange vertical", "orange", "purple bomb", "purple horizontal", "purple vertical", "purple"];
            for (var r = 0; r < n.length; ++r) {
                var i = createSpriteFromSpritesheet(n[r]);
                var s = i.getBounds();
                i.cache(s.x, s.y, s.width, s.height);
                this.cachedSprites[n[r]] = i
            }
            this.addChild(this.underGemLayer);
            this.addChild(this.gemLayer);
            if (CACHE_ENABLED)
                this.addChild(this.gemCacheLayer);
            this.addChild(this.blockLayer);
            this.addChild(this.gemDestroyLayer);
            this.addChild(this.blockDestroyLayer);
            this.addChild(this.bonusLayer);
            this.addChild(this.bonusIndicatorLayer);
            this.addChild(this.hudLayer);
            this.setFieldProps(t.TILE_SIZE, 26, 104, t.LEVEL_W, t.LEVEL_H);
            this.cells = new Array;
            for (var r = 0; r < this.fieldWidth; r++) {
                var o = new Array;
                for (var u = 0; u < this.fieldHeight; u++) {
                    var a = new CellObject(r, u);
                    o.push(a)
                }
                this.cells.push(o)
            }
            if (CACHE_ENABLED) {
                this.gemCacheLayer.cache(0, 0, this.fieldWidth * this.tileSize, this.fieldHeight * this.tileSize);
                this.gemCacheLayer.x = this.offsetX;
                this.gemCacheLayer.y = this.offsetY
            }
            var f = createBitmap("back" + 1);
            f.x = -1;
            f.y = -1 + 80 + App.SHIFT_H;
            this.back = f;
            this.marks = new createjs.Container;
            App.level = this;
            var l = new createjs.Text("20fps", "30px Arial Black", "#000000");
            l.x = 0;
            l.alpha = .3;
            l.y = App.SCREEN_H + App.SHIFT_H - 20;
            addChild(l, this.hudLayer);
            this.fpsText = l;
            this.hud = new Hud
        }
        __extends(t, e);
        t.prototype.pause = function() {
            if (this.isPaused || this.isEnded)
                return;
                gradle.event('pause');
            var e = this.getBounds();
            this.cache(0, App.SHIFT_H, App.SCREEN_W, App.SCREEN_H);
            this.isPaused = true;
            MenuManager.instance.show(MenuManager.instance.pause, false)
        };
        t.prototype.unpause = function() {
            this.isPaused = false;
            this.uncache();
            if (MenuManager.instance.current == MenuManager.instance.pause)
                MenuManager.instance.closeCurrent()
        };
        t.prototype.updateCacheCell = function(e, t) {
            e.setCacheState(t ? CellObject.CACHE_DRAW : CellObject.CACHE_CLEAR)
        };
        t.prototype.drawCache = function(e) {
            if (e.object && e.cacheUpdateState == CellObject.CACHE_DRAW || e.cacheUpdateState == CellObject.CACHE_CLEAR) {
                if (e.cacheUpdateState == CellObject.CACHE_CLEAR) {
                    this.gemCacheLayer.cacheCanvas.getContext("2d").clearRect(e.rect.x - this.offsetX, e.rect.y - this.offsetY, e.rect.width, e.rect.height)
                } else {
                    var t = e.object.getFileName();
                    var n = this.cachedSprites[t];
                    var r = n.cacheCanvas;
                    this.gemCacheLayer.cacheCanvas.getContext("2d").drawImage(r, e.pos.x - r.width / 2 - this.offsetX, e.pos.y - r.height / 2 - this.offsetY, r.width, r.height)
                }
            }
            e.resetCacheState()
        };
        Object.defineProperty(t.prototype, "isActive", {
            get: function() {
                return this.parent != null
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.init = function(e) {
            this.reset();
            this.showTargetIn = .3;
            removeClip(this.fpsText);
            this.showWinMenuIn = -1;
            this.uncache();
            SoundsManager.instance.reset();
            App.game.stage.addChild(this);
            this.isEnded = false;
            var t = 0;
            var n = 0;
            var r = 0;
            t = -1;
            n = 0;
            r = 0;
            this.movesLeft = 99;
            var i = [500, 1500, 3e3];
            var s = null;
            var o = window.location.href;
            if (o.indexOf("lvl") != -1) {
                o = o.split("lvl")[1];
                s = o
            }
            var u = s ? new LevelData(e, s) : LevelManager.instance.data[e];
            this.levelData = u;
            this.cellData = u.cellData;
            t = u.targetData;
            n = u.customData;
            r = u.customData2;
            this.movesLeft = u.movesLeft;
            i = u.starValues;
            switch (t) {
                case 0:
                    this.target = new BlockClearTarget;
                    break;
                case 1:
                    this.target = new ClearMarkTarget;
                    break;
                case 2:
                    this.target = new PushDownTarget(n);
                    break;
                case 3:
                    this.target = new ColorTarget(n, r);
                    break;
                case 4:
                    this.target = new ScoreTarget(n);
                    break;
                case -1:
                    this.target = new InfiniteTarget;
                    break
            }
            this.target.scores = i;
            App.game.backStage.addChildAt(this.back, 0);
            App.game.backStage.addChild(this.marks);
            App.game.needToUpdateBack = true;
            this.score = 0;
            this.generate();
            this.needToUpdateGemCache = true;
            this.hud.show();
            this.update(0)
        };
        t.prototype.starMoveAwardMode = function() {
            if (this.isEnded || this.isHardLocked)
                return;
            this.isEnded = true;
            var e = [];
            for (var n = 0; n < this.fieldWidth; ++n) {
                for (var r = 0; r < this.fieldHeight; ++r) {
                    var i = this.cells[n][r];
                    if (i && i.object && !i.object.isMoving && !i.object.isBonus && !i.object.isPushable) {
                        e.push(i)
                    }
                }
            }
            this.objects.push(t.pool.getText("amazing!", null, 3, App.SCREEN_W / 2, App.SHIFT_H + 400));
            var s = this.hud.movesText.x;
            var o = this.hud.movesText.y - 20;
            var u = this.movesLeft > 0;
            var a = [];
            var f = [];
            var l = [];
            for (var n = 0; n < this.fieldWidth; ++n)
                for (var r = 0; r < this.fieldHeight; ++r) {
                    var i = this.cells[n][r];
                    if (i && i.object && i.object.isBonus) {
                        a.push(i);
                        f.push(i.getBonusType());
                        l.push(!u ? 0 : .5)
                    }
                }
            var c = e.length;
            var h = 0;
            var p = -1;
            var d = this.movesLeft;
            while (d > 0) {
                if (c <= 0) {
                    this.objects.push(t.pool.getText("100", null, 0, s, o));
                    this.movesLeft--
                } else {
                    i = e.splice(getInt(c), 1)[0];
                    var v = .6 + h * .065;
                    var m = 1 + getInt(3);
                    f.push(m);
                    var g = new EndBonusIndicator(s, o, i, v, m);
                    this.objects.push(g);
                    a.push(i);
                    p = Math.max(p, g.totalTime);
                    l.push(g.totalTime);
                    ++h
                }
                --c;
                d--
            }
            var y = [];
            p += .2;
            var b = -1;
            c = a.length;
            for (var h = 0; h < c; ++h) {
                i = a[h];
                var w = this.getBonusGroup(i, f[h]);
                v = l[h];
                var E = w.length;
                for (var S = 0; S < E; ++S) {
                    var x = w[S];
                    var T = this.getDistance(i, x, false);
                    var N = (!u ? 1 : 1.5) + v + T * FieldObject.GEM_KILL_DELAY + BonusDestroyAnimation.TIME;
                    b = Math.max(N, b);
                    if (x == i || a.indexOf(x) == -1)
                        x.prepareToClear(N, f[h], -1, x == i);
                    y.push(x)
                }
                i.scoreToAdd = this.getBonusScore(f[h], 0)
            }
            c = y.length;
            b += FieldObject.GEM_KILL_DELAY;
            for (h = 0; h < c; ++h)
                y[h].setTempBlock(true, b);
            this.showWinMenuIn = 1.6
        };
        t.prototype.getStarAmount = function() {
            var e = 0;
            for (var t = 1; t <= 3; ++t) {
                var n = this.target.scores[t - 1];
                if (this.score >= n)
                    e = t
            }
            return e
        };
        t.prototype.destroyObjects = function() {
            var e = this.objects.length;
            for (var t = 0; t < e; ++t)
                this.objects[t].destroy();
            this.objects = []
        };
        t.prototype.onWin = function() {
            if (this.isEnded)
                return;
            this.isEnded = true;
            this.destroyObjects();
            var e = this.getBounds();
            this.cache(0, App.SHIFT_H, App.SCREEN_W, App.SCREEN_H);
            var t = this.objects.length;
            for (var n = 0; n < t; ++n) {
                var r = this.objects[n];
                if (r && r.isDestroyed && r instanceof JumpText) {
                    var i = r;
                    i.finishMovement();
                    i.destroy()
                }
            }
            var s = this.getStarAmount();
            this.hud.forceFullUpdate();
            LevelManager.instance.onLevelComplete(s, this.score);
            var o = this.levelData.levelNumber == LevelManager.LEVEL_AMOUNT - 1 ? MenuManager.instance.result : MenuManager.instance.winMenu;
            dp_submitScore(this.levelData.levelNumber + 1, this.score);
            MenuManager.instance.show(o, false)
        };
        t.prototype.onLose = function() {
            if (this.isEnded)
                return;
            this.isEnded = true;
            this.destroyObjects();
            var e = this.getBounds();
            this.cache(0, App.SHIFT_H, App.SCREEN_W, App.SCREEN_H);
            MenuManager.instance.show(MenuManager.instance.loseMenu, false)
        };
        t.prototype.resetSelects = function() {
            for (var e in this.cells) {
                var t = this.cells[e];
                for (var n in t) {
                    var r = t[n]
                }
            }
        };
        t.prototype.onMouseMove = function() {};
        t.prototype.onMouseUp = function() {};
        t.prototype.trySpawnBonus = function(e) {
            if (e == null)
                return;
            var n = e.length;
            if (n < t.MIN_LINE_SIZE)
                return;
            var r = 0;
            var i = 0;
            var s = 0;
            var o = 0;
            var u = null;
            var a = [];
            for (r = 0; r < n; ++r)
                a.push(e[r]);
            e = a;
            while (true) {
                n = e.length;
                if (n < t.MIN_LINE_SIZE)
                    return;
                var f = [];
                for (r = 0; r < n; ++r)
                    f[r] = false;
                var l = [];
                for (r = 0; r < n; ++r)
                    l[r] = false;
                var c = [];
                var h = [];
                var p = 0;
                var d = [];
                for (r = 0; r < n; ++r) {
                    var v = e[r].getType();
                    if (v < 0)
                        continue;
                    s = e[r].x;
                    o = e[r].y;
                    i = p = 0;
                    d = [];
                    if (!f[r] && !(s - 1 >= 0 && this.cells[s - 1][o].getType() == v)) {
                        while (true) {
                            u = s + i < this.fieldWidth ? this.cells[s + i][o] : null;
                            var m = e.indexOf(u);
                            if (u && u.getType() == v && m != -1) {
                                ++p;
                                d.push(u);
                                f[m] = true
                            } else {
                                if (p >= t.MIN_LINE_SIZE) {
                                    c.push(d);
                                    h.push(p)
                                }
                                break
                            }
                            ++i
                        }
                    }
                    i = p = 0;
                    d = [];
                    if (!l[r] && !(o - 1 >= 0 && this.cells[s][o - 1].getType() == v)) {
                        while (true) {
                            u = o + i < this.fieldHeight ? this.cells[s][o + i] : null;
                            var m = e.indexOf(u);
                            if (u && u.getType() == v && m != -1) {
                                ++p;
                                d.push(u);
                                l[m] = true
                            } else {
                                if (p >= t.MIN_LINE_SIZE) {
                                    c.push(d);
                                    h.push(p)
                                }
                                break
                            }
                            ++i
                        }
                    }
                }
                var g = c.length;
                for (r = 0; r < g; ++r) {
                    d = c[r];
                    var y = d.length;
                    for (i = 0; i < y; ++i) {
                        u = d[i];
                        for (var b = 0; b < g; b++) {
                            if (r != b) {
                                var w = c[b];
                                m = w.indexOf(u);
                                if (m != -1) {
                                    var E = w.length;
                                    var S = m;
                                    if (S < t.MIN_LINE_SIZE)
                                        S = 0;
                                    var x = E - (m + 1);
                                    if (x < t.MIN_LINE_SIZE)
                                        x = 0;
                                    h[r] -= (E - (S + x)) * 1.1
                                }
                            }
                        }
                    }
                }
                var T = -1;
                var N = -1;
                for (r = 0; r < g; ++r) {
                    var C = h[r];
                    if (C > T || N == -1) {
                        T = C;
                        N = r
                    }
                }
                if (T != -1 && N != -1) {
                    d = c[N];
                    y = d.length;
                    for (r = 0; r < y; ++r) {
                        m = e.indexOf(d[r]);
                        e.splice(m, 1)
                    }
                    var k = this.getBonusByMatch(y);
                    var L = y <= 4 ? 3 : y <= 5 ? 4 : 5;
                    this.spawnBonus(k, d[0], d[L])
                }
                if (g <= 1 || e.length < t.MIN_LINE_SIZE)
                    break
            }
        };
        t.prototype.getBonusByMatch = function(e) {
            return e >= 6 ? 4 : e <= 4 ? Math.random() > .5 ? 1 : 2 : 3;
            return 10;
            var t = Math.random();
            return t < .15 ? 1 : t < .3 ? 2 : t < .7 ? 3 : 4
        };
        t.prototype.combinateBonuses = function(e) {
            var n = [];
            var r = 0;
            var i = e.length;
            for (r = 0; r < i; ++r) {
                if (e[r].object && e[r].object.isBonus)
                    n.push(e[r])
            }
            if (n.length > 1) {
                n = n.sort(function(e, t) {
                    return e.getBonusType() == t.getBonusType() ? 0 : e.getBonusType() > t.getBonusType() ? -1 : 1
                });
                var s = n[0];
                var o = n[1];
                var u = s.getBonusType();
                var a = o.getBonusType();
                var f = u == 1 || u == 2;
                var l = a == 1 || a == 2;
                var c = MenuManager.instance.isOnTutorial() ? Tutorial.instance.getBonusComboCell(s, o) : null;
                var h = c ? c : Math.random() > .5 ? s : o;
                if (f && l) {
                    s.object.setBonusType(5);
                    o.object.setBonusType(5)
                } else if ((f || l) && (u == 3 || a == 3)) {
                    h.object.setBonusType(6)
                } else if (u == 3 && a == 3) {
                    h.object.setBonusType(7)
                } else if ((f || l) && (u == 4 || a == 4)) {
                    h.object.setBonusType(8)
                } else if ((u == 4 || a == 4) && (u == 3 || a == 3)) {
                    h.object.setBonusType(9)
                } else if ((u == 4 || a == 4) && (u == 4 || a == 4)) {
                    h.object.setBonusType(10)
                }
                this.objects.push(t.pool.getText("combo!", s, 2, (s.pos.x + o.pos.x) / 2, (s.pos.y + o.pos.y) / 2))
            }
        };
        t.prototype.spawnBonus = function(e, t, n, r) {
            if (typeof r === "undefined") {
                r = null
            }
            var i;
            var s;
            var o;
            var u;
            var a = MenuManager.instance.isOnTutorial() ? Tutorial.instance.getBonusSpawnCell() : null;
            for (i = 0; i < 80; ++i) {
                s = getInt(this.fieldWidth);
                o = getInt(this.fieldHeight);
                u = a ? a : this.cells[s][o];
                var f = false;
                if (u.object && !u._isBlock && !u.object.isBonus && !u.object.isWaitingForDestruction && !u.object.isMoving && !u.isWaitingForClear && !u.object.isPushable && !u.object.isHighValue) {
                    for (var l = 0; l < this.customMatches.length; ++l)
                        if (this.customMatches[l].indexOf(u) != -1) {
                            f = true;
                            break
                        }
                    if (!f) {
                        if (r == null)
                            this.objects.push(new BonusIndicator(t, n, u, e));
                        else
                            r.updateTarget(u);
                        return
                    }
                }
            }
            if (r)
                r.destroy()
        };
        t.prototype.getBonusGroup = function(e, t, n) {
            if (typeof t === "undefined") {
                t = 0
            }
            if (typeof n === "undefined") {
                n = null
            }
            var r = t != 0 ? t : e.getBonusType();
            var i = [];
            switch (r) {
                case 1:
                    for (var s = 0; s < this.fieldWidth; ++s) {
                        var o = this.cells[s][e.y];
                        if (o.isStable() || o.isBreakable)
                            i.push(o)
                    }
                    break;
                case 2:
                    for (var u = 0; u < this.fieldHeight; ++u) {
                        var a = this.cells[e.x][u];
                        if (a.isStable() || a.isBreakable)
                            i.push(a)
                    }
                    break;
                case 3:
                    for (s = -2; s <= 2; ++s) {
                        for (u = -2; u <= 2; ++u) {
                            var f = e.x + s;
                            var l = e.y + u;
                            if (f >= 0 && l >= 0 && l < this.fieldHeight && f < this.fieldWidth) {
                                var c = this.cells[f][l];
                                if (c.isStable() || c.isBreakable)
                                    i.push(c)
                            }
                        }
                    }
                    break;
                case 4:
                    var h = this.getMatchColor(e, n);
                    var p = 200;
                    var d = [];
                    for (s = 0; s < this.fieldWidth; ++s)
                        for (u = 0; u < this.fieldHeight; ++u) {
                            if (this.cells[s][u] && (this.cells[s][u].isStable() || this.cells[s][u].isBreakable) && this.cells[s][u].getType() == h)
                                d.push(this.cells[s][u])
                        }
                    var v = 70;
                    var m = d.length;
                    while (v > 0 && p > 0 && m > 0) {
                        var g = getInt(m);
                        --m;
                        c = d[g];
                        i.push(c);
                        d.splice(g, 1);
                        v--;
                        p--
                    }
                    break;
                case 5:
                    for (s = 0; s < this.fieldWidth; ++s) {
                        o = this.cells[s][e.y];
                        if (o.isStable() || o.isBreakable)
                            i.push(o)
                    }
                    for (u = 0; u < this.fieldHeight; ++u) {
                        a = this.cells[e.x][u];
                        if (a.isStable() || o.isBreakable)
                            i.push(a)
                    }
                    break;
                case 6:
                    for (s = 0; s < this.fieldWidth; ++s) {
                        for (u = e.y - 1; u <= e.y + 1; ++u) {
                            if (s >= 0 && s < this.fieldWidth && u >= 0 && u < this.fieldHeight) {
                                o = this.cells[s][u];
                                if (o.isStable() || o.isBreakable)
                                    i.push(o)
                            }
                        }
                    }
                    for (s = e.x - 1; s <= e.x + 1; ++s) {
                        for (u = 0; u < this.fieldHeight; ++u) {
                            if (s >= 0 && s < this.fieldWidth && u >= 0 && u < this.fieldHeight) {
                                o = this.cells[s][u];
                                if (o.isStable() || o.isBreakable)
                                    i.push(o)
                            }
                        }
                    }
                    break;
                case 7:
                    for (s = -4; s <= 4; ++s) {
                        for (u = -4; u <= 4; ++u) {
                            var f = e.x + s;
                            var l = e.y + u;
                            if (f >= 0 && l >= 0 && l < this.fieldHeight && f < this.fieldWidth) {
                                var c = this.cells[f][l];
                                if (c.isStable() || c.isBreakable)
                                    i.push(c)
                            }
                        }
                    }
                    break;
                case 8:
                    var h = this.getMatchColor(e, n);
                    p = 10;
                    var d = [];
                    for (s = 0; s < this.fieldWidth; ++s)
                        for (u = 0; u < this.fieldHeight; ++u) {
                            c = this.cells[s][u];
                            if (c && c.object && this.cells[s][u].getType() == h && !c._isBlock && !c.object.isBonus && !c.object.isMoving && !c.isWaitingForClear)
                                d.push(c)
                        }
                    var v = 70;
                    var m = d.length;
                    while (v > 0 && p > 0 && m > 0) {
                        var g = getInt(m);
                        --m;
                        c = d[g];
                        i.push(c);
                        if (c != e)
                            c.object.setBonusType(Math.random() > .5 ? 1 : 2);
                        d.splice(g, 1);
                        v--;
                        p--
                    }
                    break;
                case 9:
                    var h = this.getMatchColor(e, n);
                    p = 10;
                    var d = [];
                    for (s = 0; s < this.fieldWidth; ++s)
                        for (u = 0; u < this.fieldHeight; ++u) {
                            c = this.cells[s][u];
                            if (c && c.object && this.cells[s][u].getType() == h && !c._isBlock && !c.object.isBonus && !c.object.isMoving && !c.isWaitingForClear)
                                d.push(c)
                        }
                    var v = 70;
                    var m = d.length;
                    while (v > 0 && p > 0 && m > 0) {
                        var g = getInt(m);
                        --m;
                        c = d[g];
                        i.push(c);
                        if (c != e)
                            c.object.setBonusType(3);
                        d.splice(g, 1);
                        v--;
                        p--
                    }
                    break;
                case 10:
                    for (s = 0; s < this.fieldWidth; ++s)
                        for (u = 0; u < this.fieldHeight; ++u) {
                            c = this.cells[s][u];
                            if (c.isStable() || c.isBreakable)
                                i.push(c)
                        }
                    break
            }
            return i
        };
        t.prototype.trySpawnHighValue = function(e) {
            var t = e.length;
            var n = 0;
            var r = [];
            for (var i = 0; i < t; ++i) {
                r.push(e[i]);
                if (!e[i].object.isHighValue)
                    ++n
            }
            var s = Math.floor(n / 6);
            for (var i = 0; i < s; ++i) {
                var o = false;
                while (t > 0) {
                    var u = getInt(t);
                    t--;
                    var a = r.splice(u, 1)[0];
                    for (var f = 0; f < 4; ++f) {
                        var l = a.x + (f == 0 ? -1 : f == 1 ? 1 : 0);
                        var c = a.y + (f == 2 ? -1 : f == 3 ? 1 : 0);
                        if (l >= 0 && c >= 0 && l < this.fieldWidth && c < this.fieldHeight) {
                            var h = this.cells[l][c];
                            var p = !MenuManager.instance.isOnTutorial() || Tutorial.instance.checkHighValueCell(h);
                            if (p && h.object && !h.object.isMoving && !h.isWaitingForClear && !h.object.isBonus && !h.object.isHighValue && !h.object.isPushable && !h.isWaitingForDestruction && !h.isBlock() && !h.object.isWaitingForDestruction) {
                                o = true;
                                h.object.setHighValueIn(a.clearIn > 0 ? a.clearIn : .1);
                                break
                            }
                        }
                    }
                    if (o)
                        break
                }
            }
        };
        t.prototype.getBonusDelay = function(e) {
            var t = 0;
            if (e == 4)
                t += 20 / 30;
            else if (e != 0 && e < 8)
                t += BonusDestroyAnimation.TIME;
            return t
        };
        t.prototype.getDistanceDelay = function(e, t, n, r) {
            var i = n == 8 || n == 9 ? 1 : n == 4 ? 2 : this.getDistance(e, t, false);
            return FieldObject.GEM_KILL_DELAY * i * Math.pow(.75, r)
        };
        t.prototype.getMatchColor = function(e, t) {
            if (!t)
                return e.getType();
            var n = [0, 0, 0, 0, 0, 0];
            var r = n.length;
            for (var i = 0; i < r; ++i) {
                var s = t[i].getType();
                if (s >= 0) {
                    n[s]++;
                    if (n[s] >= 2)
                        return s
                }
            }
            return e.getType()
        };
        t.prototype.onHudDown = function(e, t) {
            if (this.hud)
                this.hud.onDown(e, t)
        };
        t.prototype.onMouseDown = function(e, t) {
            if (!this.isActive)
                return;
            if (this.hud)
                this.hud.onDown(e, t);
            if (this.isLocked || this.movesLeft <= 0 || this.isPaused || this.isWaitingForTarget)
                return;
            var n = this.stageToGrid(e, t);
            var r = new createjs.Point;
            r.x = Math.floor(n.x);
            r.y = Math.floor(n.y);
            var i = this.getFillZone(r.x, r.y);
            if (i && i.length >= 3) {
                this.isLocked = true;
                ++this.currentMove;
                --this.movesLeft;
                LevelManager.instance.moves++;
                this.combinateBonuses(i);
                var s = [{
                    match: i,
                    mains: [this.cells[r.x][r.y]],
                    delay: .15,
                    bonus: 0,
                    gen: 0,
                    prevBonus: 0
                }];
                var o = 0;
                var u = -1;
                var a = true;
                while (o < s.length) {
                    var f = s[o].match;
                    var l = s[o].mains;
                    var c = s[o].delay;
                    var h = s[o].bonus;
                    var p = s[o].gen;
                    var d = s[o].prevBonus;
                    ++o;
                    this.customMatches.push(f);
                    var v = f.length;
                    for (var m = 0; m < v; ++m) {
                        var g = l[0];
                        var y = f[m];
                        var b = c + this.getDistanceDelay(g, y, h, p) + this.getBonusDelay(y.getBonusType());
                        u = Math.max(u, y.clearIn);
                        if (y && y.object && y.object.isBonus && !y.object.isMoving && !y.isWaitingForClear) {
                            var w = y.object.bonusType == 1 || y.object.bonusType == 2;
                            var E = h == y.object.bonusType && w ? h == 1 ? 2 : 1 : y.object.bonusType;
                            y.object.bonusType = E;
                            var S = this.getBonusGroup(y, 0, f);
                            if (S.length > 0) {
                                s.push({
                                    match: S,
                                    mains: [y],
                                    delay: b,
                                    bonus: E,
                                    gen: p + 1,
                                    prevBonus: h
                                })
                            }
                        }
                        if (y.object && y.object.isHighValue)
                            y.scoreToAdd = this.getHighValueCellScore() + (y.scoreToAdd >= 0 ? y.scoreToAdd : 0);
                        y.prepareToClear(b, h)
                    }
                    if (a) {
                        var x = this.getComboScore(v);
                        var u = -1;
                        var T = null;
                        for (var m = 0; m < v; ++m) {
                            var y = f[m];
                            if (y.object && !y.object.isBonus && y.isWaitingForClear && y.clearIn > u) {
                                u = y.clearIn;
                                T = y
                            }
                        }
                        if (T) {
                            T.scoreToAdd = x + (y.scoreToAdd >= 0 ? y.scoreToAdd : 0);
                            T.bonusComboCount = o
                        }
                    } else {
                        if (g.object && g.object.isBonus) {
                            g.scoreToAdd = this.getBonusScore(h, p - 1, d) + (g.scoreToAdd >= 0 ? g.scoreToAdd : 0);
                            g.bonusComboCount = o
                        }
                    }
                    a = false
                }
                u += FieldObject.GEM_KILL_DELAY * (this.customMatches.length <= 1 ? 3 : 7);
                for (m = 0; m < this.customMatches.length; ++m)
                    for (var N = 0; N < this.customMatches[m].length; ++N)
                        this.customMatches[m][N].setTempBlock(true, u);
                this.customMatches = [];
                this.trySpawnBonus(i);
                this.trySpawnHighValue(i)
            } else {
                if (r.x < 0 || r.y < 0 || r.x >= this.fieldWidth || r.y >= this.fieldHeight)
                    return;
                var y = this.cells[r.x][r.y];
                if (y && y.object && this.isGoodForClick(y))
                    y.object.playJellyAnimation(1, 1)
            }
        };
        t.prototype.getBonusScore = function(e, n, r) {
            if (typeof r === "undefined") {
                r = -1
            }
            if (r >= 8 && r <= 9)
                return -1;
            var i = t.bonusScores[e] * Math.pow(1.2, n);
            i = Math.round(i / 10);
            i *= 10;
            return i
        };
        t.prototype.getHighValueCellScore = function() {
            return 30
        };
        t.prototype.getComboScore = function(e) {
            return e * CellObject.BASE_SCORE
        };
        t.prototype.getDistance = function(e, t, n) {
            if (typeof n === "undefined") {
                n = false
            }
            var r = Math.abs(e.x - t.x);
            if (n)
                r = Math.min(r, Math.abs(r - this.fieldWidth));
            var i = Math.abs(e.y - t.y);
            if (n)
                i = Math.min(i, Math.abs(i - this.fieldHeight));
            return r + i
        };
        t.prototype.onBeforeSwap = function(e) {};
        t.prototype.onExit = function() {};
        t.prototype.onWrongMove = function() {};
        t.prototype.onSuccessMove = function(e, t, n, r) {};
        t.prototype.handleCombo = function() {};
        t.prototype.canSwap = function(e, t) {
            if (e.isBlock() || t.isBlock())
                return {
                    colorType: -1,
                    color: -1
                };
            return {
                colorType: 0,
                color: 0
            };
            var n = e.x - 2;
            var r = e.x + 2;
            var i = e.y - 2;
            var s = e.y + 2;
            n = n < 0 ? 0 : n >= this.fieldWidth ? this.fieldWidth - 1 : n;
            i = i < 0 ? 0 : i >= this.fieldHeight ? this.fieldHeight - 1 : i;
            r = r < 0 ? 0 : r >= this.fieldWidth ? this.fieldWidth - 1 : r;
            s = s < 0 ? 0 : s >= this.fieldHeight ? this.fieldHeight - 1 : s;
            var o = -1;
            var u = 0;
            var a = e.y;
            for (var f = n; f <= r; f++) {
                var l = this.cells[f][a] == t ? e.getType() : this.cells[f][a] == e ? t.getType() : this.cells[f][a].getType();
                if (l == this.assetNumber) {
                    var c = f + 1 <= r ? this.cells[f + 1][a] : null;
                    var h = !c ? -2 : c == e ? t.getType() : c == t ? e.getType() : c.getType();
                    if (u == 0 && c) {
                        o = h;
                        u = 1
                    } else if (u == 2) {
                        return {
                            colorType: 0,
                            color: o
                        }
                    } else if (u == 1 && c) {
                        if (o == h || h == this.assetNumber) {
                            return {
                                colorType: 0,
                                color: o
                            }
                        } else {
                            o = h;
                            u = 2;
                            f++
                        }
                    }
                } else if (l == -1) {
                    o = -1;
                    u = 0
                } else if (o == -1 || l != o) {
                    o = l;
                    u = 1
                } else if (o == l) {
                    u++;
                    if (u >= 3) {
                        return {
                            colorType: 0,
                            color: o
                        }
                    }
                }
            }
            o = -1;
            u = 0;
            f = e.x;
            for (a = i; a <= s; a++) {
                l = this.cells[f][a] == t ? e.getType() : this.cells[f][a] == e ? t.getType() : this.cells[f][a].getType();
                if (l == this.assetNumber) {
                    c = a + 1 <= s ? this.cells[f][a + 1] : null;
                    h = !c ? -2 : c == e ? t.getType() : c == t ? e.getType() : c.getType();
                    if (u == 0 && c) {
                        o = h;
                        u = 1
                    } else if (u == 2) {
                        return {
                            colorType: 1,
                            color: o
                        }
                    } else if (u == 1 && c) {
                        if (o == h || h == this.assetNumber) {
                            return {
                                colorType: 1,
                                color: o
                            }
                        } else {
                            o = h;
                            u = 2;
                            a++
                        }
                    }
                } else if (l == -1) {
                    o = -1;
                    u = 0
                } else if (o == -1 || l != o) {
                    o = l;
                    u = 1
                } else if (o == l) {
                    u++;
                    if (u >= 3) {
                        return {
                            colorType: 1,
                            color: o
                        }
                    }
                }
            }
            if ((e.object == null || t.object == null) && !(e.object == null && t.object == null)) {
                var p = e.object == null ? e : t;
                var d = e.object == null ? t : e;
                o = -1;
                u = 0;
                f = d.x;
                for (a = this.fieldHeight - 1; a >= 0; a--) {
                    if (a == d.y)
                        continue;
                    l = this.cells[f][a].getType();
                    if (l == this.assetNumber) {
                        var v = a - 1 == d.y ? a - 2 : a - 1;
                        c = v >= 0 ? this.cells[f][v] : null;
                        h = !c ? -2 : c.getType();
                        if (u == 0 && c) {
                            o = h;
                            u = 1
                        } else if (u == 2) {
                            return {
                                colorType: 2,
                                color: o
                            }
                        } else if (u == 1 && c) {
                            if (o == h || h == this.assetNumber) {
                                return {
                                    colorType: 2,
                                    color: o
                                }
                            } else {
                                o = h;
                                u = 2;
                                a++
                            }
                        }
                    } else if (l == -1) {
                        o = -1;
                        u = 0
                    } else if (o == -1 || l != o) {
                        o = l;
                        u = 1
                    } else if (o == l) {
                        u++;
                        if (u >= 3) {
                            return {
                                colorType: 2,
                                color: o
                            }
                        }
                    }
                }
            }
            return {
                colorType: -1,
                color: -1
            }
        };
        t.prototype.getCustomMatchesAmount = function() {
            var e = 0;
            for (var t in this.customMatches)
                for (var n in this.customMatches[t])
                    e++;
            return e
        };
        Object.defineProperty(t.prototype, "isHardLocked", {
            get: function() {
                return this.isLocked || this._isHardLocked
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.update = function(e) {
            this.onMouseMove();
            if (!this.isGenerated)
                return;
            if (this.comboTimer > 0) {
                this.comboTimer--;
                if (this.comboTimer == 0) {
                    if (this.comboAmount > this.maxCombo)
                        this.maxCombo = this.comboAmount;
                    this.handleCombo();
                    this.comboAmount = 0;
                    this.setCombo()
                }
            }
            var t = 0;
            this._isHardLocked = false;
            this.isLocked = false;
            for (var n = 0; n < this.fieldWidth; ++n)
                for (var r = 0; r < this.fieldHeight; ++r) {
                    var i = this.cells[n][r];
                    i.update(e);
                    if (i.object == null && !i.isBlock())
                        ++t;
                    this.isLocked = this.isLocked || i.object && (i.object.isMoving || i.object.isWaitingForDestruction) || i.isWaitingForClear || i.isChangingType;
                    this._isHardLocked = this._isHardLocked || this.isLocked || i.isTempBlock && !i._isBlock
                }
            var s = this.objects.length;
            for (var o = 0; o < s; ++o) {
                var u = this.objects[o];
                if (u && !u.isDestroyed) {
                    u.update(e);
                    this.isLocked = this.isLocked || u.isLocked && !u.isDestroyed
                } else {
                    this.objects.splice(o, 1);
                    o--;
                    s--
                }
            }
            if (t > 0) {
                var a = this.addObjects();
                a += this.pushObjects();
                this.isLocked = this.isLocked || a > 0
            }
            if (this.isLocked || this.isEnded)
                this.timeSinceLastAction = 0;
            else {
                this.timeSinceLastAction += e;
                if (this.timeSinceLastAction > 3 && !MenuManager.instance.isOnTutorial())
                    this.playHint();
                if (!this.isHardLocked)
                    this.checkIfComboExists()
            }
            if (CACHE_ENABLED) {
                for (var n = 0; n < this.fieldWidth; ++n)
                    for (var r = 0; r < this.fieldHeight; ++r) {
                        var i = this.cells[n][r];
                        if (i.cacheUpdateState > CellObject.CACHE_NONE)
                            this.drawCache(i)
                    }
            }
            if (this.showWinMenuIn > 0 && !this.isHardLocked) {
                this.showWinMenuIn -= e;
                if (this.showWinMenuIn <= 0) {
                    this.isEnded = false;
                    this.onWin()
                }
            }
            this.isLocked = this.isLocked || this.isEnded;
            if (!this.isPaused && !this.isHardLocked && !this.isEnded && !this.target.isCompleted && this.movesLeft <= 0 && this.playLoseIn > 0) {
                this.playLoseIn -= e;
                if (this.playLoseIn <= 0)
                    this.onLose()
            }
            if (this.isWaitingForTarget && !this.isHardLocked) {
                this.showTargetIn -= e;
                if (!this.isWaitingForTarget) {
                    if (!Tutorial.instance.hasTutorial(this.levelData.levelNumber))
                        MenuManager.instance.show(MenuManager.instance.target, false);
                    else
                        MenuManager.instance.show(MenuManager.instance.tutorial, false)
                }
            }
            this.hud.update(e);
            this.fpsText.text = createjs.Ticker.getMeasuredFPS().toFixed(1)
        };
        t.prototype.updateFpsText = function() {
            this.fpsText.text = createjs.Ticker.getMeasuredFPS().toFixed(1)
        };
        t.prototype.checkIfComboExists = function() {
            if (this.hud.isShuffleActive() || this.isWaitingForTarget || MenuManager.instance.current == MenuManager.instance.target)
                return;
            for (var e = 0; e < this.fieldHeight; ++e) {
                for (var t = 0; t < this.fieldWidth; ++t) {
                    var n = this.cells[t][e];
                    var r = this.getFillZone(t, e, 3);
                    if (r && r.length >= 3) {
                        return
                    }
                }
            }
            this.hud.playShuffleAnimation();
            var i = [];
            for (var t = 0; t < this.fieldWidth; ++t)
                for (var e = 0; e < this.fieldHeight; ++e)
                    if (this.isGoodForClick(this.cells[t][e]))
                        i.push(this.cells[t][e]);
            var s = i.length;
            this.isLocked = true;
            var o = 80;
            var u = false;
            var a = .6;
            while (o >= 0 && !u) {
                o--;
                var f = getInt(s);
                var n = i[f];
                if (!n.object.isPushable) {
                    var l = [n];
                    for (var c = 0; c < 4; ++c) {
                        t = n.x + (c == 0 ? 1 : c == 1 ? -1 : 0);
                        e = n.y + (c == 2 ? 1 : c == 3 ? -1 : 0);
                        if (t >= 0 && e >= 0 && t < this.fieldWidth && e < this.fieldHeight) {
                            var h = this.cells[t][e];
                            if (this.isGoodForClick(h)) {
                                l.push(h);
                                if (l.length >= 3) {
                                    var p = (n.getType() + 1) % this.assetNumber;
                                    u = true;
                                    for (var d = 0; d < l.length; ++d) {
                                        l[d].prepareToChangeType(a + lerp(0, .2, Math.random()), p);
                                        f = i.indexOf(l[d]);
                                        if (f != -1) {
                                            i.splice(f, 1);
                                            s--
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    }
                }
            }
            while (s > 0) {
                var f = getInt(s);
                s--;
                var n = i.splice(f, 1)[0];
                n.prepareToChangeType(a + lerp(0, .2, Math.random()))
            }
            return;
            while (s > 0) {
                var f = getInt(s);
                s--;
                var n = i.splice(f, 1)[0];
                if (!n.object || n.timeSinceLastTypeChange < 1)
                    continue;
                var l = [];
                for (var c = 0; c < 4; ++c) {
                    t = n.x + (c == 0 ? 1 : c == 1 ? -1 : 0);
                    e = n.y + (c == 2 ? 1 : c == 3 ? -1 : 0);
                    if (t >= 0 && e >= 0 && t < this.fieldWidth && e < this.fieldHeight) {
                        var h = this.cells[t][e];
                        if (this.isGoodForClick(h)) {
                            l.push(h);
                            if (l.length >= 2) {
                                for (var d = 0; d < l.length; ++d)
                                    l[d].changeObjectType(n.getType());
                                return
                            }
                        }
                    }
                }
            }
            return;
            while (s > 0) {
                var f = Math.random() < .5 ? Math.floor(s / 2 + getInt(Math.floor(s / 2))) : getInt(s);
                s--;
                var n = i.splice(f, 1)[0];
                if (!n.object || n.timeSinceLastTypeChange < 1)
                    continue;
                var l = [];
                for (var c = 0; c < 4; ++c) {
                    t = n.x + (c == 0 ? 1 : c == 1 ? -1 : 0);
                    e = n.y + (c == 2 ? 1 : c == 3 ? -1 : 0);
                    if (t >= 0 && e >= 0 && t < this.fieldWidth && e < this.fieldHeight) {
                        var h = this.cells[t][e];
                        if (this.isGoodForClick(h)) {
                            l.push(h);
                            if (l.length >= 2) {
                                for (var d = 0; d < l.length; ++d)
                                    l[d].changeObjectType(n.getType());
                                return
                            }
                        }
                    }
                }
            }
        };
        t.prototype.playHint = function() {
            var e = [];
            for (var t = 0; t < this.fieldWidth; ++t)
                for (var n = 0; n < this.fieldHeight; ++n)
                    e.push(this.cells[t][n]);
            var r = 15;
            var i = e.length;
            while (--r > 0 && i > 0) {
                var s = getInt(i);
                i--;
                var o = e.splice(s, 1)[0];
                if (!this.isGoodForClick(o))
                    continue;
                var u = this.getFillZone(o.x, o.y, 3);
                if (u && u.length >= 3) {
                    this.timeSinceLastAction = -Math.random() * 4;
                    u[getInt(u.length)].object.playJellyAnimation(.2 + Math.random() * .2, .25 + Math.random() * .25);
                    return
                }
            }
        };
        t.prototype.setCombo = function() {};
        t.prototype.isGoodForClick = function(e) {
            return e.object && e.object.colorType != -1 && !e.object.isMoving && !e.isWaitingForClear && !e.isColorBlocked && e.object.colorType != 4 && !e.isChangingType
        };
        t.prototype.getFillZone = function(e, t, n) {
            if (typeof n === "undefined") {
                n = -1
            }
            if (e < 0 || t < 0 || e >= this.fieldWidth || t >= this.fieldHeight)
                return null;
            var r = new Array;
            var i = new Array;
            var s = this.cells[e][t];
            if (!this.isGoodForClick(s))
                return r;
            var o = s.object.colorType;
            i.push(s);
            var u = 0;
            var a = i.length;
            while (u < a && (n < 0 || u < n)) {
                var f = i[u];
                r.push(f);
                ++u;
                for (var l = 0; l < 4; ++l) {
                    var c = f.x + (l == 0 ? -1 : l == 1 ? 1 : 0);
                    var h = f.y + (l == 2 ? -1 : l == 3 ? 1 : 0);
                    if (c >= 0 && h >= 0 && c < this.fieldWidth && h < this.fieldHeight) {
                        var p = this.cells[c][h];
                        if (p.object && (p.object.colorType == o || p.object.bonusType == 4) && !p.object.isMoving && i.indexOf(p) == -1) {
                            i.push(p);
                            ++a
                        }
                    }
                }
            }
            return r
        };
        t.prototype.findMatches = function(e) {
            if (typeof e === "undefined") {
                e = false
            }
            var t = this.customMatches;
            this.customMatches = [];
            return t;
            var n = this.findHorizontalMatches(e);
            var r = this.findVerticalMatches(e);
            n = n.concat(r).concat(this.customMatches);
            this.customMatches = new Array;
            return n
        };
        t.prototype.findHorizontalMatches = function(e) {
            var t = new Array;
            var n = -1;
            var r = new Array;
            for (var i = 0; i < this.fieldHeight; i++) {
                for (var s = 0; s < this.fieldWidth; s++) {
                    var o = this.cells[s][i];
                    var u = s + 1 < this.fieldWidth ? this.cells[s + 1][i] : null;
                    if (u && (u.object == null || !u.isStatic() && !e))
                        u = null;
                    var a = o.getType();
                    if (o.object == null || !o.isStatic() && !e || a != n && a != this.assetNumber) {
                        if (r.length >= 3)
                            t.push(r);
                        n = -1;
                        r = new Array;
                        if (o.object && (o.isStatic() || e)) {
                            n = o.getType();
                            r.push(o)
                        }
                    } else {
                        if (a == n) {
                            r.push(o)
                        } else {
                            if (a != this.assetNumber)
                                throw new Error("colorType must be asset number!");
                            if (!u || u.getType() == n || u.getType() == this.assetNumber)
                                r.push(o);
                            else {
                                r.push(o);
                                if (r.length >= 3)
                                    t.push(r);
                                n = u.getType();
                                r = new Array;
                                r.push(o)
                            }
                        }
                    }
                }
                if (r.length >= 3)
                    t.push(r);
                n = -1;
                r = new Array
            }
            return t
        };
        t.prototype.findVerticalMatches = function(e) {
            var t = new Array;
            var n = -1;
            var r = new Array;
            for (var i = 0; i < this.fieldWidth; i++) {
                for (var s = 0; s < this.fieldHeight; s++) {
                    var o = this.cells[i][s];
                    var u = s + 1 < this.fieldHeight ? this.cells[i][s + 1] : null;
                    if (u && (u.object == null || !u.isStatic() && !e))
                        u = null;
                    var a = o.getType();
                    if (o.object == null || !o.isStatic() && !e || a != n && a != this.assetNumber) {
                        if (r.length >= 3)
                            t.push(r);
                        n = -1;
                        r = new Array;
                        if (o.object && (o.isStatic() || e)) {
                            n = o.getType();
                            r.push(o)
                        }
                    } else {
                        if (a == n) {
                            r.push(o)
                        } else {
                            if (a != this.assetNumber)
                                throw new Error("colorType must be asset number!");
                            if (!u || u.getType() == n || u.getType() == this.assetNumber)
                                r.push(o);
                            else {
                                r.push(o);
                                if (r.length >= 3)
                                    t.push(r);
                                n = u.getType();
                                r = new Array;
                                r.push(o)
                            }
                        }
                    }
                }
                if (r.length >= 3)
                    t.push(r);
                n = -1;
                r = new Array
            }
            return t
        };
        t.prototype.removeMatches = function(e) {
            return;
            for (var t in e) {
                var n = e[t];
                var r = false;
                for (var i in n) {
                    var s = n[i];
                    if (s.object) {
                        if (!r && s.getType() >= 0) {
                            r = true;
                            this.onGroupRemove(n.length, s.object)
                        }
                        s.clearCell()
                    }
                }
            }
        };
        t.prototype.onGroupRemove = function(e, t) {};
        t.prototype.pushObjects = function(e, t) {
            if (typeof e === "undefined") {
                e = -1
            }
            if (typeof t === "undefined") {
                t = -1
            }
            var n = 0;
            n += this.pushBaseObjects(e, t);
            n += this.pushHoles();
            return n
        };
        t.prototype.pushBaseObjects = function(e, t) {
            if (typeof e === "undefined") {
                e = -1
            }
            if (typeof t === "undefined") {
                t = -1
            }
            var n = 0;
            for (var r = 0; r < this.fieldWidth; r++) {
                if (e != -1 && r != e)
                    continue;
                for (var i = this.fieldHeight - 1; i >= 0; i--) {
                    if (t != -1 && i != t)
                        continue;
                    var s = this.cells[r][i];
                    var o = s._isBlock || s.isTempBlock;
                    if (o)
                        continue;
                    if (s.object == null && !o) {
                        var u = -1;
                        var a = false;
                        for (var f = i - 1; f >= 0; f--) {
                            var l = this.cells[r][f];
                            var c = l._isBlock || l.isTempBlock;
                            if (c || l.isWaitingForClear) {
                                a = true;
                                break
                            } else if (l.object != null && !c && !l.object.isMoving) {
                                u = f;
                                break
                            }
                        }
                        if (u != -1 && !a) {
                            var h = s.pos;
                            l.object.moveTo(h.x, h.y, false, .05);
                            s.setObject(l.object);
                            l.object = null;
                            ++n
                        }
                    }
                }
            }
            return n
        };
        t.prototype.pushHoles = function() {
            var e = 0;
            for (var t = 0; t < this.fieldWidth; ++t) {
                var n = this.isEnded;
                for (var r = 0; r < this.fieldHeight; ++r) {
                    var i = this.cells[t][r];
                    var s = i._isBlock || i.isTempBlock;
                    if (s) {
                        n = true;
                        continue
                    } else if (i.object == null && n) {
                        if (i.blockWasRemovedRecently)
                            continue;
                        var o = Math.random() > .5;
                        var u = [new createjs.Point(t + (o ? 1 : -1), r - 1), new createjs.Point(t + (o ? -1 : 1), r - 1)];
                        for (var a = 0; a < 2; a++) {
                            var f = u[a];
                            if (!(f.x >= 0 && f.y >= 0 && f.x < this.fieldWidth && f.y < this.fieldHeight))
                                continue;
                            var l = this.cells[f.x][f.y];
                            if (l.isStable() && l.object != null && !l.isWaitingForClear && !l.isTempBlock && !l.isColorBlocked) {
                                var c = i.pos;
                                l.object.moveTo(c.x, c.y, false, .05, true);
                                i.setObject(l.object);
                                l.object = null;
                                ++e;
                                break
                            }
                        }
                    } else if (i.object != null && n) {
                        n = false
                    }
                }
            }
            return e
        };
        t.prototype.addObjects = function(e, n) {
            if (typeof e === "undefined") {
                e = -1
            }
            if (typeof n === "undefined") {
                n = -1
            }
            if (this.isEnded)
                return 0;
            var r = 0;
            for (var i = 0; i < this.fieldWidth; i++) {
                if (e != -1 && i != e)
                    continue;
                var s = false;
                for (var o = 0; o < this.fieldHeight; o++) {
                    if (n != -1 && o != n)
                        continue;
                    if (this.cells[i][o].object || this.cells[i][o].isBlock()) {
                        if (this.isGenerated)
                            break;
                        else
                            s = true
                    } else {
                        var u = this.gridToStage(i, o);
                        var a = -1;
                        if (s) {
                            if (this.getCellDataColor(i, o) <= 0)
                                continue;
                            else
                                a = o
                        }
                        var f = this.gridToStage(i, a);
                        var l = this.getObjectType(i, o);
                        var c = t.pool.getObject(this.cells[i][o], f, this.assetNumber, l);
                        if (a != o)
                            c.moveTo(u.x, u.y);
                        this.cells[i][o].setObject(c);
                        ++r
                    }
                }
            }
            return r
        };
        t.prototype.getObjectType = function(e, t) {
            if (!this.isGenerated) {
                var n = this.getCellDataColor(e, t);
                return n - 1
            }
            return this.target.getExactType(e, t)
        };
        t.getCellDataType = function(e, n, r) {
            if (!e)
                return -1;
            return parseInt(e.charAt(2 * (r + n * t.LEVEL_H) + 1))
        };
        t.prototype.getCellDataColor = function(e, t) {
            if (!this.cellData)
                return -1;
            return parseInt(this.cellData.charAt(2 * (t + e * this.fieldHeight) + 2))
        };
        t.prototype.generateCells = function() {
            for (var e = 0; e < this.fieldWidth; e++) {
                for (var n = 0; n < this.fieldHeight; n++) {
                    var r = this.cells[e][n];
                    var i = t.getCellDataType(this.cellData, e, n);
                    switch (i) {
                        case 0:
                        case -1:
                            break;
                        case 1:
                            r.setBlock();
                            break;
                        case 2:
                            r.setBlock(1);
                            break;
                        case 3:
                            r.setBlock(2);
                            break;
                        case 4:
                            r.setBlock(0, true);
                            break;
                        case 5:
                            r.setMark(1);
                            break;
                        case 6:
                            r.setMark(2);
                            break
                    }
                    var s = this.getCellDataColor(e, n);
                    if (s == 5)
                        r.setBlock(0, true)
                }
            }
        };
        t.prototype.generateField = function() {
            this.addObjects();
            this.target.onLevelGenerated();
            if (this.levelData.levelNumber == 1) {
                this.cells[App.episode <= 1 ? 1 : 4][App.episode <= 1 ? 4 : 5].object.setBonusType(3);
                this.cells[App.episode <= 1 ? 2 : 3][App.episode <= 1 ? 7 : 7].object.setBonusType(1)
            }
        };
        t.prototype.generate = function() {
            this.assetNumber = 4;
            this.generateCells();
            this.generateField();
            this.isGenerated = true;
            App.game.needToUpdateBack = true
        };
        t.prototype.getRandomType = function() {
            this.fieldCount++;
            var e = getInt(1e3);
            var t = e % this.assetNumber;
            return t
        };
        t.prototype.getChangeType = function() {
            return getInt(1e3) % this.assetNumber
        };
        t.prototype.setBackground = function(e) {
            this.background = e
        };
        t.prototype.setFieldProps = function(e, t, n, r, i) {
            this.tileSize = e;
            this.offsetX = t;
            this.offsetY = n + App.SHIFT_H;
            this.fieldWidth = r;
            this.fieldHeight = i
        };
        t.prototype.gridToStage = function(e, t) {
            return new createjs.Point(this.offsetX + (e + .5) * this.tileSize, this.offsetY + (t + .5) * this.tileSize)
        };
        t.prototype.stageToGrid = function(e, t) {
            return new createjs.Point((e - this.offsetX) / this.tileSize, (t - this.offsetY) / this.tileSize)
        };
        t.prototype.getCellCenterCoordinates = function(e, t) {
            return new createjs.Point(this.offsetX + (e + .5) * this.tileSize, this.offsetY + (t + .5) * this.tileSize)
        };
        Object.defineProperty(t.prototype, "isWaitingForTarget", {
            get: function() {
                return this.showTargetIn > 0
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.reset = function() {
            if (this.isActive) {
                removeClip(this);
                this.isEnded = false;
                this.currentMove = 0;
                this.playLoseIn = 1.3;
                this.uncache();
                this.isPaused = false;
                this._isHardLocked = false;
                this.showTargetIn = .3;
                this.isGenerated = false;
                this.showWinMenuIn = -1;
                var e = 0;
                var t = 0;
                for (var n = 0; n < this.fieldWidth; ++n) {
                    for (var r = 0; r < this.fieldHeight; ++r)
                        this.cells[n][r].reset()
                }
                var i = this.objects.length;
                for (var s = 0; s < i; ++s)
                    this.objects[s].destroy();
                this.objects = [];
                this.target = null;
                this.hud.reset();
                removeClip(this.marks);
                removeClip(this.back);
                App.game.backStage.removeAllChildren();
                App.game.needToUpdateBack = true
            }
        };
        t.bonusScores = [0, 80, 80, 100, 150, 110, 180, 180, 250, 280, 500];
        t.COMBO_TIME = 70;
        t.OLD_TILE_SIZE = 50;
        t.TILE_SIZE = 59;
        t.LEVEL_W = 10;
        t.LEVEL_H = 10;
        t.TILE_SIZE_FACTOR = t.TILE_SIZE / t.OLD_TILE_SIZE;
        t.MIN_LINE_SIZE = 4;
        return t
    }
    (createjs.Container);
var App = function() {
        function e() {
            var t = this;
            this.needToUpdateBack = false;
            this.musicPlayed = false;
            this.gameTime = 0;
            this.isPaused = false;
            this.timeSinceAds = 0;
            e.game = this;
            if (window.top != window) {
                document.getElementById("header").style.display = "none"
            }
            this.backStage = new createjs.Stage("canvas_back");
            this.stage = new createjs.Stage("canvas");
            this.backStage.enableMouseOver(0);
            createjs.Touch.enable(this.stage, true);
            this.preloader = new Preloader;
            setTimeout(function() {
                window.scrollTo(0, 1)
            }, 1e3);
            if (viewporter && viewporter.ACTIVE) {
                window.addEventListener("viewportready", function() {
                    return t.resize()
                }, true);
                window.addEventListener("viewportchange", function() {
                    return t.resize()
                }, true)
            } else
                window.addEventListener("resize", function() {
                    return t.resize()
                }, true);
            this.resize();
            document.addEventListener("touchmove", touchHandlerDummy, false);
            window.addEventListener("touchmove", touchHandlerDummy, false);
            window.addEventListener("touchstart", function() {});
            createjs.Ticker.setFPS(320);
            createjs.Ticker.addEventListener("tick", function(e) {
                t.update(e)
            });
            this.stage.addEventListener("stagemousedown", function(e) {
                t.onPreloaderDown(e)
            })
        }
        e.prototype.loadApi = function() {
            console.log('more games error');
            e.game.onLoadComplete()
        };
        e.prototype.showAds = function() {
            var e = this;
            var t = this.timeSinceAds / 60;
            if (t >= 5) {
                gradle.event('showAds');
                apiInstance.GameBreak.request(function() {
                    return e.pauseGame()
                }, function() {
                    return e.resumeGame()
                })
            }
        };
        e.prototype.pauseGame = function() {
            this.isPaused = true;
            SoundsManager.instance.pauseMusic();
            this.timeSinceAds = 0
        };
        e.prototype.resumeGame = function() {
            this.isPaused = false;
            SoundsManager.instance.resumeMusic();
            this.timeSinceAds = 0
        };
        e.prototype.onLoadComplete = function() {
            var e = this;
            if (this.levelManager)
                return;
            this.timeSinceAds = 0;
            this.resize();
            this.levelManager = new LevelManager;
            var t = this.preloader.loader.getResult("artJson");
            t.images[0] = this.preloader.loader.getResult("art.png");
            spriteSheetInfo = t;
            createAnimation("chocolate white destr", "chocolate white destr", 1, 18, 1, null, 50);
            createAnimation("color bonus", "color bonus", 1, 37, 1, null, 50);
            createAnimation("bonus blink", "color bonus", 30, 37, 1, null, 50);
            createAnimation("chocolate destroy", "chocolate destroy", 1, 15, 1, null, 50);
            createAnimation("color wall", "color wall", 1, 18, 1, null, 50);
            createAnimation("bluex", "blue", 1, 16, 1, null, 50);
            createAnimation("greenx", "green", 1, 13, 1, null, 50);
            createAnimation("orangex", "orange", 1, 17, 1, null, 50);
            createAnimation("purplex", "purple", 1, 16, 1, null, 50);
            createFontFrames(t);
            this.atlas = new createjs.SpriteSheet(t);
            this.animationManager = new AnimationManager;
            this.animationManager.putAnimation("logo", this.preloader.loader.getResult("logo text"), 0);
            this.animationManager.putAnimation("button", this.preloader.loader.getResult("button text"), 0);
            this.animationManager.putAnimation("Char", this.preloader.loader.getResult("Char win"), 0);
            this.animationManager.putAnimation("Char lose", this.preloader.loader.getResult("Char lose"), 0);
            this.animationManager.putAnimation("gloss anim", this.preloader.loader.getResult("gloss anim"), 0);
            this.animationManager.putAnimation("pointer", this.preloader.loader.getResult("pointer"), 0);
            this.animationManager.putAnimation("buttons anim", this.preloader.loader.getResult("buttons pause anim"), 0);
            t = this.preloader.loader.getResult("font2Json");
            t.images[0] = this.preloader.loader.getResult("font2.png");
            createFontFrames(t);
            this.fontAtlas = new createjs.SpriteSheet(t);
            if (!Match3Level.pool)
                Match3Level.pool = new ObjectPool;
            Match3Level.instance = new Match3Level;
            this.soundManager = new SoundsManager;
            this.stage.removeAllEventListeners();
            this.stage.addEventListener("stagemousedown", function(t) {
                e.onDown(t)
            });
            this.stage.addEventListener("stagemouseup", function(t) {
                e.onUp(t)
            });
            this.menuManager = new MenuManager;
            splashScreenData = apiInstance.Branding.getSplashScreen();
            this.preloader.disable();
            console.log("need splash:", splashScreenData.show);
            if (splashScreenData && splashScreenData.show) {
                this.menuManager.show(this.menuManager.splashMenu, false);
                gradle.event('show_splash');

            } else
                this.menuManager.show(this.menuManager.mainMenu, true);
            this.resize();
            this.setVisibilityListener()
        };
        e.prototype.update = function(t) {
            if (this.isPaused)
                return;
            if (this.needToUpdateBack) {
                this.backStage.update(t);
                this.needToUpdateBack = false
            }
            this.stage.update(t);
            if (e.level && e.level.isActive)
                e.level.update(t.delta / 1e3);
            if (this.menuManager)
                this.menuManager.update(t.delta / 1e3);
            if (this.preloader)
                this.preloader.update(t.delta / 1e3);
            if (this.soundManager)
                this.soundManager.update(t.delta / 1e3);
            this.gameTime += t.delta / 1e3;
            this.timeSinceAds += t.delta / 1e3
        };
        e.prototype.onPreloaderDown = function(e) {
            this.preloader.onDown(e.stageX, e.stageY);
            e.nativeEvent && e.preventDefault && e.preventDefault() && e.stopPropagation()
        };
        e.prototype.onDown = function(t) {
            if (this.isPaused)
                return;
            this.soundManager.playMusic();
            var n = MenuManager.instance.credits.isMenuActive ? MenuManager.instance.credits : MenuManager.instance.current;
            var r = n == this.menuManager.target;
            if (n)
                n.onDown(t.stageX, t.stageY);
            var i = !(n != Tutorial.instance || Tutorial.instance.tapAllowed);
            if (e.level && !r && !i)
                e.level.onMouseDown(t.stageX, t.stageY);
            else if (i)
                e.level.onHudDown(t.stageX, t.stageY);
            t.nativeEvent && t.preventDefault && t.preventDefault() && t.stopPropagation()
        };
        e.prototype.onUp = function(e) {
            if (this.isPaused)
                return;
            var t = MenuManager.instance.current;
            if (t)
                t.onUp(e.stageX, e.stageY);
            e.nativeEvent && e.preventDefault && e.preventDefault() && e.stopPropagation()
        };
        e.prototype.resize = function() {
            var t = window.innerWidth,
                n = window.innerHeight;
            var r = this.stage;
            var i = t,
                s = n;
            var o = document.getElementById("portraitLock");
            if (isOrientationLocked()) {
                o.style.display = "block";
                r.canvas.style.display = "none";
                this.backStage.canvas.style.display = "none"
            } else {
                o.style.display = "none";
                r.canvas.style.display = "block";
                this.backStage.canvas.style.display = "block";
                var u = r.canvas.width,
                    a = r.canvas.height,
                    f = t / u,
                    l = n / e.SCREEN_H,
                    c = Math.min(f, l);
                var h = u * c,
                    p = a * c;
                r.canvas.style.width = this.backStage.canvas.style.width = h + "px";
                r.canvas.style.height = this.backStage.canvas.style.height = p + "px";
                e.ACTUAL_H = limit(e.SCREEN_H * l / c, e.SCREEN_H, e.FULL_SCREEN_H);
                var d = (n - p) / 2,
                    v = r.canvas.parentElement;
                e.CURRENT_SHIFT = d / c;
                r.canvas.style.top = this.backStage.canvas.style.top = d + "px";
                var m = (t - h) / 2;
                this.backStage.canvas.style.left = this.stage.canvas.style.left = (t - h) / 2 + "px"
            }
            if (this.menuManager)
                this.menuManager.onResize();
            if (this.preloader)
                this.preloader.onResize()
        };
        e.prototype.setVisibilityListener = function() {
            var e = this;
            var t = "hidden";
            var n = function() {
                return e.onVisibilityChange()
            };
            if (t in document)
                document.addEventListener("visibilitychange", n);
            else if ((t = "mozHidden") in document)
                document.addEventListener("mozvisibilitychange", n);
            else if ((t = "webkitHidden") in document)
                document.addEventListener("webkitvisibilitychange", n);
            else if ((t = "msHidden") in document)
                document.addEventListener("msvisibilitychange", n);
            else if ("onfocusin" in document)
                document.onfocusin = document.onfocusout = n;
            else
                window.onpageshow = window.onpagehide = window.onfocus = window.onblur = n
        };
        e.prototype.onVisibilityChange = function() {
            if (SoundsManager.instance.musicPaused)
                SoundsManager.instance.resumeMusic();
            else
                SoundsManager.instance.pauseMusic()
        };
        e.SCREEN_W = 640;
        e.SCREEN_H = 712 + 30;
        e.FULL_SCREEN_H = 960;
        e.ACTUAL_H = e.SCREEN_H;
        e.SHIFT_H = (e.FULL_SCREEN_H - e.SCREEN_H) / 2;
        e.CURRENT_SHIFT = 0;
        e.episode = 1;
        return e
    }
    ();
var ActionType;
(function(e) {
    e[e["ACTION_STOP"] = 0] = "ACTION_STOP";
    e[e["ACTION_GOTO_AND_PLAY"] = 1] = "ACTION_GOTO_AND_PLAY";
    e[e["ACTION_GOTO_AND_STOP"] = 2] = "ACTION_GOTO_AND_STOP"
})(ActionType || (ActionType = {}));
var FrameSelector = function() {
        function e(e) {
            this.object = e;
            this.names = new Array;
            this.values = new Array
        }
        e.prototype.getFrame = function(e, t) {
            return 0
        };
        e.prototype.testLayer = function(e) {
            return true
        };
        return e
    }
    ();
var SingleFlameSelector = function(e) {
        function t(t) {
            e.call(this, null);
            this.frame = t
        }
        __extends(t, e);
        t.prototype.getFrame = function(e, t) {
            return this.frame
        };
        return t
    }
    (FrameSelector);
var AnimatedNode = function(e) {
        function t(t, n, r) {
            e.call(this);
            this.animation = t;
            this.parts = new Array;
            this.isPlaying = true;
            this.actions = new Array;
            this.hasCycle = false;
            this.owner = null;
            this.skins = new Array;
            this.frameSelector = r;
            this.initFrameDelay = n;
            this.initParts();
            this.mouseChildren = false
        }
        __extends(t, e);
        t.prototype.createUsualSprite = function(e) {
            return createSpriteFromSpritesheet(e)
        };
        t.prototype.initParts = function() {
            this.setFrameDelay(this.animation.forceFrameDelay > 0 ? this.animation.forceFrameDelay : Math.abs(this.initFrameDelay) < 1e-10 ? 1 / DESIGN_FPS : this.initFrameDelay);
            this.totalFrames = 1;
            for (var e = 0; e < this.animation.layers.length; e++) {
                var t = this.animation.layers[e];
                if (this.frameSelector && !this.frameSelector.testLayer(this.animation.name))
                    continue;
                this.totalFrames = Math.max(this.totalFrames, t.frames.length);
                var n = this.frameSelector ? this.frameSelector.getFrame(this, t) : 0;
                if (n != -1) {
                    this.skins.push(n);
                    var r = new createjs.Container;
                    var i = null;
                    var s = t.getClipData(n);
                    i = this.createUsualSprite(s.name);
                    i.regX = i.getBounds().width * s.anchor.x;
                    i.regY = i.getBounds().height * (1 - s.anchor.y);
                    r.addChild(i);
                    this.parts.push(r);
                    this.addChild(r)
                } else {
                    this.skins.push(-1);
                    this.parts.push(null)
                }
            }
            this.gotoAndPlay(0);
            if (this.animation.transform)
                this.animation.transform.applyTransform(this);
            if (this.totalFrames <= 1)
                this.stop();
            if (this.frameSelector) {
                this.frameSelector = null
            }
            if (this.animation && this.animation.isAdd) {}
            if (this.animation && this.animation.isOverlay) {}
        };
        t.prototype.getFrameByPartIndex = function(e) {
            var t = this.animation;
            var n = e;
            var r = t.layers[n].frames[this.currentFrame];
            return r
        };
        t.prototype.disableLayer = function(e) {
            var t = this.getPartByFlashName(e);
            if (t)
                removeClip(t)
        };
        t.prototype.update = function(e) {
            limitDt(e);
            if (this.isPlaying) {
                this.currentDelay -= e;
                while (this.currentDelay <= 0) {
                    this.gotoAndPlay(this.currentFrame + 1);
                    for (var t = 0; t < this.actions.length; t++)
                        this.actions[t].checkAction();
                    this.currentDelay += this.frameDelay;
                    if (this.currentFrame == 0)
                        this.hasCycle = true
                }
            }
        };
        t.prototype.setRandomFrame = function() {
            var e = getInt(this.totalFrames);
            if (this.isPlaying)
                this.gotoAndPlay(e);
            else
                this.gotoAndStop(e)
        };
        t.prototype.setFrameDelay = function(e) {
            this.currentDelay = this.frameDelay = e
        };
        t.prototype.setFps = function(e) {
            this.setFrameDelay(1 / e)
        };
        t.prototype.isOnLastFrame = function() {
            return this.currentFrame == this.totalFrames - 1
        };
        t.prototype.setOwner = function(e) {
            this.owner = e
        };
        t.prototype.getOwner = function() {
            return this.owner
        };
        t.prototype.gotoAndPlay = function(e) {
            this.play();
            this.currentFrame = Math.max(0, e);
            this.currentFrame = this.currentFrame % this.totalFrames;
            for (var t = 0; t < this.parts.length; t++) {
                var n = this.parts[t];
                if (n) {
                    var r = this.animation;
                    var i = t;
                    var s = r.layers[i].frames[this.currentFrame];
                    s.applyTransform(n);
                    if (this.owner)
                        n.visible = n.visible && this.owner.canBeVisible(n)
                }
            }
            var o = this.currentFrame;
            for (t = 0; t < this.actions.length; t++) {
                this.actions[t].checkAction();
                if (this.currentFrame != o)
                    return
            }
        };
        t.prototype.gotoAndStop = function(e) {
            this.gotoAndPlay(e);
            this.stop()
        };
        t.prototype.play = function() {
            if (!this.isPlaying)
                this.resetFrameDelay();
            this.isPlaying = true
        };
        t.prototype.stop = function() {
            this.isPlaying = false;
            this.resetFrameDelay()
        };
        t.prototype.resetFrameDelay = function() {
            this.currentDelay = this.frameDelay
        };
        t.prototype.getCurrentDelay = function() {
            return this.currentDelay
        };
        t.prototype.setCurrentDelay = function(e) {
            this.currentDelay = this.frameDelay * e
        };
        t.prototype.getFloatFrame = function() {
            return this.currentFrame + limit((this.frameDelay - this.currentDelay) / this.frameDelay, 0, 1)
        };
        t.prototype.setPartSkin = function(e, t, n) {
            if (typeof n === "undefined") {
                n = false
            }
            var r = this.animation.getLayerByFlashName(e);
            var i = this.parts[r].getChildAt(0);
            var s = this.animation.layers[r];
            if (n)
                t = s.clipDatas.length + t;
            this.skins[r] = t;
            var o = s.getClipData(t);
            i.gotoAndStop(o.name);
            i.regX = i.getBounds().width * o.anchor.x;
            i.regY = i.getBounds().height * (1 - o.anchor.y)
        };
        t.prototype.getPart = function(e) {
            return this.parts[e]
        };
        t.prototype.getPartByFlashName = function(e) {
            return this.getPart(this.animation.getLayerByFlashName(e))
        };
        t.prototype.getPartSkin = function(e) {
            return this.skins[e]
        };
        t.prototype.getPartSkinByName = function(e) {
            return this.getPartSkin(this.animation.getLayerByFlashName(e))
        };
        t.prototype.getSkinByFlashName = function(e) {
            return this.getPartSkin(this.animation.getLayerByFlashName(e))
        };
        t.prototype.updateOwnerVisibility = function() {
            for (var e = 0; e < this.parts.length; e++) {
                var t = this.parts[e];
                if (t && this.owner)
                    t.visible = t.visible && this.owner.canBeVisible(t)
            }
        };
        t.prototype.destroy = function() {
            this.skins = null;
            this.frameSelector = null;
            for (var e = 0; e < this.parts.length; e++) {
                if (this.parts[e])
                    removeClip(this.parts[e])
            }
            this.owner = null;
            this.parts = null;
            this.actions = null
        };
        t.prototype.addAction = function(e, t, n, r) {
            if (typeof n === "undefined") {
                n = -1
            }
            if (typeof r === "undefined") {
                r = 1
            }
            var i = new AnimationAction(e, t, this, n, r);
            this.actions.push(i);
            return i
        };
        return t
    }
    (createjs.Container);
var FrameData = function() {
        function e(e, t, n, r, i, s, o, u, a) {
            if (typeof t === "undefined") {
                t = 100
            }
            if (typeof n === "undefined") {
                n = 0
            }
            if (typeof r === "undefined") {
                r = 0
            }
            if (typeof i === "undefined") {
                i = 0
            }
            if (typeof s === "undefined") {
                s = 1
            }
            if (typeof o === "undefined") {
                o = 1
            }
            if (typeof u === "undefined") {
                u = 0
            }
            if (typeof a === "undefined") {
                a = 0
            }
            this.visible = e;
            this.alpha = t;
            this.rotation = n;
            this.x = r;
            this.y = i;
            this.scaleX = s;
            this.scaleY = o;
            this.skewX = u;
            this.skewY = a
        }
        e.prototype.clone = function() {
            return new e(this.visible, this.alpha, this.rotation, this.x, this.y, this.scaleX, this.scaleY)
        };
        e.prototype.applyTransform = function(e) {
            e.visible = this.visible;
            if (!e.visible)
                return;
            e.alpha = this.alpha;
            e.rotation = this.rotation;
            e.x = this.x;
            e.y = this.y;
            e.scaleX = this.scaleX;
            e.scaleY = this.scaleY;
            e.skewX = this.skewX;
            e.skewY = this.skewY
        };
        e.getEmptyData = function() {
            if (!e.empty)
                e.empty = new e(false, 0, 0, 0, 0, 0, 0);
            return e.empty
        };
        return e
    }
    ();
var ClipLayerData = function() {
        function e(e, t) {
            this.name = e.split(".")[0];
            this.anchor = t
        }
        return e
    }
    ();
var LayerData = function() {
        function e(e, t, n) {
            this.isMark = n;
            this.frames = new Array;
            this.name = e;
            this.flashName = t;
            this.clipDatas = new Array
        }
        e.prototype.addFrame = function(e) {
            this.frames.push(e)
        };
        e.prototype.addClipData = function(e) {
            this.clipDatas.push(e)
        };
        e.prototype.getClipData = function(e) {
            return name == "none" ? null : e < this.clipDatas.length ? this.clipDatas[e] : this.clipDatas[this.clipDatas.length - 1]
        };
        e.prototype.clone = function() {
            var t = new e(this.name, this.flashName, false);
            for (var n = 0; n < this.clipDatas.length; n++)
                t.addClipData(new ClipLayerData(this.clipDatas[n].name, this.clipDatas[n].anchor));
            for (n = 0; n < this.frames.length; n++)
                t.addFrame(frames[n].clone());
            return t
        };
        return e
    }
    ();
var AnimationData = function() {
        function e(e, t) {
            this.layerNameMap = {};
            this.layers = new Array;
            this.animationDatas = new Array;
            this.name = e;
            this.transform = t;
            this.isAdd = false;
            this.forceFrameDelay = -1;
            this.isOverlay = false
        }
        e.prototype.setAdd = function() {
            this.isAdd = true;
            return this
        };
        e.prototype.setScale = function(e, t) {};
        e.prototype.shift = function(e, t) {
            return this
        };
        e.prototype.addLayer = function(e) {
            var t = this.layers.length;
            this.layerNameMap[e.flashName] = t;
            this.layers.push(e)
        };
        e.prototype.addData = function(e) {
            this.animationDatas.push(e)
        };
        e.prototype.getLayerByFlashName = function(e) {
            return this.layerNameMap[e]
        };
        e.prototype.connectLayers = function(e) {
            return this
        };
        e.prototype.makeTheSameAmountOfFramesInAllLayers = function() {
            var e = 0;
            for (var t = 0; t < this.layers.length; ++t)
                e = Math.max(e, this.layers[t].frames.length);
            for (t = 0; t < this.layers.length; ++t) {
                var n = this.layers[t];
                while (n.frames.length < e)
                    n.addFrame(FrameData.getEmptyData())
            }
        };
        e.prototype.cloneLayer = function(e, t) {
            var n = this.getLayerByFlashName(e);
            var r = this.getLayerByFlashName(t);
            this.layers[r].frames = this.layers[n].frames
        };
        return e
    }
    ();
var AnimationManager = function() {
        function e() {
            this.data = {};
            e.instance = this;
            this.data = {}
        }
        e.prototype.putAnimation = function(e, t, n) {
            var r = this.parseAnimation(t, n);
            this.data[e] = r;
            return r
        };
        e.prototype.parseAnimation = function(e, t) {
            var n = new AnimationData(e.name, null);
            var r = 0;
            var i = e.l.length == undefined ? 1 : e.l.length;
            for (var s = 0; s < i; ++s) {
                var o = i == 1 ? e.l : e.l[s];
                var u = o.flashName;
                var a = o.isMark != undefined;
                var f = new LayerData(o.name, u ? u : "", a);
                var l = o.d.length == undefined ? 1 : o.d.length;
                for (var c = 0; c < l; ++c) {
                    var h = l == 1 ? o.d : o.d[c];
                    var p = h.name;
                    var d = p.split("/");
                    var v = d[d.length - 1];
                    var m = parseFloat(h.anchorX);
                    var g = parseFloat(h.anchorY);
                    var y = new ClipLayerData(v, new createjs.Point(m, g > 0 ? 1 - g : 1 - g));
                    f.addClipData(y)
                }
                for (var b = 0; b < t; b++)
                    f.addFrame(FrameData.getEmptyData());
                var w = o.f.length == undefined ? 1 : o.f.length;
                for (var E = 0; E < w; ++E) {
                    var S = null;
                    var x = w == 1 ? o.f : o.f[E];
                    var T = x.v != undefined && x.v != null ? x.v : true;
                    if (!T) {
                        S = FrameData.getEmptyData()
                    } else {
                        var N = T ? x.a != undefined ? parseFloat(x.a) : 100 : 0;
                        N /= 100;
                        var C = T ? parseFloat(x.r) : 0;
                        var k = T ? parseFloat(x.x) : 0;
                        var L = T ? parseFloat(x.y) : 0;
                        var A = T ? parseFloat(x.scX) : 0;
                        var O = T ? parseFloat(x.scY) : 0;
                        var M = T ? parseFloat(x.skX) : 0;
                        var _ = T ? parseFloat(x.skY) : 0;
                        S = new FrameData(T, N, C, k, L, A, O, M, _)
                    }
                    f.addFrame(S)
                }
                n.addLayer(f);
                r = Math.max(r, E)
            }
            n.makeTheSameAmountOfFramesInAllLayers();
            return n
        };
        e.prototype.getAnimation = function(e) {
            return this.data[e]
        };
        return e
    }
    ();
var AnimationAction = function() {
        function e(e, t, n, r, i) {
            this.frame = e;
            this.type = t;
            this.animation = n;
            this.data = r;
            this.probability = i;
            this.isEnabled = true;
            this.frameSelector = null
        }
        e.prototype.checkAction = function() {
            if (this.isEnabled && this.animation.currentFrame == this.frame && this.animation.isPlaying && Math.random() <= this.probability) {
                switch (this.type) {
                    case 0:
                        this.animation.stop();
                        break;
                    case 1:
                        this.animation.gotoAndPlay(this.calcNextFrame());
                        break;
                    case 2:
                        this.animation.gotoAndStop(this.data);
                        break
                }
            }
        };
        e.prototype.calcNextFrame = function() {
            var e = !this.frameSelector ? this.data : this.frameSelector.selectFrame(this.frame);
            if (e == -1)
                e = this.data;
            return e
        };
        e.prototype.setSelector = function(e) {
            this.frameSelector = e
        };
        e.prototype.setEnabled = function(e) {
            this.isEnabled = e
        };
        e.prototype.getEnabled = function() {
            return this.isEnabled
        };
        return e
    }
    ();
var Hud = function(e) {
        function t() {
            var t = this;
            e.call(this);
            this.sprites = [];
            this.currentPercent = 0;
            this.barScale = .9;
            this.currentMoves = -1;
            this.currentTarget = "";
            this.currentScore = 0;
            this.starScales = [.4, .75, 1];
            this.stars = [];
            this.clickables = [];
            this.starsEarned = [false, false, false];
            this.shuffleText = new createjs.Container;
            var n = new createjs.Container;
            this.sprite = n;
            addChild(this.sprite, this.level.hudLayer);
            var r = this.sprite;
            var i = ["border_down", "border_top", "border_left", "border_right", "border"];
            var s = [cjp(0, 762 - 37), cjp(0, 0), cjp(0, 103), cjp(App.SCREEN_W, 103), cjp(0, 0)];
            var o = [cjp(0, 58), cjp(0, 0), cjp(0, 0), cjp(35, 0), cjp(0, 0)];
            for (var u = 0; u < 4; ++u) {
                var a = createSpriteFromSpritesheet(i[u]);
                a.x = s[u].x;
                a.y = s[u].y + App.SHIFT_H;
                a.regX = o[u].x;
                a.regY = o[u].y;
                r.addChild(a)
            }
            var f = createSpriteFromSpritesheet("progressbar bpttom");
            var l = new createjs.Bitmap(App.game.preloader.loader.getResult("bar"));
            var c = createSpriteFromSpritesheet("moves");
            var h = createBitmap("logo top");
            var p = createBitmap("logo top");
            addChild(f, n);
            addChild(l, n);
            addChild(c, n);
            this.barRect = l.getBounds().clone();
            this.bar = l;
            f.x = 326 + 78 - 7 - 25;
            f.y = -5 + App.SHIFT_H + 5;
            f.scaleX = f.scaleY = this.barScale;
            l.x = f.x + 27 - 5 - 2;
            l.y = f.y + 15 + 2 - 2;
            l.scaleX = l.scaleY = this.barScale;
            c.x = -2 + 25 - 10;
            c.y = -3 + App.SHIFT_H + 4;
            c.scaleX = c.scaleY = this.barScale;
            h.x = 0;
            h.y = App.FULL_SCREEN_H - h.getBounds().height - 105 + App.SHIFT_H + 120 - 3 + 21;
            h.regX = 640;
            h.scaleX = -1;
            h.scaleY = -1;
            p.x = 0;
            p.y = App.SHIFT_H - h.getBounds().height + 2;
            this.sprites.push(p, this.sprite, f, l, c, h);
            var d = new createjs.BitmapText("xxx", App.game.fontAtlas);
            d.letterSpacing = -11;
            d.scaleX = d.scaleY = .9;
            this.movesText = d;
            n.addChild(this.movesText);
            var d = new createjs.BitmapText("1", App.game.atlas);
            d.letterSpacing = -10;
            d.scaleX = d.scaleY = 1;
            this.targetText = d;
            n.addChild(this.targetText);
            var d = new createjs.BitmapText("score", App.game.atlas);
            d.letterSpacing = -10;
            this.scoreText = d;
            d.x = 100;
            d.getBounds();
            d.x = 1e3;
            var v = d.getBounds();
            n.addChild(this.scoreText);
            var d = new createjs.BitmapText("x", App.game.atlas);
            d.letterSpacing = -10;
            d.scaleX = d.scaleY = .6;
            d.x = 240 - 15;
            d.y = App.SHIFT_H + 2 + 10;
            this.targetXText = d;
            n.addChild(this.targetXText);
            var m = createSpriteFromSpritesheet("cookie");
            m.x = 210 - 15;
            m.y = App.SHIFT_H + 45;
            n.addChild(m);
            this.targetIcon = m;
            for (var u = 0; u < 3; ++u) {
                m = createSpriteFromSpritesheet("progressbar star");
                m.regX = m.getBounds().width / 2;
                m.regY = m.getBounds().height * 1.25;
                var g = l.x + 5 - 25;
                var y = l.x + l.getTransformedBounds().width - 3;
                m.y = App.SHIFT_H + 9 + m.regY;
                n.addChild(m);
                m.x = lerp(g, y, this.starScales[u]);
                this.stars.push(m)
            }
            this.pauseButton = createSpriteFromSpritesheet("pause button");
            this.pauseButton.scaleX = -1;
            this.pauseButton.x = App.SCREEN_W + 10;
            this.pauseButton.y = App.SHIFT_H - .5;
            n.addChild(this.pauseButton);
            var b = new ClickableObject(this.pauseButton);
            b.setCircle(85, 0, 0);
            b.callback = function() {
                t.pauseLevel()
            };
            this.clickables.push(b);
            this.clickables.push(new LogoObject(n, 80, 830 - 3, .8));
            for (var u = 0; u < 2; ++u) {
                var d = new createjs.BitmapText(u == 0 ? "no possible" : "moves!", App.game.fontAtlas);
                d.letterSpacing = -10;
                d.spaceWidth = 25;
                d.x = u == 0 ? -220 : -125;
                d.y = u == 0 ? 0 : 65;
                this.shuffleText.addChild(d)
            }
            this.update(0)
        }
        __extends(t, e);
        t.prototype.playShuffleAnimation = function() {
            var e = this;
            this.sprite.addChild(this.shuffleText);
            this.shuffleText.x = App.SCREEN_W / 2;
            this.shuffleText.y = App.SHIFT_H + 400;
            this.shuffleText.alpha = 0;
            createjs.Tween.get(this.shuffleText, {
                loop: false
            }).to({
                alpha: 1,
                y: this.shuffleText.y - 200
            }, 400, createjs.Ease.quadInOut).wait(300).to({
                alpha: 0,
                y: this.shuffleText.y - 400
            }, 400, createjs.Ease.quadIn).call(function() {
                return e.stopShuffle()
            })
        };
        t.prototype.onDown = function(e, t) {
            var n = this.clickables.length;
            for (var r = 0; r < n; ++r) {
                var i = this.clickables[r];
                if (i && i.checkClick(e, t)) {
                    i.onClick();
                    break
                }
            }
        };
        t.prototype.stopShuffle = function() {
            removeClip(this.shuffleText)
        };
        t.prototype.isShuffleActive = function() {
            return this.shuffleText.parent != null
        };
        t.prototype.show = function() {
            this.currentMoves = -1;
            this.currentTarget = "";
            this.currentScore = -1;
            this.currentPercent = 0;
            this.bar.sourceRect = new createjs.Rectangle(0, 0, limit(this.barRect.width * 0, 1, this.barRect.width), this.barRect.height);
            for (var e = 0; e < 3; ++e)
                this.starsEarned[e] = false;
            addChild(this.sprites[0], App.game.backStage);
            addChild(this.sprites[5], App.game.backStage);
            App.game.needToUpdateBack = true;
            this.scores = Match3Level.instance.target.scores;
            var t = Match3Level.instance.target.getText();
            this.targetIcon.gotoAndStop(t[2]);
            this.targetIcon.regX = this.targetIcon.getBounds().width / 2;
            this.targetIcon.regY = this.targetIcon.getBounds().height / 2;
            this.targetIcon.scaleX = this.targetIcon.scaleY = 55 / Math.max(this.targetIcon.getBounds().width, this.targetIcon.getBounds().height);
            removeClip(this.shuffleText);
            this.update(0)
        };
        t.prototype.pauseLevel = function() {
            if (MenuManager.instance.target.sprite.parent || Match3Level.instance.isWaitingForTarget && !Match3Level.instance.isHardLocked || MenuManager.instance.current == MenuManager.instance.tutorial)
                return;
            this.level.pause();
            SoundsManager.instance.playSound("pause")
        };
        t.prototype.updateBar = function(e) {
            var t = Match3Level.instance.score / this.scores[2];
            t = limit(t, 0, 1);
            var n = t - this.currentPercent;
            var r = .005 * 60 * e;
            if (Math.abs(n) <= r)
                this.currentPercent = t;
            else
                this.currentPercent += r * n / Math.abs(n);
            var i = this.scores.length;
            var s = 1;
            for (var o = 0; o < i; ++o) {
                var u = o == 0 ? 0 : this.scores[o - 1] / this.scores[2];
                var a = this.scores[o] / this.scores[2];
                if (this.currentPercent >= u && this.currentPercent <= a) {
                    s = lerp(o == 0 ? 0 : this.starScales[o - 1], this.starScales[o], (this.currentPercent - u) / (a - u));
                    break
                }
            }
            this.bar.sourceRect = new createjs.Rectangle(0, 0, limit(this.barRect.width * s, 1, this.barRect.width), this.barRect.height);
            var f = o - 1;
            if (f >= 0 && !this.starsEarned[f]) {
                this.starsEarned[f] = true;
                this.stars[f].scaleY = 2.5;
                this.stars[f].scaleX = 2;
                createjs.Tween.get(this.stars[f], {
                    loop: false
                }).wait(0).to({
                    scaleY: 1,
                    scaleX: 1
                }, 400, createjs.Ease.quadOut)
            }
        };
        t.prototype.forceFullUpdate = function() {
            this.updateBar(10);
            this.scoreText.text = Match3Level.instance.score.toString()
        };
        Object.defineProperty(t.prototype, "starEarnedAmount", {
            get: function() {
                var e = 0;
                for (var t = 0; t < 3; ++t)
                    if (this.starsEarned[t])
                        e++;
                return e
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            if (Match3Level.instance && this.scores)
                this.updateBar(t);
            if (this.level.target && this.level.target.isCompleted && (!this.level.target.isScoreTarget || this.level.movesLeft <= 0))
                this.level.starMoveAwardMode();
            var n = Match3Level.instance.movesLeft;
            if (this.currentMoves != n) {
                createjs.Tween.removeTweens(this.movesText);
                this.currentMoves = n;
                this.movesText.text = n.toString();
                this.movesText.scaleX = this.movesText.scaleY = .9;
                var r = getTextSize(this.movesText);
                this.movesText.regX = r.x / 2;
                this.movesText.regY = 62;
                this.movesText.x = 117 - 10;
                this.movesText.y = App.SHIFT_H + 2 + 77 - 22;
                this.movesText.scaleY = 1.5;
                createjs.Tween.get(this.movesText, {
                    loop: false
                }).wait(0).to({
                    scaleY: 1
                }, 200, createjs.Ease.quadOut)
            }
            if (Match3Level.instance && Match3Level.instance.target) {
                var i = Match3Level.instance.target.getTargetText();
                if (i != this.currentTarget) {
                    createjs.Tween.removeTweens(this.targetText);
                    this.currentTarget = i;
                    var s = i.charAt(0) == "x";
                    this.targetXText.visible = s;
                    var o = s ? i.substr(1, i.length - 1) : i;
                    this.targetText.text = o;
                    var r = getTextSize(this.targetText);
                    this.targetText.regX = 0;
                    this.targetText.regY = r.y * 1.5;
                    this.targetText.x = s ? this.targetXText.x + 32 - 5 : this.targetXText.x;
                    this.targetText.y = App.SHIFT_H + 1 + 59 + 2;
                    this.targetText.scaleY = 2;
                    createjs.Tween.get(this.targetText, {
                        loop: false
                    }).wait(0).to({
                        scaleY: 1
                    }, 200, createjs.Ease.quadOut)
                }
            }
            var u = Match3Level.instance.score;
            if (this.currentScore != u) {
                createjs.Tween.removeTweens(this.scoreText);
                this.currentScore = u;
                this.scoreText.text = u.toString();
                var r = getTextSize(this.scoreText);
                this.scoreText.regX = r.x / 2;
                this.scoreText.regY = r.y * 1.5;
                this.scoreText.x = 508 - 25;
                this.scoreText.y = App.SHIFT_H + 2 + 122 - 37 - 0;
                this.scoreText.scaleY = 1 * 2;
                createjs.Tween.get(this.scoreText, {
                    loop: false
                }).wait(0).to({
                    scaleY: 1
                }, 200, createjs.Ease.quadOut)
            }
        };
        t.prototype.destroy = function() {
            e.prototype.destroy.call(this)
        };
        t.prototype.reset = function() {
            this.currentPercent = 0;
            removeClip(this.sprite);
            addChild(this.sprite, this.level.hudLayer)
        };
        return t
    }
    (GameObject);
var Menu = function(e) {
        function t() {
            e.call(this);
            this.animatedButtons = [];
            this.clickables = [];
            this.isMenuActive = false
        }
        __extends(t, e);
        t.prototype.show = function() {
            if (this.sprite)
                this.stage.addChild(this.sprite);
            for (var e = 0; e < this.animatedButtons.length; ++e)
                this.animatedButtons[e].onShow();
            this.isMenuActive = true
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            var n = this.animatedButtons.length;
            for (var r = 0; r < n; ++r)
                this.animatedButtons[r].update(t)
        };
        t.prototype.hide = function() {
            removeClip(this.sprite);
            this.isMenuActive = false;
            for (var e = 0; e < this.animatedButtons.length; ++e)
                this.animatedButtons[e].onHide()
        };
        t.prototype.onResize = function() {};
        t.prototype.onDown = function(e, t) {
            var n = this.clickables.length;
            for (var r = 0; r < n; ++r) {
                var i = this.clickables[r];
                if (i && i.checkClick(e, t)) {
                    i.onClick();
                    break
                }
            }
        };
        t.prototype.onUp = function(e, t) {};
        t.prototype.restartLevel = function(e) {
            if (typeof e === "undefined") {
                e = null
            }
            LevelManager.instance.restartLevel();
            if (e)
                e.nativeEvent && e.preventDefault && e.preventDefault()
        };
        t.prototype.loadMainMenu = function(e) {
            if (typeof e === "undefined") {
                e = null
            }
            MenuManager.instance.show(MenuManager.instance.map);
            if (e)
                e.preventDefault()
        };
        return t
    }
    (GameObject);
var MenuManager = function() {
        function e() {
            this.menus = [];
            this.map = new MapMenu;
            this.mainMenu = new MainMenu;
            this.transition = new TransitionMenu;
            this.winMenu = new WinMenu;
            this.loseMenu = new LoseMenu;
            this.target = new TargetMenu;
            this.pause = new PauseMenu;
            this.result = new ResultMenu;
            this.tutorial = new Tutorial;
            this.credits = new CreditsMenu;
            this.splashMenu = new SplashScreen;
            this.menus.push(this.map, this.mainMenu, this.transition, this.winMenu, this.loseMenu, this.target, this.pause, this.result, this.credits, this.splashMenu);
            e.instance = this
        }
        e.prototype.isOnTutorial = function() {
            return this.current == this.tutorial
        };
        e.prototype.traceActive = function() {
            var e = "";
            for (var t = 0; t < this.menus.length; ++t)
                e += " " + (this.menus[t].sprite.parent && this.menus[t].sprite.visible);
            console.log(e)
        };
        e.prototype.show = function(e, t) {
            if (typeof t === "undefined") {
                t = true
            }
            try {
                if (t)
                    this.transition.play(e);
                else {
                    this.closeCurrent();
                    this.current = e;
                    this.current.show();
                    this.current.update(0)
                }
            } catch (n) {
                alert("Menu manger show error " + n);
                this.closeCurrent();
                this.current = e;
                this.current.show();
                this.transition.stopMove();
                alert("Error in menu show: " + n)
            }
        };
        e.prototype.update = function(e) {
            if (this.credits.isMenuActive)
                this.credits.update(e);
            else if (this.current && !(this.current == this.map && this.transition.isActive && this.transition.menuToShow == null && !this.transition.hasDoneAction))
                this.current.update(e);
            if (this.transition.isActive)
                this.transition.update(e)
        };
        e.prototype.closeCurrent = function() {
            if (this.current)
                this.current.hide();
            this.current = null
        };
        e.prototype.onResize = function() {
            if (this.current)
                this.current.onResize()
        };
        return e
    }
    ();
var MapMenu = function(e) {
        function t() {
            var n = this;
            e.call(this);
            this.firstShow = true;
            this.isMoving = false;
            this.height = 0;
            this.pointerIsMoving = false;
            this.currentLevel = 0;
            this.downPos = new createjs.Point;
            this.speed = 0;
            this.isDown = false;
            this.dragSpeed = 0;
            this.lastSpeed = 0;
            this.mainSprites = [];
            this.buttons = [];
            this.levelToUnlock = -1;
            this.isLevelUnlocking = false;
            this.isPlayPressed = false;
            this.pointerSprites = [];
            t.BUTTON_RADIUS = App.episode == 2 ? 25 : 30;
            this.sprite = new createjs.Container;
            this.scrollSprite = new createjs.Container;
            this.sprite.addChild(this.scrollSprite);
            var r = 0;
            var i = [
                [0, -10, -20],
                [0, -42, -44],
                [0, -39, -48]
            ];
            for (var s = 1; s <= 3; ++s) {
                var o = new createjs.Bitmap(App.game.preloader.loader.getResult("map" + s));
                var u = i[App.episode][s - 1];
                o.y = r + u;
                this.height += o.getBounds().height + u;
                this.scrollSprite.addChild(o);
                r += o.getBounds().height + u;
                this.mainSprites.push(o)
            }
            this.rect = this.scrollSprite.getBounds();
            for (s = 0; s < LevelManager.LEVEL_AMOUNT; ++s) {
                var a = mapButtons[App.episode][s];
                var f = createSpriteFromSpritesheet(a[2] ? s <= 41 ? "point big orange" : "point big pinc" : s <= 41 ? "point small orange" : "point small pinc");
                f.x = a[0];
                f.y = a[1];
                var l = f.getBounds();
                f.regX = l.width / 2;
                f.regY = l.height / 2;
                f.scaleX = a[3];
                f.scaleY = a[4];
                this.scrollSprite.addChild(f);
                this.buttons.push(f)
            }
            var c = new AnimatedNode(App.game.animationManager.getAnimation("pointer"), 1 / 30, null);
            c.stop();
            c.x = t.buttonPositions[App.episode][0][0];
            c.y = t.buttonPositions[App.episode][0][1];
            this.scrollSprite.addChild(c);
            c.addAction(c.totalFrames - 1, 0);
            c.mouseChildren = c.mouseEnabled = true;
            this.pointer = c;
            var h = new createjs.BitmapText("99", App.game.fontAtlas);
            h.letterSpacing = -10;
            h.y = -75 - 6;
            this.pointer.getPart(0).addChild(h);
            this.pointerSprites.push(h);
            for (var s = 0; s < 3; ++s) {
                var f = createSpriteFromSpritesheet("star");
                this.pointer.getPart(0).addChild(f);
                f.regX = f.getBounds().width / 2;
                f.regY = f.getBounds().height / 2;
                f.scaleX = f.scaleY = .36 + s * .08;
                f.x = s == 0 ? -47 : s == 1 ? 0 : 52;
                f.y = -110 + (s == 1 ? -11 : s == 0 ? 5 : 0);
                f.rotation = (s - 1) * 25;
                this.pointerSprites.push(f)
            }
            f = createSpriteFromSpritesheet("cookie");
            this.pointer.getPart(0).addChild(f);
            this.pointerSprites.push(f);
            f.y = -11;
            this.scrollSprite.y = 0;
            for (var s = 0; s < this.pointerSprites.length; ++s)
                this.pointerSprites[s].mouseEnabled = false;
            var p = new ClickableObject(this.pointer);
            p.setCircle(85, -2, -192);
            p.callback = function(e) {
                n.onPointerDown()
            };
            this.clickables.push(p);
            var d = new SoundButton(true, this.sprite, 570, 115 - 50);
            this.animatedButtons.push(d);
            this.clickables.push(d);
            var d = new SoundButton(false, this.sprite, 570, 215 - 50);
            this.animatedButtons.push(d);
            this.clickables.push(d);
            var d = new ButtonObject(6, function(e) {
                n.loadMain(e)
            }, this.sprite, 350 + 35, 115 - 10);
            this.animatedButtons.push(d);
            this.clickables.push(d);
            this.brandLogo = new LogoObject(this.sprite, App.SCREEN_W / 2, 0, 1);
            this.clickables.push(this.brandLogo);
            this.onResize()
        }
        __extends(t, e);
        t.prototype.onResize = function() {
            e.prototype.onResize.call(this);
            for (var t = 1; t <= 3; ++t) {
                this.clickables[t].sprite.x = 525 + (t - 2) * 75;
                this.clickables[t].sprite.y = 40 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2 + (t == 3 ? -2 : 0);
                this.clickables[t].sprite.scaleX = this.clickables[t].sprite.scaleY = t == 3 ? .55 : .75;
                this.clickables[t].updateRectScale()
            }
            if (this.brandLogo.sprite)
                this.brandLogo.sprite.y = App.ACTUAL_H - 30 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2
        };
        t.prototype.loadMain = function(e) {
            MenuManager.instance.show(MenuManager.instance.mainMenu)
        };
        t.prototype.updatePointerData = function() {
            var e = LevelManager.instance.data[this.currentLevel];
            var t = e.stars;
            var n = e.targetSpriteName;
            var r = this.pointerSprites[0];
            r.text = (e.levelNumber + 1).toString();
            r.regX = r.getBounds().width / 2;
            r.regY = r.getBounds().height / 2;
            for (var i = 0; i < 3; ++i) {
                var s = this.pointerSprites[i + 1];
                s.visible = i < t
            }
            s = this.pointerSprites[4];
            s.gotoAndStop(n);
            s.regX = s.getBounds().width / 2;
            s.regY = s.getBounds().height / 2;
            s.scaleX = s.scaleY = Math.min(45 / s.getBounds().width, 45 / s.getBounds().height)
        };
        t.prototype.show = function() {
            var t = this;
            e.prototype.show.call(this);
            this.isLevelUnlocking = this.levelToUnlock > 0;
            this.isPlayPressed = false;
            this.isMoving = false;
            this.pointerIsMoving = false;
            this.speed = 0;
            this.isDown = false;
            this.update(0);
            this.sprite.addEventListener("mousedown", function(e) {
                t.onMouseDown(e)
            });
            this.sprite.addEventListener("pressup", function(e) {
                t.onPressUp(e)
            });
            this.sprite.addEventListener("click", function(e) {
                t.onClick(e)
            });
            this.sprite.addEventListener("pressmove", function(e) {
                t.onPressMove(e)
            });
            this.firstShow = LevelManager.instance.isFirstLoad;
            if (this.firstShow) {
                LevelManager.instance.isFirstLoad = false;
                this.firstShow = false;
                this.scrollSprite.y = 0;
                var n = 1;
                this.scroll(App.ACTUAL_H - this.rect.height, 4e3 / n, 1e3 / n)
            } else if (this.isLevelUnlocking) {
                var r = this.buttons[this.levelToUnlock];
                createjs.Tween.get(r, {
                    loop: false
                }).wait(650).to({
                    scaleX: r.scaleX * 1.4,
                    scaleY: r.scaleY * 1.4,
                    alpha: .1
                }, 500, createjs.Ease.cubicOut).call(function() {
                    return t.onButtonHide()
                })
            } else {
                this.movePoinPointerToButton(LevelManager.instance.lastOpened)
            }
            this.updatePointerData()
        };
        t.prototype.fastUnlock = function(e) {
            this.levelToUnlock = -1;
            this.buttons[e].visible = false;
            removeClip(this.buttons[e])
        };
        t.prototype.onButtonHide = function() {
            this.movePoinPointerToButton(this.levelToUnlock)
        };
        t.prototype.hide = function() {
            e.prototype.hide.call(this);
            this.sprite.removeAllEventListeners();
            this.pointer.getPart(0).removeAllEventListeners()
        };
        t.prototype.destroy = function() {
            e.prototype.destroy.call(this)
        };
        t.prototype.onMouseDown = function(e) {
            if (this.isLevelUnlocking)
                return;
            this.downPos = this.scrollSprite.globalToLocal(e.stageX, e.stageY);
            this.isDown = true;
            this.dragSpeed = 0;
            e.nativeEvent && e.preventDefault && e.preventDefault()
        };
        t.prototype.onPressUp = function(e) {
            if (this.isLevelUnlocking)
                return;
            this.isDown = false;
            this.speed = this.lastSpeed;
            var t = sign(this.speed);
            this.speed = t * limit(Math.abs(this.speed), 0, 15);
            createjs.Tween.get(this, {
                loop: false
            }).wait(0).to({
                speed: 0
            }, 600, createjs.Ease.cubicOut);
            e.nativeEvent && e.preventDefault && e.preventDefault()
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            if (!this.isDown)
                this.scrollSprite.y = this.limitY(this.scrollSprite.y + this.speed);
            for (var n = 0; n < 3; ++n) {
                var r = this.mainSprites[n]
            }
            for (var n = 0; n < LevelManager.LEVEL_AMOUNT; ++n) {
                var i = this.buttons[n];
                var s = i.localToGlobal(0, 0);
                i.visible = n == this.levelToUnlock || LevelManager.instance.data[n].state == LevelData.CLOSED_STATE && !(s.y > App.ACTUAL_H + 200 || s.y < -200)
            }
            this.pointer.update(t)
        };
        t.prototype.onClick = function(e) {
            if (this.isLevelUnlocking || this.isPlayPressed)
                return;
            if (!this.isMoving && !this.pointerIsMoving) {
                var n = this.scrollSprite.globalToLocal(e.stageX, e.stageY);
                var r = t.buttonPositions[App.episode].length;
                for (var i = 0; i < r; ++i) {
                    var s = t.buttonPositions[App.episode][i];
                    if (distanceBetweenPoints(n.x, n.y, s[0], s[1]) < t.BUTTON_RADIUS) {
                        if (LevelManager.instance.data[i].state == LevelData.CLOSED_STATE)
                            return;
                        this.movePoinPointerToButton(i);
                        break
                    }
                }
            }
            e.nativeEvent && e.preventDefault && e.preventDefault()
        };
        t.prototype.movePoinPointerToButton = function(e) {
            var n = this;
            var r = t.buttonPositions[App.episode][e];
            this.pointerIsMoving = true;
            this.currentLevel = e;
            this.pointer.gotoAndPlay(0);
            createjs.Tween.get(this.pointer, {
                loop: false
            }).wait(0).to({
                x: r[0],
                y: r[1]
            }, 300 * 1.4 * .7, createjs.Ease.cubicInOut).call(function() {
                return n.stopPointerMove()
            });
            var i = r[1] - (275 + 50);
            var s = r[1] + 50;
            if (this.scrollSprite.y + i < 0)
                this.scroll(-i + 100, 300, 0);
            else if (this.scrollSprite.y + s > App.SCREEN_H + App.SHIFT_H)
                this.scroll(App.SCREEN_H + App.SHIFT_H - s - 100, 300, 0);
            this.updatePointerData();
            SoundsManager.instance.playSound("pointer_sound")
        };
        t.prototype.scroll = function(e, t, n) {
            if (typeof n === "undefined") {
                n = 0
            }
            var r = this;
            if (this.isMoving)
                return;
            this.isMoving = true;
            createjs.Tween.removeTweens(this.scrollSprite);
            this.speed = 0;
            createjs.Tween.get(this.scrollSprite, {
                loop: false
            }).wait(n).to({
                x: 0,
                y: this.limitY(e)
            }, t, createjs.Ease.cubicInOut).call(function() {
                return r.stopMove()
            });
        };
        t.prototype.onPressMove = function(e) {
            if (this.isLevelUnlocking)
                return;
            if (this.isMoving)
                return;
            var t = this.scrollSprite.localToGlobal(this.downPos.x, this.downPos.y);
            var n = this.scrollSprite.y;
            this.scrollSprite.y = this.limitY(this.scrollSprite.y + e.stageY - t.y);
            this.lastSpeed = this.scrollSprite.y - n;
            e.nativeEvent && e.preventDefault && e.preventDefault()
        };
        t.prototype.limitY = function(e) {
            var t = this.rect;
            var n = (App.ACTUAL_H - App.FULL_SCREEN_H) / 2;
            var r = -n;
            var i = -n + App.ACTUAL_H;
            if (e + t.height < i)
                e = i - t.height;
            else if (e > r)
                e = r;
            return e
        };
        t.prototype.onPointerDown = function() {
            if (this.isLevelUnlocking || this.isPlayPressed)
                return;
            if (!this.pointerIsMoving) {
                this.pointer.gotoAndPlay(0);
                var e = this.pointer.localToGlobal(this.pointer.getBounds().width / 2, 88);
                LevelManager.instance.prepareToLoadLevel(this.currentLevel);
                SoundsManager.instance.playSound("play_button");
                this.isPlayPressed = true;
                return
            }
        };
        t.prototype.stopPointerMove = function() {
            this.pointerIsMoving = false;
            this.isLevelUnlocking = false;
            this.levelToUnlock = -1;
            if (!this.pointer.isPlaying)
                this.pointer.gotoAndPlay(0)
        };
        t.prototype.stopMove = function() {
            this.isMoving = false
        };
        t.buttonPositions = [
            [
                [337, 655],
                [336, 730],
                [319, 785],
                [266, 825],
                [201, 849],
                [157, 889],
                [189, 947],
                [282, 966],
                [366, 1e3],
                [428, 1028],
                [488, 1077],
                [531, 1125],
                [550, 1168],
                [525, 1235],
                [465, 1267],
                [383, 1288],
                [353, 1342],
                [363, 1387],
                [366, 1510],
                [366, 1635],
                [377, 1739],
                [411, 1828],
                [459, 1885],
                [503, 1944],
                [517, 1995],
                [538, 2056],
                [551, 2115],
                [509, 2169],
                [431, 2174],
                [366, 2132],
                [316, 2098],
                [285, 2050],
                [226, 2019],
                [151, 2020],
                [84, 2049],
                [64, 2117],
                [62, 2184],
                [73, 2245],
                [111, 2295],
                [164, 2327],
                [244, 2362],
                [307, 2378],
                [374, 2393],
                [434, 2410],
                [507, 2442],
                [545, 2488],
                [568, 2525],
                [554, 2564],
                [501, 2586],
                [432, 2592],
                [358, 2625],
                [303, 2645],
                [269, 2679],
                [282, 2714],
                [332, 2744],
                [350, 2793],
                [315, 2827],
                [244, 2834],
                [172, 2842],
                [125, 2872]
            ].reverse(), [
                [184, 1921],
                [268, 1880],
                [328, 1826],
                [370, 1769],
                [372, 1702],
                [360, 1659],
                [313, 1623],
                [265, 1584],
                [207, 1558],
                [140, 1519],
                [171, 1473],
                [248, 1461],
                [340, 1443],
                [337, 1385],
                [305, 1319],
                [332, 1276],
                [386, 1249],
                [454, 1236],
                [522, 1206],
                [546, 1149],
                [535, 1103],
                [492, 1073],
                [432, 1043],
                [372, 1023],
                [289, 1006],
                [182, 993],
                [124, 976],
                [92, 928],
                [103, 875],
                [314, 793],
                [413, 802],
                [505, 783],
                [568, 735],
                [552, 674],
                [514, 610]
            ],
            [
                [509, 1918],
                [453, 1882],
                [404, 1841],
                [377, 1782],
                [371, 1708],
                [356, 1660],
                [354, 1600],
                [356, 1544],
                [359, 1487],
                [371, 1429],
                [362, 1390],
                [336, 1349],
                [336, 1310],
                [371, 1278],
                [421, 1236],
                [485, 1221],
                [532, 1206],
                [564, 1181],
                [571, 1142],
                [548, 1102],
                [519, 1070],
                [477, 1048],
                [421, 1028],
                [376, 1015],
                [324, 987],
                [264, 980],
                [203, 959],
                [147, 898],
                [176, 856],
                [229, 813],
                [301, 797],
                [356, 775],
                [400, 734],
                [374, 689],
                [348, 637]
            ]
        ];
        t.BUTTON_RADIUS = 30;
        return t
    }
    (Menu);
var CharMenu = function(e) {
        function t() {
            e.call(this);
            this.char = new AnimatedNode(App.game.animationManager.getAnimation("Char"), 1 / 30, null);
            this.char.visible = false;
            this.char.addAction(106, 1, 49);
            this.char.addAction(48, 1, 49);
            this.char.addAction(114, 0, -1);
            this.char.addAction(159, 0, -1);
            this.char.addAction(239, 0, -1);
            this.char.addAction(352, 0, -1);
            this.char.addAction(198, 1, 49);
            this.char.addAction(285, 1, 49);
            this.char.addAction(429, 1, 49)
        }
        __extends(t, e);
        t.prototype.onCharDown = function(e) {
            var t = this.char.currentFrame;
            if (this.char.visible && !(t >= 106 && t <= 114)) {
                this.char.gotoAndPlay(107);
                this.lookBackIn = -1;
                this.charLookIn = -1;
                this.setCharIn = lerp(0, 3, Math.random());
                SoundsManager.instance.playSound("hero_hide")
            }
            e.nativeEvent && e.preventDefault && e.preventDefault()
        };
        t.prototype.setCharLookTime = function(e) {
            if (typeof e === "undefined") {
                e = false
            }
            this.charLookIn = lerp(e ? .01 : 1, e ? 6 : 10, Math.random())
        };
        t.prototype.show = function() {
            var t = this;
            e.prototype.show.call(this);
            this.char.visible = false;
            this.setCharIn = .5;
            this.isInitHeroShow = true;
            this.char.addEventListener("click", function(e) {
                t.onCharDown(e)
            })
        };
        t.prototype.hide = function() {
            e.prototype.hide.call(this);
            this.char.removeAllEventListeners()
        };
        t.prototype.getHeroPosData = function(e) {
            return null
        };
        t.prototype.showHero = function(e) {
            if (typeof e === "undefined") {
                e = false
            }
            var t = this.getHeroPosData(e);
            this.char.x = t[0];
            this.char.rotation = t[2];
            var n = this.getCharY(t[1]);
            this.char.y = n;
            this.char.visible = true;
            this.char.gotoAndPlay(0);
            this.setCharLookTime(e);
            this.lookBackIn = -1;
            SoundsManager.instance.playSound("hero_show")
        };
        t.prototype.getCharY = function(e) {
            return e
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            if (this.char.visible)
                this.char.update(t);
            if (this.setCharIn > 0 && (!this.char.isPlaying || !this.char.visible)) {
                this.setCharIn -= t;
                if (this.setCharIn <= 0) {
                    this.showHero(this.isInitHeroShow);
                    this.isInitHeroShow = false
                }
            }
            if (this.char.currentFrame == 114)
                this.char.visible = false;
            if (this.lookBackIn > 0) {
                this.lookBackIn -= t;
                if (this.lookBackIn <= 0) {
                    if (!this.char.isPlaying) {
                        this.char.gotoAndPlay(this.lookId == 0 ? 161 : this.lookId == 1 ? 241 : 354);
                        this.setCharLookTime()
                    } else
                        this.lookBackIn = .01
                }
            } else {
                this.charLookIn -= t;
                var n = this.char.currentFrame;
                if (this.charLookIn <= 0 && (n >= 49 && n <= 51 || n <= 105 && n >= 103)) {
                    var r = this.lookId;
                    while (r == this.lookId)
                        r = getInt(3);
                    this.char.gotoAndPlay(r == 0 ? 115 : r == 1 ? 199 : 286);
                    this.lookBackIn = lerp(1.5, 3.5, Math.random());
                    this.lookId = r
                }
            }
        };
        return t
    }
    (Menu);
var MainMenu = function(e) {
        function t() {
            var t = this;
            e.call(this);
            this.heroPositions = [
                [129, 983, 0],
                [665, 698, -44],
                [659, 239, -119],
                [165, -16, -180],
                [-17, 389, 118],
                [-17, 735, 69]
            ];
            this.blinks = [];
            this.blinksDelays = [];
            this.prevHeroId = -1;
            this.blinkData = [
                [392.6, 441.1, 1, 1],
                [422.4, 369.55, 1.1253662109375, 1.1253662109375],
                [480.35, 505.1, 1.0650634765625, 1.0650634765625],
                [496.1, 545.5, 1.0650634765625, 1.0650634765625],
                [372, 543.9, 1.499755859375, 1.499755859375],
                [339.5, 505.7, 1.002532958984375, 1.002532958984375],
                [282.35, 531.05, 1.3023529052734375, 1.3023529052734375],
                [584.75, 547.8, 1.3023529052734375, 1.3023529052734375],
                [524.35, 522.6, .9369049072265625, .9369049072265625],
                [440.6, 477.95, .9369049072265625, .9369049072265625],
                [376.25, 596.65, 1.0650634765625, 1.0650634765625],
                [439.35, 636.85, 1.0650634765625, 1.0650634765625],
                [435.65, 593.3, .72271728515625, .72271728515625],
                [198.05, 605.65, 1.0650634765625, 1.0650634765625],
                [274, 416, 1.0650634765625, 1.0650634765625],
                [588.45, 478, .7136383056640625, .7136383056640625],
                [459.05, -135.35, 1, 1]
            ];
            var n = new createjs.Container;
            this.sprite = n;
            this.back = createBitmap("main menu");
            n.addChild(this.back);
            var r = this.blinkData.length;
            for (var i = 0; i < r; ++i) {
                var s = this.blinkData[i];
                var o = new AnimatedNode(App.game.animationManager.getAnimation("gloss anim"), 1 / 30, null);
                n.addChild(o);
                o.mouseChildren = o.mouseEnabled = false;
                o.x = s[0];
                o.scaleX = s[2];
                o.scaleY = s[3];
                this.blinks.push(o);
                o.visible = false;
                o.stop();
                o.addAction(o.totalFrames - 1, 0, -1);
                this.blinksDelays.push(this.getBlinkDelay(true))
            }
            if (App.episode == 2) {
                this.crossButton = createSpriteFromSpritesheet("play episode1");
                n.addChild(this.crossButton);
                this.crossButton.regX = 91;
                this.crossButton.regY = 103
            }
            this.logo = new AnimatedNode(App.game.animationManager.getAnimation("logo"), 1 / 30, null);
            var u = createSpriteFromSpritesheet(App.episode <= 1 ? "logo ep1" : "logo ep2");
            u.x = 30;
            u.y = 65;
            this.logo.getPart(0).addChild(u);
            n.addChild(this.char);
            this.button = new AnimatedNode(App.game.animationManager.getAnimation("button"), 1 / 30, null);
            n.addChild(this.button);
            this.button.addAction(97, 0, 0);
            this.button.addAction(106, 0, -1);
            this.button.addAction(this.button.totalFrames - 1, 1, 0);
            var a = new ClickableObject(this.button);
            a.setCircle(120, 120, 120);
            a.callback = function() {
                t.onPlayDown()
            };
            this.clickables.push(a);
            var f = new SoundButton(true, n, 570, 115 - 50);
            this.animatedButtons.push(f);
            this.clickables.push(f);
            var f = new SoundButton(false, n, 570, 215 - 50);
            this.animatedButtons.push(f);
            this.clickables.push(f);
            var f = new ButtonObject(4, function(e) {
                t.loadCredits(e)
            }, this.sprite, 350 + 35, 115 - 10);
            this.animatedButtons.push(f);
            this.clickables.push(f);
            n.addChild(this.logo);
            this.brandLogo = new LogoObject(n, App.SCREEN_W / 2, 0, 1);
            this.clickables.push(this.brandLogo);
            this.moreGames = new MoreGamesButton(n, App.SCREEN_W / 2, 0, 1);
            this.clickables.push(this.moreGames);
            if (this.crossButton) {
                var a = new ClickableObject(this.crossButton);
                a.setCircle(85, 91, 103);
                a.callback = function() {
                    t.onEpisodeDown()
                };
                this.clickables.push(a)
            }
            this.onResize()
        }
        __extends(t, e);
        t.prototype.onEpisodeDown = function() {
            if (this.crossButton) {
                createjs.Tween.get(this.crossButton, {
                    loop: false
                }).wait(0).to({
                    scaleX: 1.15,
                    scaleY: 1.15
                }, 150, createjs.Ease.quadOut).to({
                    scaleX: 1,
                    scaleY: 1
                }, 150, createjs.Ease.quadIn);
                window.open("#")
            }
        };
        t.prototype.loadCredits = function(e) {
            MenuManager.instance.credits.show()
        };
        t.prototype.getCharY = function(e) {
            if (e < 650)
                e = e + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2;
            else
                e = e - 978 + App.ACTUAL_H + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2;
            return e
        };
        t.prototype.getHeroPosData = function(e) {
            var t = this.prevHeroId;
            if (e)
                t = 0;
            else {
                while (t == this.prevHeroId)
                    t = getInt(this.heroPositions.length)
            }
            this.prevHeroId = t;
            var n = this.heroPositions[t];
            return n
        };
        t.prototype.getBlinkDelay = function(e) {
            if (typeof e === "undefined") {
                e = false
            }
            return lerp(e ? 0 : 6, 16, Math.random())
        };
        t.prototype.onPlayDown = function() {
            try {
				gradle.event('button_play');
                this.button.gotoAndPlay(99);
                MenuManager.instance.show(MenuManager.instance.map);
                SoundsManager.instance.playSound("play_button")
            } catch (e) {
                alert("play down " + e)
            }
        };
        t.prototype.onResize = function() {
            e.prototype.onResize.call(this);
            this.logo.x = 22;
            this.logo.y = 50 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2;
            this.button.x = 401;
            this.button.y = App.ACTUAL_H - 235 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2;
            var t = this.blinks.length;
            for (var n = 0; n < t; ++n) {
                var r = this.blinks[n];
                r.y = this.blinkData[n][1]
            }
            for (var n = 1; n <= 3; ++n) {
                this.clickables[n].sprite.x = 525 + (n - 2) * 75;
                this.clickables[n].sprite.y = 40 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2 + (n == 3 ? 0 : 0);
                this.clickables[n].sprite.scaleX = this.clickables[n].sprite.scaleY = n == 3 ? .75 : .75;
                this.clickables[n].updateRectScale()
            }
            if (this.brandLogo.sprite)
                this.brandLogo.sprite.y = App.ACTUAL_H - 30 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2;
            if (this.moreGames.sprite) {
                this.moreGames.sprite.x = this.button.x + 115;
                this.moreGames.sprite.y = this.button.y - 50
            }
            if (this.crossButton) {
                this.crossButton.x = 150;
                this.crossButton.y = App.ACTUAL_H - 285 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2
            }
        };
        t.prototype.show = function() {
            e.prototype.show.call(this);
            this.button.gotoAndPlay(0);
            this.setPlayButtonTime(true)
        };
        t.prototype.hide = function() {
            e.prototype.hide.call(this)
        };
        t.prototype.setPlayButtonTime = function(e) {
            if (typeof e === "undefined") {
                e = false
            }
            if (this.button.currentFrame != 106)
                this.button.gotoAndPlay(e ? 130 : 0);
            this.playButtonIn = lerp(5, 12, Math.random())
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            this.logo.update(t);
            this.button.update(t);
            this.playButtonIn -= t;
            if (this.playButtonIn <= 0 && !this.button.isPlaying)
                this.setPlayButtonTime();
            var n = this.blinks.length;
            for (var r = 0; r < n; ++r) {
                var i = this.blinks[r];
                if (!i.isPlaying) {
                    this.blinksDelays[r] -= t;
                    if (this.blinksDelays[r] <= 0) {
                        this.blinksDelays[r] = this.getBlinkDelay();
                        i.gotoAndPlay(0)
                    }
                } else
                    i.update(t);
                i.visible = i.isPlaying
            }
        };
        return t
    }
    (CharMenu);
var MoveDirection;
(function(e) {
    e[e["LEFT"] = 0] = "LEFT";
    e[e["RIGHT"] = 1] = "RIGHT";
    e[e["UP"] = 2] = "UP";
    e[e["DOWN"] = 3] = "DOWN"
})(MoveDirection || (MoveDirection = {}));
var TransitionMenu = function(e) {
        function t() {
            e.call(this);
            this.isActive = false;
            this.direction = 2;
            this.moveProgress = -1;
            this.radius = 450 * .7;
            this.angleSpeed = 0;
            this.levelToLoad = -1;
            this.hasDoneAction = false;
            this.firstUpdate = false;
            var n = createSpriteFromSpritesheet("menu transfer");
            n.regX = t.WIDTH / 2;
            n.regY = t.HEIGHT / 2;
            n.y = App.FULL_SCREEN_H / 2;
            this.sprite = n
        }
        __extends(t, e);
        t.prototype.onResize = function() {};
        t.prototype.play = function(e, t) {
            if (typeof e === "undefined") {
                e = null
            }
            if (typeof t === "undefined") {
                t = -1
            }
            this.hasDoneAction = false;
            this.menuToShow = e;
            this.levelToLoad = t;
            this.isActive = true;
            this.stage.addChild(this.sprite);
            var n = this.direction;
            while (n == this.direction)
                n = getInt(2);
            this.direction = n;
            this.moveProgress = 0;
            createjs.Tween.removeTweens(this);
            this.angleSpeed = 300 * (n == 1 || n == 2 ? 1 : -1);
            this.update(0);
            this.firstUpdate = true;
            SoundsManager.instance.playSound("transition")
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            if (!this.isActive)
                return;
            if (this.firstUpdate) {
                this.firstUpdate = false;
                t = 1 / 60
            }
            this.moveProgress += t / .7;
            var n = this.moveProgress >= 1;
            this.moveProgress = limit(this.moveProgress, 0, 1);
            if (this.moveProgress >= .5 && (this.menuToShow || this.levelToLoad >= 0) && !this.hasDoneAction) {
                this.doAction()
            }
            var r = Math.sqrt(App.ACTUAL_H * App.ACTUAL_H + App.SCREEN_W * App.SCREEN_W);
            this.sprite.scaleX = this.sprite.scaleY = r / this.radius;
            this.sprite.rotation += this.angleSpeed * t;
            var i = r / 2;
            switch (this.direction) {
                case 1:
                    this.sprite.x = lerp(-i, App.SCREEN_W + i, this.moveProgress);
                    this.sprite.y = App.FULL_SCREEN_H / 2;
                    break;
                case 0:
                    this.sprite.x = lerp(App.SCREEN_W + i, -i, this.moveProgress);
                    this.sprite.y = App.FULL_SCREEN_H / 2;
                    break;
                case 2:
                    this.sprite.x = App.SCREEN_W / 2;
                    this.sprite.y = lerp(App.ACTUAL_H + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2 + i, (App.FULL_SCREEN_H - App.ACTUAL_H) / 2 - i, this.moveProgress);
                    break;
                case 3:
                    this.sprite.x = App.SCREEN_W / 2;
                    this.sprite.y = lerp(App.ACTUAL_H + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2 + i, (App.FULL_SCREEN_H - App.ACTUAL_H) / 2 - i, 1 - this.moveProgress);
                    break
            }
            var s = this.stage.getNumChildren() - 1;
            this.stage.setChildIndex(this.sprite, s);
            if (n)
                this.stopMove()
        };
        t.prototype.doAction = function() {
            if (!this.hasDoneAction) {
                this.hasDoneAction = true;
                if (App.game.preloader.isActive())
                    App.game.preloader.disable();
                if (this.menuToShow) {
                    if ((this.menuToShow == MenuManager.instance.map || this.menuToShow == MenuManager.instance.mainMenu) && Match3Level.instance.isActive)
                        Match3Level.instance.reset();
                    MenuManager.instance.show(this.menuToShow, false)
                } else {
                    MenuManager.instance.closeCurrent();
                    LevelManager.instance.loadLevel(this.levelToLoad)
                }
                this.levelToLoad = -1;
                this.menuToShow = null
            }
        };
        t.prototype.stopMove = function() {
            if (!this.hasDoneAction)
                this.doAction();
            createjs.Tween.removeTweens(this);
            removeClip(this.sprite);
            this.isActive = false
        };
        t.WIDTH = 330;
        t.HEIGHT = 328;
        return t
    }
    (Menu);
var WinMenu = function(e) {
        function t() {
            var t = this;
            e.call(this);
            this.stars = [];
            this.starAmount = 3;
            this.starsShowedAmount = 0;
            this.shines = [];
            this.starData = [
                [234, 199, 6.8, .82],
                [350, 208, 0, 1],
                [492, 204, -8, 1.25]
            ];
            this.starShowLeft = 0;
            var n = new createjs.Container;
            this.sprite = n;
            n.y = 300;
            var r = createSpriteFromSpritesheet("gray");
            var i = r.getBounds();
            r.scaleX = (100 + App.SCREEN_W) / i.width;
            r.scaleY = (80 + App.SCREEN_H) / i.height;
            r.y = -n.y + App.SHIFT_H - 40;
            r.x = -50;
            this.grayBack = r;
            n.addChild(r);
            var s = createBitmap("menu back");
            s.x = s.y = 0;
            n.addChild(s);
			
            var r = createSpriteFromSpritesheet("Victory");
            var i = r.getBounds();
            r.regX = i.width / 2;
            r.regY = i.height / 2;
            r.x = 347;
            r.y = 18;
            n.addChild(r);
            var r = createSpriteFromSpritesheet("star back");
            r.x = 159;
            r.y = 116;
            n.addChild(r);
            for (var o = 0; o < this.starData.length; ++o) {
                r = createSpriteFromSpritesheet("star glow");
                var u = this.starData[o];
                r.x = u[0];
                r.y = u[1];
                r.scaleX = r.scaleY = 1.4 * u[3] / .82;
                var i = r.getBounds();
                r.regX = i.width / 2;
                r.regY = i.height / 2;
                n.addChild(r);
                this.shines.push(r)
            }
            for (var o = 0; o < this.starData.length; ++o) {
                r = createSpriteFromSpritesheet("star");
                var u = this.starData[o];
                r.x = u[0];
                r.y = u[1];
                r.rotation = u[2];
                r.scaleX = r.scaleY = u[3];
                var i = r.getBounds();
                r.regX = i.width / 2;
                r.regY = i.height / 2;
                n.addChild(r);
                this.stars.push(r)
            }
            n.addChild(this.char);
            this.button = new AnimatedNode(App.game.animationManager.getAnimation("button"), 1 / 30, null);
            n.addChild(this.button);
            this.button.addAction(97, 0, 0);
            this.button.addAction(106, 0, -1);
            this.button.x = 470;
            this.button.y = 370;
            this.button.scaleX = this.button.scaleY = .75;
            this.button.addAction(this.button.totalFrames - 1, 1, 0);
            var a = new ClickableObject(this.button);
            a.setCircle(120 * this.button.scaleX, 120 * this.button.scaleX, 120 * this.button.scaleX);
            a.callback = function() {
                t.onPlayDown()
            };
            this.clickables.push(a);
            var f = new ButtonObject(5, function(e) {
                t.restarAndUnlock(e)
            }, n, App.SCREEN_W / 2, 465);
            this.animatedButtons.push(f);
            this.clickables.push(f)
        }
        __extends(t, e);
        t.prototype.restarAndUnlock = function(e) {
            LevelManager.instance.restartLoadNextLevel();
            this.restartLevel(e)
        };
        t.prototype.onPlayDown = function() {
            try {
                this.button.gotoAndPlay(99);
                if (!MenuManager.instance)
                    new MenuManager;
                LevelManager.instance.loadNextLevel();
                SoundsManager.instance.playSound("pause")
            } catch (e) {
                alert("play down2 " + e)
            }
        };
        t.prototype.setStarData = function(e) {
            this.starAmount = e
        };
        t.prototype.getHeroPosData = function(e) {
            return [100, 300, 0]
        };
        t.prototype.show = function() {
            var t = this;
            e.prototype.show.call(this);
            this.starsShowedAmount = 0;
            this.grayBack.alpha = 0;
            createjs.Tween.get(this.grayBack, {
                loop: false
            }).wait(0).to({
                alpha: 1
            }, 300, createjs.Ease.none);
            for (var n = 0; n < this.stars.length; ++n) {
                var r = this.stars[n];
                r.visible = false;
                this.shines[n].visible = false;
                createjs.Tween.removeTweens(r);
                createjs.Tween.removeTweens(this.shines[n])
            }
            this.starShowLeft = this.starAmount;
            for (var n = 0; n < this.starAmount; ++n) {
                r = this.stars[n];
                r.visible = true;
                r.alpha = 0;
                r.scaleX = r.scaleY = 2;
                var i = this.starData[n][3];
                var s = 500 + n * 500;
                createjs.Tween.get(r, {
                    loop: false
                }).wait(s).to({
                    alpha: 1,
                    scaleX: i,
                    scaleY: i
                }, 200, createjs.Ease.none).call(function() {
                    return t.stopStarMove()
                });
                if (r.visible) {
                    SoundsManager.instance.playSound("star" + (n + 1), s)
                }
            }
            removeClip(this.scoreText);
            this.scoreText = new createjs.BitmapText(this.level.score.toString(), App.game.atlas);
            var o = getTextSize(this.scoreText);
            this.scoreText.regX = 0;
            this.sprite.addChild(this.scoreText);
            this.scoreText.x = 350;
            this.scoreText.y = 40;
            this.scoreText.letterSpacing = -10;
            this.setCharIn = .1;
            this.setPlayButtonTime(true);
            this.button.gotoAndPlay(0);
            SoundsManager.instance.pauseMusic();
			gradle.event('win');
            SoundsManager.instance.playSound("win")
        };
        t.prototype.setPlayButtonTime = function(e) {
            if (typeof e === "undefined") {
                e = false
            }
            if (this.button.currentFrame != 106)
                this.button.gotoAndPlay(e ? 130 : 0);
            this.playButtonIn = lerp(5, 12, Math.random())
        };
        t.prototype.hide = function() {
            e.prototype.hide.call(this);
            SoundsManager.instance.resumeMusic()
        };
        t.prototype.stopStarMove = function() {
            var e = this.shines[this.starsShowedAmount];
            e.visible = true;
            e.rotation = 0;
            e.alpha = 1;
            createjs.Tween.get(e, {
                loop: false
            }).wait(0).to({
                alpha: 0,
                rotation: 90
            }, 600, createjs.Ease.none);
            this.starsShowedAmount++;
            this.starShowLeft--;
            if (this.starShowLeft <= 0)
                App.game.showAds()
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            this.button.update(t);
            this.playButtonIn -= t;
            if (this.playButtonIn <= 0 && !this.button.isPlaying)
                this.setPlayButtonTime()
        };
        return t
    }
    (CharMenu);
var PauseLikeMenu = function(e) {
        function t() {
            e.call(this);
            this.showDelay = 0;
            this.targetPos = 350;
            var t = new createjs.Container;
            this.sprite = t;
            t.y = 0;
            var n = new createjs.Container;
            var r = createSpriteFromSpritesheet("gray");
            var i = r.getBounds();
            r.scaleX = (100 + App.SCREEN_W) / i.width;
            r.scaleY = (80 + App.FULL_SCREEN_H) / i.height;
            r.y = -t.y - 40;
            r.x = -50;
            this.grayBack = r;
            t.addChild(r);
            var s = createBitmap("menu back");
            n.addChild(s);
            this.backSprite = s;
            t.addChild(n);
            this.baseSprite = n;
            this.brandLogo = new LogoObject(t, App.SCREEN_W - 90, App.CURRENT_SHIFT + App.SCREEN_H - 30, 1);
            if (this.brandLogo.sprite)
                this.brandLogo.sprite.y = App.ACTUAL_H - 40 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2;
            this.moreGames = new MoreGamesButton(t, 90, App.CURRENT_SHIFT + App.SCREEN_H - 30, 1);
            if (this.moreGames.sprite)
                this.moreGames.sprite.y = App.ACTUAL_H - 60 + (App.FULL_SCREEN_H - App.ACTUAL_H) / 2
        }
        __extends(t, e);
        t.prototype.show = function() {
            e.prototype.show.call(this);
            createjs.Tween.removeTweens(this.baseSprite);
            createjs.Tween.removeTweens(this.grayBack);
            this.grayBack.alpha = 0;
            this.baseSprite.y = -250;
            createjs.Tween.get(this.grayBack, {
                loop: false
            }).wait(this.showDelay).to({
                alpha: 1
            }, 200 * 1.3, createjs.Ease.cubicInOut);
            createjs.Tween.get(this.baseSprite, {
                loop: false
            }).wait(this.showDelay).to({
                y: this.targetPos
            }, 1e3 * 1.3, createjs.Ease.elasticOut);
            if (this.clickables.indexOf(this.brandLogo) == -1)
                this.clickables.push(this.brandLogo);
            if (this.clickables.indexOf(this.moreGames) == -1)
                this.clickables.push(this.moreGames);
            if (this.brandLogo.sprite)
                this.brandLogo.sprite.visible = true;
            if (this.moreGames.sprite)
                this.moreGames.sprite.visible = true
        };
        t.prototype.hide = function() {
            var t = this;
            if (this.needToHideInstantly()) {
                e.prototype.hide.call(this);
                return
            }
            createjs.Tween.removeTweens(this.baseSprite);
            createjs.Tween.removeTweens(this.grayBack);
            this.grayBack.alpha = 1;
            this.baseSprite.y = 350;
            createjs.Tween.get(this.grayBack, {
                loop: false
            }).wait(0).to({
                alpha: 0
            }, 750, createjs.Ease.cubicInOut);
            createjs.Tween.get(this.baseSprite, {
                loop: false
            }).wait(0).to({
                y: -550
            }, 750, createjs.Ease.elasticInOut).call(function() {
                return e.prototype.hide.call(t)
            });
            if (this.brandLogo.sprite)
                this.brandLogo.sprite.visible = false;
            if (this.moreGames.sprite)
                this.moreGames.sprite.visible = false
        };
        t.prototype.needToHideInstantly = function() {
            return MenuManager.instance.transition.menuToShow == null && MenuManager.instance.transition.isActive
        };
        return t
    }
    (Menu);
var TargetMenu = function(e) {
        function t() {
            e.call(this);
            this.targetTexts = [];
            this.targetSprites = [];
            this.showDelay = 150;
            var t = this.sprite;
            var n;
            var r = new createjs.BitmapText("OBJECTIVE", App.game.fontAtlas);
            r.letterSpacing = -10;
            r.x = App.SCREEN_W / 2 - r.getBounds().width / 2;
            r.y = -40;
            this.baseSprite.addChild(r);
            var r = new createjs.BitmapText("tap to continue...", App.game.atlas);
            r.letterSpacing = -10;
            r.scaleX = r.scaleY = .65;
            r.x = App.SCREEN_W / 2 - r.scaleX * r.getBounds().width / 2;
            r.y = App.FULL_SCREEN_H - 175 - t.y;
            t.addChild(r);
            this.continueText = r;
            for (var i = 2; i >= 0; --i) {
                n = createSpriteFromSpritesheet("cookie");
                n.y = 300 + i * 30 - 210;
                n.rotation = i * -30;
                this.baseSprite.addChild(n);
                this.targetSprites.push(n)
            }
            for (var i = 0; i < 2; ++i) {
                var r = new createjs.BitmapText(" ", App.game.atlas);
                r.letterSpacing = -8.5;
                r.spaceWidth = 25;
                r.scaleX = r.scaleY = .9;
                this.baseSprite.addChild(r);
                this.targetTexts.push(r)
            }
        }
        __extends(t, e);
        t.prototype.show = function() {
            e.prototype.show.call(this);
            var t = Match3Level.instance.target.getText();
            var n = -1;
            for (var r = 0; r < this.targetTexts.length; ++r) {
                var i = this.targetTexts[r];
                i.text = t[r];
                i.x = App.SCREEN_W / 2 - i.getTransformedBounds().width / 2 - 40 + 10;
                i.y = -40 + 85 + r * 55;
                var s = i.getTransformedBounds();
                n = App.SCREEN_W - 150
            }
            for (var r = 0; r < 3; ++r) {
                var o = this.targetSprites[r];
                var u = t[2];
                o.gotoAndStop(u);
                o.scaleX = o.scaleY = u == "star" ? 66 / 100 : 1;
                o.x = n + 15 - (r == 2 ? 0 : r == 1 ? 25 : 19) + 45 + 10;
                o.regX = o.getBounds().width / 2;
                o.regY = o.getBounds().height / 2
            }
            this.continueText.visible = true
        };
        t.prototype.hide = function() {
            e.prototype.hide.call(this);
            this.continueText.visible = false
        };
        t.prototype.onDown = function(t, n) {
            e.prototype.onDown.call(this, t, n);
            if (this == MenuManager.instance.current) {
                MenuManager.instance.closeCurrent();
                if (Match3Level.instance.isPaused)
                    Match3Level.instance.unpause()
            }
        };
        return t
    }
    (PauseLikeMenu);
var PauseMenu = function(e) {
        function t() {
            var t = this;
            e.call(this);
            var n = this.sprite;
            var r;
            var i = new createjs.BitmapText("pause", App.game.fontAtlas);
            i.letterSpacing = -10;
            i.x = App.SCREEN_W / 2 - i.getBounds().width / 2;
            i.y = -40;
            this.baseSprite.addChild(i);
            var s = new ButtonObject(6, function(e) {
                t.loadMainMenu(e)
            }, this.baseSprite, 350 + 35, 115 - 10);
            this.animatedButtons.push(s);
            this.clickables.push(s);
            var s = new ButtonObject(5, function(e) {
                t.restartLevel(e)
            }, this.baseSprite, 210 + 35, 115 - 10);
            this.animatedButtons.push(s);
            this.clickables.push(s);
            var s = new SoundButton(true, this.baseSprite, 570, 115 - 50);
            this.animatedButtons.push(s);
            this.clickables.push(s);
            var s = new SoundButton(false, this.baseSprite, 570, 215 - 50);
            this.animatedButtons.push(s);
            this.clickables.push(s);
            this.targetPos = 290;
            this.button = new AnimatedNode(App.game.animationManager.getAnimation("button"), 1 / 30, null);
            this.baseSprite.addChild(this.button);
            this.button.addAction(97, 0, 0);
            this.button.addAction(106, 0, -1);
            this.button.x = App.SCREEN_W / 2 - 85;
            this.button.y = 210 - 40;
            this.button.scaleX = this.button.scaleY = .75;
            this.button.addAction(this.button.totalFrames - 1, 1, 0);
            var o = new ClickableObject(this.button);
            o.setCircle(120 * this.button.scaleX, 120 * this.button.scaleX, 120 * this.button.scaleX);
            o.callback = function() {
                t.onPlayDown()
            };
            this.clickables.push(o)
        }
        __extends(t, e);
        t.prototype.show = function() {
            e.prototype.show.call(this);
            this.button.gotoAndPlay(0)
        };
        t.prototype.onPlayDown = function() {
            try {
                this.button.gotoAndPlay(99);
                Match3Level.instance.unpause();
                SoundsManager.instance.playSound("pause")
            } catch (e) {
                alert("play downXX " + e)
            }
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            this.button.update(t)
        };
        return t
    }
    (PauseLikeMenu);
var LoseMenu = function(e) {
        function t() {
            var t = this;
            e.call(this);
            this.showDelay = 0;
            var n = createSpriteFromSpritesheet("lose");
            var r = n.getBounds();
            n.regX = r.width / 2;
            n.regY = r.height / 2;
            n.x = 347;
            n.y = 18;
            this.baseSprite.addChild(n);
            this.char = new AnimatedNode(App.game.animationManager.getAnimation("Char lose"), 1 / 30, null);
            this.char.x = 100;
            this.char.y = 300;
            this.baseSprite.addChild(this.char);
            var i = new ButtonObject(6, function(e) {
                t.loadMainMenu(e)
            }, this.baseSprite, 500, 140);
            this.animatedButtons.push(i);
            this.clickables.push(i);
            var i = new ButtonObject(5, function(e) {
                t.restartLevel(e)
            }, this.baseSprite, 340, 140);
            this.animatedButtons.push(i);
            this.clickables.push(i)
        }
        __extends(t, e);
        t.prototype.show = function() {
            e.prototype.show.call(this);
            SoundsManager.instance.playSound("fail");
            SoundsManager.instance.pauseMusic()
        };
        t.prototype.hide = function() {
            e.prototype.hide.call(this);
            SoundsManager.instance.resumeMusic()
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            this.char.update(t)
        };
        return t
    }
    (PauseLikeMenu);
var ResultMenu = function(e) {
        function t() {
            var t = this;
            e.call(this);
            this.dataTexts = [];
            s = new createjs.BitmapText("game complete!", App.game.fontAtlas);
            s.letterSpacing = -10;
            s.spaceWidth = 25;
            s.regX = s.getBounds().width / 2;
            s.x = App.SCREEN_W / 2;
            s.y = -45;
            this.baseSprite.addChild(s);
            this.backSprite.scaleY = 1.5;
            var n = ["stars earned:", "total moves:", "total score:", "bonuses used:"];
            for (var r = 0; r < n.length; ++r) {
                for (var i = 0; i < 2; i++) {
                    if (i == 1)
                        continue;
                    var s = new createjs.BitmapText(i == 0 ? n[r] : getInt(1e6).toString(), i == 0 ? App.game.fontAtlas : App.game.atlas);
                    s.letterSpacing = -10;
                    s.spaceWidth = 25;
                    s.regX = i == 0 ? 0 : s.getBounds().width / 2;
                    s.x = i == 0 ? 30 : 520;
                    s.y = 60 + r * 55 + (i == 0 ? 0 : -20);
                    s.scaleX = s.scaleY = i == 0 ? .7 : 1;
                    this.baseSprite.addChild(s)
                }
            }
            this.button = new AnimatedNode(App.game.animationManager.getAnimation("button"), 1 / 30, null);
            this.baseSprite.addChild(this.button);
            this.button.addAction(97, 0, 0);
            this.button.addAction(106, 0, -1);
            this.button.x = App.SCREEN_W / 2 - 85;
            this.button.y = 310 - 25;
            this.button.scaleX = this.button.scaleY = .75;
            this.button.addAction(this.button.totalFrames - 1, 1, 0);
            var o = new ClickableObject(this.button);
            o.setCircle(120, 120, 120);
            o.callback = function() {
                t.onPlayDown()
            };
            this.clickables.push(o);
            this.targetPos -= 60
        }
        __extends(t, e);
        t.prototype.show = function() {
            e.prototype.show.call(this);
            this.button.gotoAndPlay(0);
            for (var t = 0; t < this.dataTexts.length; ++t)
                removeClip(this.dataTexts[t]);
            this.dataTexts = [];
            var n = [LevelManager.instance.totalStars + "/" + 180, LevelManager.instance.moves.toString(), LevelManager.instance.totalScores.toString(), LevelManager.instance.bonuses.toString()];
            for (var t = 0; t < n.length; ++t) {
                for (var r = 0; r < 2; r++) {
                    if (r == 0)
                        continue;
                    var i = new createjs.BitmapText(n[t], r == 0 ? App.game.fontAtlas : App.game.atlas);
                    i.letterSpacing = -10;
                    i.spaceWidth = 25;
                    i.regX = r == 0 ? 0 : i.getBounds().width / 2;
                    i.x = r == 0 ? 30 : 520;
                    i.y = 60 + t * 55 + (r == 0 ? 0 : -20);
                    i.scaleX = i.scaleY = r == 0 ? .7 : 1;
                    this.dataTexts.push(i);
                    this.baseSprite.addChild(i)
                }
            }
            SoundsManager.instance.pauseMusic();
            SoundsManager.instance.playSound("win")
        };
        t.prototype.hide = function() {
            e.prototype.hide.call(this);
            SoundsManager.instance.resumeMusic()
        };
        t.prototype.onPlayDown = function() {
            try {
                this.button.gotoAndPlay(99);
                this.loadMainMenu()
            } catch (e) {
                alert("play downXXt " + e)
            }
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            this.button.update(t)
        };
        return t
    }
    (PauseLikeMenu);
var CreditsMenu = function(e) {
        function t() {
            var t = this;
            e.call(this);
            this.dataTexts = [];
            s = new createjs.BitmapText("Credits", App.game.fontAtlas);
            s.letterSpacing = -10;
            s.spaceWidth = 25;
            s.regX = s.getBounds().width / 2;
            s.x = App.SCREEN_W / 2;
            s.y = -45;
            this.baseSprite.addChild(s);
            this.backSprite.scaleY = 1.8;
            var n = ["Games :"];
            for (var r = 0; r < n.length; ++r) {
                for (var i = 0; i < 2; i++) {
                    if (i == 1)
                        continue;
                    var s = new createjs.BitmapText(i == 0 ? n[r] : getInt(1e6).toString(), i == 0 ? App.game.fontAtlas : App.game.atlas);
                    s.letterSpacing = -10;
                    s.spaceWidth = 25;
                    s.regX = i == 0 ? 0 : s.getBounds().width / 2;
                    s.x = i == 0 ? 10 : 520;
                    s.y = 60 + r * 55 + (i == 0 ? 0 : -20);
                    s.scaleX = s.scaleY = .65;
                    this.baseSprite.addChild(s)
                }
            }
            this.dataTexts = [];
            var n = ["VISHUSARKAR"];
            for (var r = 0; r < n.length; ++r) {
                for (var i = 0; i < 2; i++) {
                    if (i == 0)
                        continue;
                    var s = new createjs.BitmapText(n[r], i == 0 ? App.game.fontAtlas : App.game.atlas);
                    s.letterSpacing = -10;
                    s.spaceWidth = 25;
                    s.regX = i == 0 ? 0 : s.getBounds().width / 2;
                    s.x = 390 + (r == 3 ? -50 : 0);
                    s.y = 70 + r * 55 + (i == 0 ? 0 : -20) + (r == 3 ? 10 : 0);
                    s.scaleX = s.scaleY = r == 3 ? .6 : .75;
                    this.dataTexts.push(s);
                    this.baseSprite.addChild(s)
                }
            }
            this.button = new AnimatedNode(App.game.animationManager.getAnimation("button"), 1 / 30, null);
            this.baseSprite.addChild(this.button);
            this.button.addAction(97, 0, 0);
            this.button.addAction(106, 0, -1);
            this.button.x = App.SCREEN_W / 2 - 85;
            this.button.y = 335;
            this.button.scaleX = this.button.scaleY = .75;
            this.button.addAction(this.button.totalFrames - 1, 1, 0);
            var o = new ClickableObject(this.button);
            o.setCircle(120, 120, 120);
            o.callback = function() {
                t.onPlayDown()
            };
            this.clickables.push(o);
            this.targetPos -= 120
        }
        __extends(t, e);
        t.prototype.show = function() {
            e.prototype.show.call(this);
            this.button.gotoAndPlay(0)
        };
        t.prototype.hide = function() {
            this.isMenuActive = false;
            e.prototype.hide.call(this)
        };
        t.prototype.onPlayDown = function() {
            try {
                this.button.gotoAndPlay(99);
                this.hide()
            } catch (e) {
                alert("play downXXt " + e)
            }
        };
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            this.button.update(t)
        };
        return t
    }
    (PauseLikeMenu);
var SplashScreen = function(e) {
        function t() {
            e.call(this);
            var t = new createjs.Container;
            var n = createSpriteFromSpritesheet("white");
            n.scaleX = (100 + App.SCREEN_W) / 50;
            n.scaleY = (100 + App.FULL_SCREEN_H) / 50;
            n.x = n.y = -50;
            n.regX = 0;
            n.regY = 0;
            t.addChild(n);
            this.sprite = t;
            var r = createBitmap("zibbo_logo");
            r.regX = r.getBounds().width / 2;
            r.regY = r.getBounds().height / 2;
            t.addChild(r);
            r.x = App.SCREEN_W / 2;
            r.y = App.FULL_SCREEN_H / 2 - 60;
            this.logo = r
        }
        __extends(t, e);
        t.prototype.show = function() {
            var t = this;
            e.prototype.show.call(this);
            createjs.Tween.removeTweens(this.logo);
            this.logo.scaleX = this.logo.scaleY = .85;
            createjs.Tween.get(this.logo, {
                loop: false
            }).wait(100).to({
                scaleX: 1,
                scaleY: 1
            }, 300, createjs.Ease.circOut).wait(0).to({
                scaleX: this.logo.scaleX,
                scaleY: this.logo.scaleY
            }, 400, createjs.Ease.quadIn).wait(1200).call(function() {
                return t.onAnimEnd()
            })
        };
        t.prototype.onAnimEnd = function() {
            MenuManager.instance.show(MenuManager.instance.mainMenu, true)
        };
        t.prototype.onDown = function(t, n) {
            e.prototype.onDown.call(this, t, n);
            console.log("splash down");
            splashScreenData.action()
        };
        return t
    }
    (Menu);
var LevelTarget = function() {
        function e() {
            this.scores = [500, 1500, 3e3];
            this.isScoreTarget = false
        }
        Object.defineProperty(e.prototype, "progress", {
            get: function() {
                return 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "isCompleted", {
            get: function() {
                return this.progress >= 1 - 1e-10
            },
            enumerable: true,
            configurable: true
        });
        e.prototype.getExactType = function(e, t) {
            return -1
        };
        e.prototype.getText = function() {
            return []
        };
        e.prototype.onLevelGenerated = function() {};
        e.prototype.onMarkRemoved = function() {};
        e.prototype.onBlockRemoved = function() {};
        e.prototype.onObjectRemove = function(e) {};
        e.prototype.getTargetText = function() {
            return ""
        };
        return e
    }
    ();
var PushDownTarget = function(e) {
        function t(t) {
            e.call(this);
            this.targetsToPush = 0;
            this.targetsPushed = 0;
            this.pushCakeIn = 0;
            this.pushLeft = 0;
            this.pushQueue = 0;
            this.targetsToPush = t;
            this.setPushTime()
        }
        __extends(t, e);
        t.prototype.setPushTime = function() {
            this.pushCakeIn = Match3Level.instance.currentMove + getInt(3);
            if (this.needToPush) {
                return
            }
            this.pushLeft = Math.random() < .02 && this.pushQueue + 2 <= this.targetsToPush ? 2 : 1;
            this.pushQueue += this.pushLeft;
            if (this.pushQueue > this.targetsToPush)
                this.pushLeft = -1
        };
        Object.defineProperty(t.prototype, "needToPush", {
            get: function() {
                return this.pushLeft > 0
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(t.prototype, "progress", {
            get: function() {
                return this.targetsPushed / this.targetsToPush
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.onTargetPush = function() {
            ++this.targetsPushed;
            if (!this.isCompleted)
                this.setPushTime()
        };
        t.prototype.getTargetText = function() {
            return "x" + limit(this.targetsToPush - this.targetsPushed, 0, 1e10)
        };
        t.prototype.getExactType = function(e, t) {
            if (t == 0 && !this.isCompleted && this.needToPush && Match3Level.instance.currentMove >= this.pushCakeIn && Match3Level.instance.levelData.pushPositions.indexOf(e) != -1) {
                this.pushLeft--;
                if (this.needToPush)
                    this.setPushTime();
                return Match3Level.instance.assetNumber
            }
            return -1
        };
        t.prototype.getText = function() {
            return ["drop " + this.targetsToPush + " cakes", "to the bottom!", "cupcake"]
        };
        return t
    }
    (LevelTarget);
var ClearMarkTarget = function(e) {
        function t() {
            e.call(this);
            this.marksToRemove = 1;
            this.marksRemoved = 0
        }
        __extends(t, e);
        Object.defineProperty(t.prototype, "progress", {
            get: function() {
                return this.marksRemoved / this.marksToRemove
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.getTargetText = function() {
            return "x" + limit(this.marksToRemove - this.marksRemoved, 0, 1e10)
        };
        t.prototype.onLevelGenerated = function() {
            this.marksToRemove = 0;
            for (var e = 0; e < App.level.fieldWidth; ++e)
                for (var t = 0; t < App.level.fieldHeight; ++t) {
                    var n = App.level.cells[e][t];
                    if (n.isMarked)
                        ++this.marksToRemove
                }
        };
        t.prototype.getText = function() {
            return ["remove all", "cookies!", "cookie"]
        };
        t.prototype.onMarkRemoved = function() {
            this.marksRemoved++
        };
        return t
    }
    (LevelTarget);
var BlockClearTarget = function(e) {
        function t() {
            e.call(this);
            this.blocksToRemove = 1;
            this.blocksRemoved = 0
        }
        __extends(t, e);
        t.prototype.getTargetText = function() {
            return "x" + limit(this.blocksToRemove - this.blocksRemoved, 0, 1e10)
        };
        t.prototype.getText = function() {
            var e = Match3Level.instance.levelData;
            var t = e.hasBlackChoco && e.hasWhiteChoco ? "chocolate ico" : e.hasWhiteChoco ? "chocolate white" : "chocolate black";
            return ["remove all", "obstacles!", t]
        };
        Object.defineProperty(t.prototype, "progress", {
            get: function() {
                return this.blocksRemoved / this.blocksToRemove
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.onLevelGenerated = function() {
            this.blocksToRemove = 0;
            for (var e = 0; e < App.level.fieldWidth; ++e)
                for (var t = 0; t < App.level.fieldHeight; ++t) {
                    var n = App.level.cells[e][t];
                    if (n.isBreakable || n.isColorBlocked)
                        ++this.blocksToRemove
                }
        };
        t.prototype.onBlockRemoved = function() {
            this.blocksRemoved++
        };
        return t
    }
    (LevelTarget);
var ColorTarget = function(e) {
        function t(t, n) {
            e.call(this);
            this.colorsToRemove = 0;
            this.colorsRemoved = 0;
            this.colorType = 0;
            this.colorsToRemove = t;
            this.colorType = n
        }
        __extends(t, e);
        t.prototype.getTargetText = function() {
            return "x" + limit(this.colorsToRemove - this.colorsRemoved, 0, 1e10)
        };
        t.prototype.getText = function() {
            return ["remove " + this.colorsToRemove + " " + FieldObject.assetNames[this.colorType], "jellies!", FieldObject.assetNames[this.colorType]]
        };
        Object.defineProperty(t.prototype, "progress", {
            get: function() {
                return this.colorsRemoved / this.colorsToRemove
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.onObjectRemove = function(e) {
            if (e.colorType == this.colorType)
                this.colorsRemoved++
        };
        return t
    }
    (LevelTarget);
var ScoreTarget = function(e) {
        function t(t) {
            e.call(this);
            this.targetScore = 0;
            this.targetScore = t;
            this.isScoreTarget = true
        }
        __extends(t, e);
        t.prototype.getTargetText = function() {
            var e = Math.floor(100 * limit(Match3Level.instance.score / this.targetScore, 0, 1));
            return e + "%"
        };
        t.prototype.getText = function() {
            return ["collect " + this.targetScore, "points!", "star"]
        };
        Object.defineProperty(t.prototype, "progress", {
            get: function() {
                return Match3Level.instance.score / this.targetScore
            },
            enumerable: true,
            configurable: true
        });
        return t
    }
    (LevelTarget);
var InfiniteTarget = function(e) {
        function t() {
            e.call(this)
        }
        __extends(t, e);
        t.prototype.getTargetText = function() {
            return "xxx%"
        };
        t.prototype.getText = function() {
            return ["reach xxx", "points!", "star"]
        };
        Object.defineProperty(t.prototype, "progress", {
            get: function() {
                return 0
            },
            enumerable: true,
            configurable: true
        });
        return t
    }
    (LevelTarget);
var BonusIndicator = function(e) {
        function t(t, n, r, i) {
            var s = this;
            e.call(this);
            this.borders = [];
            this.isMovingToTarget = false;
            this.isHiding = false;
            this.horizontal = false;
            this.target = r;
            this.bonusType = i;
            var o = App.level.gridToStage(t.x, t.y);
            var u = App.level.gridToStage(n.x, n.y);
            var a = new createjs.Container;
            var f = 250;
            this.horizontal = t.y == n.y;
            for (var l = 0; l < 2; ++l) {
                var c = createSpriteFromSpritesheet("bonus line side");
                var h = c.getBounds();
                c.regX = h.width;
                c.regY = h.height / 2;
                c.scaleX = c.scaleY = Match3Level.TILE_SIZE_FACTOR;
                var p = l == 0 ? o : u;
                var d = l == 0 ? t : n;
                c.x = p.x;
                c.y = p.y;
                c.rotation = t.y == n.y ? l == 0 && t.x < n.x || l == 1 && n.x < t.x ? 0 : 180 : l == 0 && t.y < n.y || l == 1 && n.y < t.y ? 90 : -90;
                a.addChild(c);
                this.borders.push(c);
                createjs.Tween.get(c, {
                    loop: false
                }).to({
                    x: (o.x + u.x) / 2,
                    y: (o.y + u.y) / 2
                }, f, createjs.Ease.cubicIn)
            }
            c = createSpriteFromSpritesheet("bonus line center");
            h = c.getBounds();
            var v = (distanceBetweenPoints(o.x, o.y, u.x, u.y) + .3) / (h.width - 2.9);
            c.scaleX = v;
            c.scaleY = Match3Level.TILE_SIZE_FACTOR;
            a.addChildAt(c, 0);
            c.x = (o.x + u.x) / 2;
            c.y = (o.y + u.y) / 2;
            c.regX = h.width / 2;
            c.regY = h.height / 2;
            createjs.Tween.get(c, {
                loop: false
            }).to({
                scaleX: 0
            }, f, createjs.Ease.cubicIn).call(function() {
                return s.moveToTarget()
            });
            c.rotation = t.y == n.y ? 0 : 90;
            this.borders.push(c);
            c = createSpriteFromSpritesheet("bonus new");
            a.addChild(c);
            c.x = (o.x + u.x) / 2;
            c.y = (o.y + u.y) / 2;
            c.scaleX = .3;
            c.scaleY = .3;
            c.alpha = .3;
            h = c.getBounds();
            c.regX = h.width / 2;
            c.regY = h.height / 2;
            this.borders.push(c);
            createjs.Tween.get(c, {
                loop: false
            }).wait(0).to({
                alpha: 1,
                scaleX: 1,
                scaleY: 1
            }, f, createjs.Ease.cubicIn);
            this.sprite = a;
            addChild(this.sprite, this.level.bonusIndicatorLayer);
            r.setTempBlock(true, .1);
            SoundsManager.instance.playSound("bonus_show")
        }
        __extends(t, e);
        t.prototype.moveToTarget = function() {
            var e = this;
            this.borders[0].visible = this.borders[1].visible = false;
            this.isMovingToTarget = true;
            var t = App.level.gridToStage(this.target.x, this.target.y);
            var n = this.sprite.getBounds();
            t.x -= n.x + n.width / 2;
            t.y -= n.y + n.height / 2;
            createjs.Tween.get(this.sprite).to({
                x: t.x,
                y: t.y
            }, 500, createjs.Ease.cubicIn).call(function() {
                return e.hide()
            });
            this.isHiding = true
        };
        t.prototype.hide = function() {
            var e = this;
            if (this.isDestroyed)
                return;
            if (this.target && this.target.object) {
                this.target.object.setBonusType(this.bonusType);
                this.target.setTempBlock(false, -1);
                SoundsManager.instance.playSound("bonus_set")
            }
            createjs.Tween.get(this.borders[3]).to({
                alpha: 0,
                scaleX: 0,
                scaleY: 0
            }, 800, createjs.Ease.cubicOut).call(function() {
                return e.destroy()
            })
        };
        t.prototype.updateTarget = function(e) {
            this.target = e;
            createjs.Tween.removeTweens(this.sprite);
            createjs.Tween.removeTweens(this.borders[3]);
            this.moveToTarget()
        };
        t.prototype.checkTargetObject = function() {
            if (this.isMovingToTarget && (!this.target.object || this.target.object.isMoving || this.target.isWaitingForClear)) {
                this.target = null;
                this.level.spawnBonus(this.bonusType, null, null, this)
            }
        };
        t.prototype.update = function(e) {
            if (!this.isMovingToTarget && false) {
                var t = this.borders[2];
                var n = t.scaleX * 25 - 2;
                for (var r = 0; r < 2; ++r) {
                    var i = this.borders[r];
                    i.x = t.x + (this.horizontal ? (r == 1 ? 1 : -1) * n / 2 : 0);
                    i.y = t.y + (!this.horizontal ? (r == 1 ? 1 : -1) * n / 2 : 0)
                }
            }
            this.checkTargetObject();
            if (!this.isDestroyed)
                this.target.setTempBlock(true, .1)
        };
        t.prototype.destroy = function() {
            if (this.isDestroyed)
                return;
            createjs.Tween.removeTweens(this.borders[3]);
            createjs.Tween.removeTweens(this.sprite);
            this.isMovingToTarget = true;
            for (var t = 0; t < this.borders.length; ++t)
                removeClip(this.borders[t]);
            this.borders = null;
            e.prototype.destroy.call(this)
        };
        return t
    }
    (GameObject);
var GemDestroyAnimation = function(e) {
        function t(n) {
            e.call(this);
            this.totalFrames = 0;
            this.playedScore = false;
            this.color = n;
            this.totalFrames = t.animLen[n];
            this.fileName = FieldObject.assetNames[this.color] + "x";
            this.sprite = new createjs.Sprite(App.game.atlas, this.fileName);
            this.sprite.framerate = 30;
            var r = t.regPoints[this.color];
            this.sprite.scaleX = this.sprite.scaleY = 1.5;
            this.sprite.regX = r.x / this.sprite.scaleX;
            this.sprite.regY = r.y / this.sprite.scaleY;
            this.sprite.scaleX = this.sprite.scaleY = this.sprite.scaleX * Match3Level.TILE_SIZE_FACTOR
        }
        __extends(t, e);
        t.prototype.destroy = function() {
            if (!this.isDestroyed) {
                Match3Level.pool.returnGemDestroy(this)
            }
        };
        t.prototype.update = function(e) {
            if (this.isDestroyed)
                return;
            var t = this.sprite.currentAnimationFrame;
            if (!this.playedScore && t > this.totalFrames / 2) {
                this.cell.tryPlayScoreAnimation();
                this.playedScore = true
            }
            if (t > this.totalFrames) {
                Match3Level.pool.returnGemDestroy(this)
            }
        };
        t.prototype.init = function(e, t, n) {
            this.cell = n;
            this.level = Match3Level.instance;
            addChild(this.sprite, this.level.gemDestroyLayer);
            this.sprite.gotoAndPlay(this.fileName);
            this.sprite.x = e;
            this.sprite.y = t;
            this.level.objects.push(this);
            this.isDestroyed = false;
            this.playedScore = false;
            if (Match3Level.instance && this.color < Match3Level.instance.assetNumber) {
                SoundsManager.instance.playSound("remove" + (getInt(4) + 1))
            }
        };
        t.prototype.release = function() {
            this.sprite.stop();
            removeClip(this.sprite);
            this.isDestroyed = true
        };
        t.animLen = [16, 13, 16, 17];
        t.animSizes = [cjp(98, 135), cjp(133, 96), cjp(110, 114), cjp(83, 118)];
        t.regPoints = [cjp(54, 74), cjp(66, 62), cjp(52, 60), cjp(42, 38)];
        return t
    }
    (GameObject);
var BonusLineSprite = function(e) {
        function t(t, n, r) {
            e.call(this);
            this.sprites = [];
            this.speeds = [];
            this.type = t;
            var i;
            var s;
            var o;
            switch (t) {
                case 1:
                    i = 2;
                    s = [90, -90];
                    o = [cjp(0, 0), cjp(0, 0)];
                    break;
                case 2:
                    i = 2;
                    s = [0, 180];
                    o = [cjp(0, 0), cjp(0, 0)];
                    break;
                case 5:
                    i = 4;
                    s = [90, -90, 0, 180];
                    o = [cjp(0, 0), cjp(0, 0), cjp(0, 0), cjp(0, 0)];
                    break;
                case 6:
                    i = 12;
                    s = [0, 0, 0, 90, 90, 90, 180, 180, 180, -90, -90, -90];
                    o = [cjp(-1, -1), cjp(0, -1), cjp(1, -1), cjp(1, -1), cjp(1, 0), cjp(1, 1), cjp(-1, 1), cjp(0, 1), cjp(1, 1), cjp(-1, -1), cjp(-1, 0), cjp(-1, 1)];
                    break
            }
            var u = Match3Level.TILE_SIZE / FieldObject.GEM_KILL_DELAY;
            for (var a = 0; a < i; ++a) {
                var f = createSpriteFromSpritesheet("explosion line");
                f.x = n + o[a].x * Match3Level.TILE_SIZE;
                f.y = r + o[a].y * Match3Level.TILE_SIZE;
                this.sprites.push(f);
                addChild(f, this.level.bonusLayer);
                f.regX = 25;
                f.regY = 65;
                f.rotation = s[a];
                this.speeds.push(cjp(f.rotation == 90 ? u : f.rotation == -90 ? -u : 0, f.rotation == 0 ? -u : f.rotation == 180 ? u : 0))
            }
            this.level.objects.push(this)
        }
        __extends(t, e);
        t.prototype.update = function(e) {
            var t = 0;
            var n = this.sprites.length;
            for (var r = 0; r < n; ++r) {
                var i = this.sprites[r];
                if (i.visible) {
                    t++;
                    i.x += this.speeds[r].x * e;
                    i.y += this.speeds[r].y * e;
                    var s = i.getBounds();
                    if (s.x + i.x > App.SCREEN_W + 100 || s.y + i.y > App.ACTUAL_H + 100 || s.x + s.width + i.x < -100 || s.y + s.height + i.y < -100) {
                        i.visible = false;
                        removeClip(i)
                    }
                }
            }
            if (t == 0)
                this.destroy()
        };
        t.prototype.destroy = function() {
            if (this.isDestroyed || !this.sprites)
                return;
            e.prototype.destroy.call(this);
            var t = this.sprites.length;
            for (var n = 0; n < t; ++n)
                removeClip(this.sprites[n]);
            this.sprites = null;
            this.speeds = null
        };
        return t
    }
    (GameObject);
var BonusBombSprite = function(e) {
        function t(t, n, r) {
            var i = this;
            e.call(this);
            this.progress = 0;
            this.maxScale = 0;
            var s = t == 3 ? 2.5 : 4;
            this.maxScale = 1.75 * s * FieldObject.TILE_SIZE / 65;
            createjs.Tween.get(this).wait(100).to({
                progress: 1
            }, 1.6 * s * 1e3 * FieldObject.GEM_KILL_DELAY, createjs.Ease.cubicOut).call(function() {
                return i.destroy()
            });
            this.sprite = createSpriteFromSpritesheet("explosion bomb");
            this.sprite.x = n;
            this.sprite.y = r;
            this.sprite.regX = this.sprite.regY = 135 / 2;
            addChild(this.sprite, this.level.bonusLayer);
            this.level.objects.push(this)
        }
        __extends(t, e);
        t.prototype.update = function(e) {
            this.sprite.scaleX = this.sprite.scaleY = lerp(.1, this.maxScale, this.progress);
            this.sprite.alpha = this.progress < .6 ? lerp(.3, 1, this.progress / .6) : lerp(1, 0, (this.progress - .6) / .4)
        };
        return t
    }
    (GameObject);
var LevelManager = function() {
        function e() {
            this.data = [];
            this.currentLevel = 0;
            this.version = .924;
            this.isFirstLoad = true;
            this.lastOpened = 0;
            this.moves = 0;
            this.bonuses = 0;
            this.version += App.episode * 10;
            e.LEVEL_AMOUNT = App.episode == 0 ? 60 : 35;
            e.instance = this;
            var t = e.levelDatas[App.episode];
            for (var n = 0; n < e.LEVEL_AMOUNT; ++n) {
                var r = n < t.length ? "=" + t[n] : null;
                this.data.push(new LevelData(n, r, n == 0 ? LevelData.OPENED_STATE : LevelData.CLOSED_STATE))
            }
            this.load()
        }
        Object.defineProperty(e.prototype, "totalScores", {
            get: function() {
                var e = this.data.length;
                var t = 0;
                for (var n = 0; n < e; ++n)
                    t += this.data[n].score;
                return t
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(e.prototype, "totalStars", {
            get: function() {
                var e = this.data.length;
                var t = 0;
                for (var n = 0; n < e; ++n)
                    t += this.data[n].stars;
                return t
            },
            enumerable: true,
            configurable: true
        });
        e.prototype.loadLevel = function(e) {
            MenuManager.instance.closeCurrent();
            this.currentLevel = e;
            App.level.init(e)
        };
        e.prototype.loadNextLevel = function() {
            this.data[this.currentLevel].state = LevelData.COMPLETED_STATE;
            if (this.currentLevel < e.LEVEL_AMOUNT - 1) {
                this.currentLevel++;
                var t = this.data[this.currentLevel].state;
                this.data[this.currentLevel].state = Math.max(LevelData.OPENED_STATE, this.data[this.currentLevel].state);
                this.lastOpened = Math.max(this.lastOpened, this.currentLevel);
                if (t == LevelData.CLOSED_STATE)
                    MenuManager.instance.map.levelToUnlock = this.currentLevel;
                MenuManager.instance.show(MenuManager.instance.map)
            }
            this.save()
        };
        e.prototype.restartLoadNextLevel = function() {
            this.data[this.currentLevel].state = LevelData.COMPLETED_STATE;
            if (this.currentLevel < e.LEVEL_AMOUNT - 1) {
                var t = this.data[this.currentLevel + 1].state;
                this.data[this.currentLevel + 1].state = Math.max(LevelData.OPENED_STATE, this.data[this.currentLevel + 1].state);
                this.lastOpened = Math.max(this.lastOpened, this.currentLevel + 1);
                if (t == LevelData.CLOSED_STATE)
                    MenuManager.instance.map.fastUnlock(this.currentLevel + 1)
            }
            this.save()
        };
        e.prototype.onLevelComplete = function(e, t) {
            MenuManager.instance.winMenu.setStarData(e);
            this.data[this.currentLevel].state = LevelData.COMPLETED_STATE;
            this.data[this.currentLevel].stars = Math.max(e, this.data[this.currentLevel].stars);
            this.data[this.currentLevel].score = Math.max(t, this.data[this.currentLevel].score);
            this.save()
        };
        e.prototype.prepareToLoadLevel = function(e) {
            MenuManager.instance.transition.play(null, e)
        };
        e.prototype.restartLevel = function() {
            this.prepareToLoadLevel(this.currentLevel)
        };
        e.prototype.save = function() {
            if (!this.isLocalStorageAvailable)
                return;
            var e = {
                version: this.version,
                moves: this.moves,
                bonuses: this.bonuses
            };
            var t = [];
            for (var n = 0; n < this.data.length; ++n) {
                var r = this.data[n];
                t.push({
                    c: r.state,
                    s: r.stars,
                    p: r.score
                })
            }
            e.levels = t;
            localStorage.setItem("save", JSON.stringify(e))
        };
        e.prototype.load = function() {
            if (!this.isLocalStorageAvailable)
                return;
            var e = localStorage.getItem("save");
            if (!e)
                return;
            e = JSON.parse(e);
            var t = e.levels;
            if (!t)
                return;
            if (this.version != e.version) {
                localStorage.clear();
                return
            }
            this.moves = Math.max(this.moves, e.moves);
            this.bonuses = Math.max(this.bonuses, e.bonuses);
            for (var n = 0; n < t.length; ++n) {
                this.data[n].state = t[n].c;
                this.data[n].stars = t[n].s;
                this.data[n].score = t[n].p;
                if (this.data[n].state >= LevelData.OPENED_STATE)
                    this.lastOpened = Math.max(this.lastOpened, n)
            }
            this.isFirstLoad = false
        };
        Object.defineProperty(e.prototype, "isLocalStorageAvailable", {
            get: function() {
                try {
                    localStorage.setItem("test", "test");
                    localStorage.removeItem("test");
                    return "localStorage" in window && window["localStorage"] !== null
                } catch (e) {
                    return false
                }
            },
            enumerable: true,
            configurable: true
        });
        e.LEVEL_AMOUNT = App.episode == 0 ? 60 : 35;
        e.levelDatas = [
            ["00030202040000000000000403020100000000000000040203000003020000000303010001040403000201040303020401000301010103010404040200020101030204040300000004020402010402000000000001000001000000000000000000000000-4-800-1-800-900-1000-17-1111111111", "00000001020401040000000000040202020301000000000301020202030410101010020203020201000000101004030202010000000010100401040300000000001010101010000000000000000000000000000000000000000000000000000000000000-4-1300-1-1300-1500-1700-25-1111111111", "00000000000000020102000000000000000102010000001010101002010200000010000010010201000000000000000201020000000000000001020100000010000010020102000000101010100102010000000000000002010200000000000000010201-3-45-1-1400-1900-2600-42-1111111111", "00002000002000002000000020000020000020000000200000200000200000032000002000002000000320000020000020000003200000200000200000032000002000002000000020000020000020000000200000200000200000002000002000002000-4-1500-0-1500-1700-1900-25-1111111111", "00000000000000002020000000000000000000200000200000000020000000000020202020000000000000200404200000000000002004042000000000000020202020000000000020000000002000000000000000000000002000000000000000002020-0-1500-1-1500-2500-3500-35-1111111111", "00000000000000000000000000002010101010000000000020202020100000000000202020200000000000002020202000000000000020202020000000000000202020200000000000002020202010000000000020101010100000000000000000000000-0-1500-1-1400-2000-3200-38-1111111111", "00030220000000000000000204200000000000000004032000000000000000030220000000000000202020202020202020202020202020202020202000000000020120000000000000000403200000000000000002012000000000000000010420000000-3-35-1-1500-1800-2100-30-1111111111", "00002000200020002010000010200020002000200000200020002000201000001020002000200020000020002000200020100000102000200020002000002000200020002010000010200020002000200000200020002000201000001020002000200020-0-1500-1-2500-3000-3900-65-1111111111", "10202020202020202010001020202020202010000000002020202000000000000000202000000000000000000000000000000000000000000000000000000000202000000000000000202020200000000010202020202020100010202020202020202010-3-70-0-2000-2500-3200-40-1111111111", "00000010001000000000000000001000000000000000001000100000000000000000100000000000000000100010000000000000000010000000000000000010001000000000000000001000000000000000001000100000000000000000100000000000-2-2-1-1600-2400-3000-35-0101010101", "00000000202020000000000000000020202000000000000000002020200000000000002020200000000000002020200000000000000000202020000000000000000020202000000000000000002020200000000000000000202000000000000000202020-2-2-1-2700-3800-4900-60-1111111111", "00000000000000000000002020000000200000000020201000000020000000001020200000002000000000202010000000202000000010202000000000200000002020100000000020000000102020000000002000000020200000000000000000000000-0-2500-1-2500-3100-3700-45-1111111111", "00000000202000000000000000002020000000000000000020200000000000000000202000000000101010102020202020201010101020202020202000000000202000000000000000002020000000000000000020200000000000000000202000000000-2-2-1-2200-3200-4100-55-0110000110", "00000000000000000000000000002020000000000000001020201000000000000000202000002020000000000000001020200000000000000010202000000000202000002020000000102020100000000000000020200000000000000000000000000000-3-70-3-2000-2800-3400-48-1111111111", "00000000000000000000000000000000000000001010101010101010101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000-2-2-1-3500-4500-5500-62-1100000000", "00000000000000000000000000000000000000000000201010101010101000002020505050505051000020205000000000510000202050000000005100002020505050505051000020101010101010100000000000000000000000000000000000000000-1-1-1-1800-2500-3300-30-1100000000", "20200000000020205050202000000000202050500000000000002020202000000000000020202020000000000000000000002020202020000000000020202020200000000000505050202000002020205050502020000020202050505020200000202050-1-1-1-1400-2700-3500-35-1111111111", "10511052105310541051105110521053105410512020202020202020202000000000000000000000000000000000000000000000000000000000000000000000000000000000202020202020202020201051105210531054105110511052105310541051-1-1-1-3000-3900-4700-50-1111111111", "10101010101010101010101020202020202020201020000000000000000000200020002000200020200020002000200020000020002000200020002020002000200020002000102000000000000000001010202020202020202010101010101010101010-2-3-1-3500-4500-5900-55-0001111000", "00000000000000000000000000105020001050200000001050200010502000105020001050200000001050200010502000000000001050200010502000000010502000105020001050200010502000000010502000105020000000000000000000000000-1-1-1-2300-3200-4500-55-0001111000", "00000000000000001054000000000000000010530000000000000000105100000000000000001052000000000000000010140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000-1-1-1-2700-3600-4900-50-1111111111", "00105010501050105010005050505050505050500000000000000000501000000000000000005050000000000000000050100000000000000000501000000000000000005050000000000000000050100050505050505050505000105010501050105010-1-1-1-2500-3000-3500-40", "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010101010101010101010501010505050501010505050505050505050505050505050101050505050-1-1-1-2500-3200-3800-40-1111111111", "00202010000000000020002020102000000000200020202020200000002000202010202020002020002020202020200020200020202020202000202000202010202020002020002020202020000000200020201020000000002000202010000000000020-0-2500-1-2300-3100-3800-40-1111111111", "04042050202020502020100420202050202020501010205020202050202010001020205020202050100000102020205020201000000010502020205010000000001020502020100000000000102020501000000000000010202010101010101010101050-1-1-1-2900-3500-4300-45-1111111111", "10000010505050500000100010505050505000001010505050505050000010202010101010100000000000000000000000000000000000000000000010202010101010100000101050505050505000001000105050505050000010000010505050500000-1-1-1-2500-3400-4300-45-1111111111", "00000000000000000000000000000000000000000000000000303030303000000000002020202030000000000020202020300000000000202020203000000000002020202030000000000030303030300000000000000000000000000000000000000000-0-1-1-2200-2800-4000-48-1111111111", "00000000000000302050000000000000003020500000000000000030205000003030303030303050000000000000000000500000000000000000005000003030303030303050000000000000003020500000000000000030205000000000000000302050-1-1-1-2000-3100-4100-42-1111111111", "50505020000020205050505020200000205050505050502000002020505050502020000020505050505050200000202050505050202000002050505050505020000020205050505020200000205050505050502000002020505050502020000020505050-1-1-1-2500-3300-4200-40-0110000110", "00000000000000000000000000005555555500000000000055606030000000000000556060300000000000005555555500000000000000000000000000555555550055555555005560603000556060300055606030005560603000555555550055555555-1-1-1-2500-3300-4500-60-1111111111", "30303020000020300000000030200000203000000000302000002030000030303020202020303030202020303030302020200000203000003020000000002030000030200000202020303030302020203030302020202030303000003020000020300000-2-1-1-2600-3600-4400-58-0110011000", "00003053300000000000000030303000000000000000000000000000000000000000000000101010000000000000001051100000000000000010101000000020202000000000000000205220000000000000002020200000000000000000000000000000-1-1-1-1600-2000-2600-25-1111111111", "00000000000000000000000000000000000000000000000000000000000020302030203020302030501050501050501050505010505010505010505030203020302030203020000000000000000000000000000000000000000000000000000000000000-1-2000-1-2800-3600-4500-52-1111111111", "00000000000000000401000000303030303030040000300303030303300100300303030303300104003003033003030330010030030303030330010400300303300303033001000030030303033001040000003030303030300100000000000000000104-3-50-3-2000-2800-3600-26-1111111111", "30300201040304010230003030020402010330300000303030033030300000000000303030000000000000000000000000000000000000000000002020200000000000202020042020200020202003040302042020200103020101020301020402040301-4-2000-1-2000-2600-3400-30-1111111111", "00000000000000000000000030303000202020000000305050002050500000003030300020505000000000000000202020000000202020000000000000002050500030303000000020505000305050000000202020003030300000000000000000000000-1-1-1-2000-3000-3500-35", "00300000300000300000200030000030000030000020003000003000003000002000300000300000200000200030000030000020000020003000003000002000002000300000200000200000200030000020000020000020003000002000002000002000-0-1-1-2000-3000-3600-35-1111111111", "00000000000000000000000000000000000000300000000000000000301000000000000000301050000000000000301050500000000000303050505000000000000030105050000000000000003010500000000000000000301000000000000000000030-1-2000-1-3500-4200-5500-45-1111111111", "00000000000000000000000030303010303030000000305050005050300000003050500050503000000010000000000010000000100000000000100000003050500050503000000030505000505030000000303030103030300000000000000000000000-1-1-1-2400-3000-3800-40-1111111111", "00200000000505000000200020000005050000000020000000050500000020002000000505000000002000000005050000002000200000050500000000200000000505000000200020000005050000000020000000050500000020002000000505000000-2-3-1-2700-4100-5400-60-1111111111", "00000040000000400050000000400000004000500000004000000040005000000040000000400050000000101010101000501010101000000010101000000040000000400050000000400000004000500000004000000040005000000040000000400050-1-3-1-2800-3400-4200-55-1111111111", "00000000301055105510000000003020505050550000000030200000501000000000302000005055000000003020000050100000000030200000501000000000302000005055000000003020000050100000000030205050505500000000301055105510-1-1-1-3100-3800-5300-55-1100000000", "00000020550000000000000000205500000000000000002055000000100000000020550000101010000000205500005555550000002055000055555500000020550000101010000000205500000010000000002055000000000000000020550000000000-1-1-1-3000-3800-4500-45-1100000000", "00000000000000000000000000000000000000000005050505050505050020002010200000000000102010201020000000202010200020102000201000000000002010201020000000000000201020000005050505050505050000000000000000000000-3-50-0-1800-2500-3000-45-1111111111", "00000020050000000000000000200505000000000000000020050000000000000000200500000000000000002005050000000000000000200500000000000000002005000000000000000020050500000000000000002005000000000000000020050000-2-3-1-3000-3700-4600-45-1111111111", "00000000000000000000000000000000000000000000050500000505000000400555505055050000004000505555500000000040005055555000000000400555505055050000000005050000050500000000000000000000000000000000000000000000-1-1-1-1400-2100-2600-20-1100000000", "00002020202020205030000055555555555550300000553030303030503000005555555555555030000020202020202050300000202020202020503000005555555555555030000055303030303050300000555555555555503000002020202020205030-1-1-1-3300-4000-4800-55-1100000000", "00004000000000200040002000300000000030000000000000000000000000000030003000000030000020000000400020000000004000200000004040000000000000000000002000002000000030003000004000300020000000000000000000004000-4-3400-1-3300-3800-4200-35-1111111111", "00000060000000000030000000500000000000306050000050000000003000500000005050000030000050500000005050306050005000505050503000000050505050500030505050000050000000306000000050600000003000000060000000000030-1-3400-1-2500-3100-3800-35-1111111111", "00000000000010101010000000000000100060500000000000004000005000000000000010101010000000000000100000500000000000004000605000000000000010000050000000000000101010100000000000004000005000000000000010006050-1-3400-1-4000-4800-5600-65-1111111111", "00000000202060505050000000000020206050500000000000002020605000000000000000202060000000000000000020200000000000000000002000000000000000000030000000000000000030300000000000000030305000000000000030305050-1-3400-1-3000-3500-4000-45-1111111111", "00000000000000000010000000000000000010600000000000000010605000000000000010605050000000000000001050500000000000001060505000000000000000106050000000000000000010600000000000000000001000000000000000000010-1-3400-1-3900-4800-5900-50-1111111111", "00000000002020300040000000000020200030000000000000202030004000000000002020003000000000000020203000400000000000202000300000000000002020300040000000000020200030000000000000202030004000000000002020003000-2-3-1-3500-4500-5500-55-1111111111", "00000000000020100000000000000000203010000000000000002030501000000000000020305060000000000000203050600000000000002030506000000000000020305060000000000000203050100000000000002030100000000000000020100000-1-3400-1-4100-5600-6300-50-1111111111", "10101010101010101010005050505050505050100050606060606060501000506050505050605010005060506060506050100050605060605060501000506050505050605010005060606060606050100050505050505050501010101010101010101010-1-1-1-2500-4000-5000-40-1111111111", "00000000000000000000004040404040404040000040303030303030400000404040404040304000000000002020403040000000000020204030400000202020000040304000002020200000403040000020202000004040400000000000000000000000-3-65-2-3000-4500-5600-40-1111111111", "50501010101010105050505050503030505050500050502020202050501000502020303020205010003020303030302030100030203030303020301000502020303020205010005050202020205050105050505030305050505050501010101010105050-1-1-1-2200-3300-4000-45-1111111111", "30302020200000000000003030202020000000000000303020202000000000000030302020200000000000003020202000000000000030202020000000000030302020200000000030302020200000000030302020200000000030302020200000000000-0-1-1-2500-3800-4500-45-1111111111", "00000000000000000000030201020304101010100104032020203030303003020201020330405050010401202020304050500402032020203040505002010402030430405050040103202020303030300102020401031010101000000000000000000000-1-2000-1-2200-2700-3500-40-1111111111", "00000000000000203010000000000000203010500000000000203010505000000000203010505000000000203010505000100000203010505000101000203010505000101000203010505000101000003010505000101000000010505000101000000000-1-1-1-1500-2700-3300-50"],
            ["00030202040000000000000403020100000000000000040203000003020000000303010001040403000201040303020401000301010103010404040200020101030204040300000004020402010402000000000001000001000000000000000000000000-4-800-1-800-900-1000-17-1111111111", "00000001020401040000000000040202020301000000000301020202030410101010020203020201000000101004030202010000000010100401040300000000001010101010000000000000000000000000000000000000000000000000000000000000-4-1300-1-1300-1500-1700-25-1111111111", "00000000000000020102000000000000000102010000001010101002010200000010000010010201000000000000000201020000000000000001020100000010000010020102000000101010100102010000000000000002010200000000000000010201-3-45-1-1400-1900-2600-42-1111111111", "00002000002000002000000020000020000020000000200000200000200000032000002000002000000320000020000020000003200000200000200000032000002000002000000020000020000020000000200000200000200000002000002000002000-4-1500-0-1500-1700-1900-25-1111111111", "00000000000000002020000000000000000000200000200000000020000000000020202020000000000000200404200000000000002004042000000000000020202020000000000020000000002000000000000000000000002000000000000000002020-0-1500-1-1500-2500-3500-38-1111111111", "00000000000000000000000000002010101010000000000020202020100000000000202020200000000000002020202000000000000020202020000000000000202020200000000000002020202010000000000020101010100000000000000000000000-0-1500-1-1400-2000-3200-38-1111111111", "00030220000000000000000204200000000000000004032000000000000000030220000000000000202020202020202020202020202020202020202000000000020120000000000000000403200000000000000002012000000000000000010420000000-3-35-1-1500-1800-2100-30-1111111111", "00002000200020002010000010200020002000200000200020002000201000001020002000200020000020002000200020100000102000200020002000002000200020002010000010200020002000200000200020002000201000001020002000200020-0-1500-1-2500-3000-3900-65-1111111111", "10202020202020202010001020202020202010000000002020202000000000000000202000000000000000000000000000000000000000000000000000000000202000000000000000202020200000000010202020202020100010202020202020202010-3-65-0-2000-2500-3200-50-1111111111", "00000010001000000000000000001000000000000000001000100000000000000000100000000000000000100010000000000000000010000000000000000010001000000000000000001000000000000000001000100000000000000000100000000000-2-2-1-1600-2400-3700-45-0101010101", "00000000202020000000000000000020202000000000000000002020200000000000002020200000000000002020200000000000000000202020000000000000000020202000000000000000002020200000000000000000202000000000000000202020-2-2-1-2700-3800-4900-60-1111111111", "00000000000000000000002020000000200000000020201000000020000000001020200000002000000000202010000000202000000010202000000000200000002020100000000020000000102020000000002000000020200000000000000000000000-0-2500-1-2500-3100-3700-45-1111111111", "00000000202000000000000000002020000000000000000020200000000000000000202000000000101010102020202020201010101020202020202000000000202000000000000000002020000000000000000020200000000000000000202000000000-2-2-1-2200-3200-4100-55-0110000110", "00000000000000000000000000002020000000000000001020201000000000000000202000002020000000000000001020200000000000000010202000000000202000002020000000102020100000000000000020200000000000000000000000000000-3-70-3-2000-2800-3400-48-1111111111", "00000000000000000000000000000000000000001010101010101010101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000-2-2-1-3500-4500-5500-62-1100000000", "00000000000000000000000000000000000000000000201010101010101000002020505050505051000020205000000000510000202050000000005100002020505050505051000020101010101010100000000000000000000000000000000000000000-1-1-1-1800-2500-3300-30-1100000000", "20200000000020205050202000000000202050500000000000002020202000000000000020202020000000000000000000002020202020000000000020202020200000000000505050202000002020205050502020000020202050505020200000202050-1-1-1-1400-2700-3500-35-1111111111", "10511052105310541051105110521053105410512020202020202020202000000000000000000000000000000000000000000000000000000000000000000000000000000000202020202020202020201051105210531054105110511052105310541051-1-1-1-3000-3900-4800-55-1111111111", "10101010101010101010101020202020202020201020000000000000000000200020002000200020200020002000200020000020002000200020002020002000200020002000102000000000000000001010202020202020202010101010101010101010-2-3-1-3500-4500-5900-55-0001111000", "00000000000000000000000000105020001050200000001050200010502000105020001050200000001050200010502000000000001050200010502000000010502000105020001050200010502000000010502000105020000000000000000000000000-1-1-1-2300-3200-4500-55-0001111000", "00000000000000001054000000000000000010530000000000000000105100000000000000001052000000000000000010140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000-1-1-1-2700-3600-4900-50-1111111111", "00105010501050105010005050505050505050500000000000000000501000000000000000005050000000000000000050100000000000000000501000000000000000005050000000000000000050100050505050505050505000105010501050105010-1-1-1-2500-3000-3500-40", "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010101010101010101010501010505050501010505050505050505050505050505050101050505050-1-1-1-2500-3200-3800-40-1111111111", "00202010000000000020002020102000000000200020202020200000002000202010202020002020002020202020200020200020202020202000202000202010202020002020002020202020000000200020201020000000002000202010000000000020-0-2500-1-2300-3100-4300-48-1111111111", "04042050202020502020100420202050202020501010205020202050202010001020205020202050100000102020205020201000000010502020205010000000001020502020100000000000102020501000000000000010202010101010101010101050-1-1-1-2900-3500-4300-45-1111111111", "10000010505050500000100010505050505000001010505050505050000010202010101010100000000000000000000000000000000000000000000010202010101010100000101050505050505000001000105050505050000010000010505050500000-1-1-1-2500-3400-4300-45-1111111111", "00000000000000000000000000000000000000000000000000303030303000000000002020202030000000000020202020300000000000202020203000000000002020202030000000000030303030300000000000000000000000000000000000000000-0-1-1-2200-2800-4000-48-1111111111", "00000000000000302050000000000000003020500000000000000030205000003030303030303050000000000000000000500000000000000000005000003030303030303050000000000000003020500000000000000030205000000000000000302050-1-1-1-2000-3100-4100-42-1111111111", "50505020000020205050505020200000205050505050502000002020505050502020000020505050505050200000202050505050202000002050505050505020000020205050505020200000205050505050502000002020505050502020000020505050-1-1-1-2500-3300-4200-40-0110000110", "00000000000000000000000000005555555500000000000055606030000000000000556060300000000000005555555500000000000000000000000000555555550055555555005560603000556060300055606030005560603000555555550055555555-1-1-1-2500-3300-4500-60-1111111111", "30303020000020300000000030200000203000000000302000002030000030303020202020303030202020303030302020200000203000003020000000002030000030200000202020303030302020203030302020202030303000003020000020300000-2-1-1-2600-3600-4400-58-0110011000", "00003053300000000000000030303000000000000000000000000000000000000000000000101010000000000000001051100000000000000010101000000020202000000000000000205220000000000000002020200000000000000000000000000000-1-1-1-1600-2000-2600-25-1111111111", "00000000000000000000000000000000000000000000000000000000000020302030203020302030501050501050501050505010505010505010505030203020302030203020000000000000000000000000000000000000000000000000000000000000-1-2000-1-2800-3600-4500-52-1111111111", "00000000000000000401000000303030303030040000300303030303300100300303030303300104003003033003030330010030030303030330010400300303300303033001000030030303033001040000003030303030300100000000000000000104-3-50-3-2000-2600-3000-21-1111111111", "30300201040304010230003030020402010330300000303030033030300000000000303030000000000000000000000000000000000000000000002020200000000000202020042020200020202003040302042020200103020101020301020402040301-4-2200-1-2000-2600-3400-23-1111111111"],
            ["00040103030310000000000002030104100000000000020104031010101000000402030304010000000104040303030200000403010102020301000004020404040404020000010302020101101010100000000002011000000000000000040110000000-4-1000-1-800-1100-1400-20-1111111111", "00000000000000021010000000001000040403101010101010100101020300000000100203010102000000000401010401010000000002010401010200000000100101010304101010101010030202030000000010020104041000000000000002011010-4-1100-1-1000-1300-1500-25-1111111111", "00101000000000000000100000100000000000101000001000000000100000101000000000001000000000000000000000100000000000101000000000000000100000100000000000001000001000001000000000101000000000100000000000000000-3-33-2-1600-1900-2200-35-1111111111", "00000000000003032020000000000000000320200000000000000000202000000000000000002020000000000000000020200000000000000000202000000000000000002020000000000000000020200000000000000004202000000000000004042020-0-1500-1-1800-2300-2500-40-1111111111", "00000020000000200000000000002000200000000000000000200000000020000000200020000000002000200000002000200000200000000000200000200020000000200020200000002000200000000000000000200000000000000000200020000000-2-2-1-2700-3500-4800-65-1111111111", "00000000000000200000002010001000001000000000000020000000002000100000000020100010002000000000000000000000001020000010000010200000000000200000000000002000000000100020000010001020002000100000000000000000-4-1700-1-1700-1900-2200-35-1111111111", "10000000000000000000000020505000205050000000205050002050500200002050500020505401100020505000205351011000205050002051510100002050500020535101000020505000205054010000205050002050500210000000000000000000-1-1-1-2000-2600-3600-38-1111111111", "00000000000000000000100010001000100010001000100010001000100000000000000000000000001020001020001020000020200020200020200000202000202000202000002020002020002020000010200010200010200000000000000000000000-3-50-1-2000-2500-3000-50-1111111111", "00000000000000000000000000000000000000000000505050505050000000005000000000500000000050005050005000000000500050500050000000005000000000500000000050505050505000000000000000000000000000000000000000000000-1-1-1-1800-2100-2700-26-1111111111", "00000020000000101010000000202000000010100000000020200000001000000000002020000050101010101010502000501010101010105020005000000000002020000050000000002020000000100000002020000000101000000020000000101010-1-2000-1-1000-1900-2700-45-1111111111", "00000000000000000000000030303000202020000000305050002050500000003030300020505000000000000000202020000000202020000000000000002050500030303000000020505000305050000000202020003030300000000000000000000000-1-1-1-2100-3000-3400-35-1111111111", "00300000300000300000200030000030000030000020003000003000003000002000300000300000200000200030000030000020000020003000003000002000002000300000200000200000200030000020000020000020003000002000002000002000-0-1-1-2000-3000-3600-40-1111111111", "00000000000000000000000000000000000000300000000000000000301000000000000000301050000000000000301050500000000000303050505000000000000030105050000000000000003010500000000000000000301000000000000000000030-1-2000-1-3500-4200-4700-45-1111111111", "00000000000000000000000030303010303030000000305050005050300000003050500050503000000010000000000010000000100000000000100000003050500050503000000030505000505030000000303030103030300000000000000000000000-1-1-1-2000-2700-3700-50-1111111111", "00200000000505000000200020000005050000000020000000050500000020002000000505000000002000000005050000002000200000050500000000200000000505000000200020000005050000000020000000050500000020002000000505000000-2-2-1-3200-4200-5500-60-1111111111", "00000040000000400050000000400000004000500000004000000040005000000040000000400050000000101010101000501010101000000010101000000040000000400050000000400000004000500000004000000040005000000040000000400050-1-3-1-2800-3400-4500-62-1111111111", "00000000301055105510000000003020505050550000000030200000501000000000302000005055000000003020000050100000000030200000501000000000302000005055000000003020000050100000000030205050505500000000301055105510-1-1-1-3500-4300-5900-68-1100000000", "00000020550000000000000000205500000000000000002055000000100000000020550000101010000000205500005555550000002055000055555500000020550000101010000000205500000010000000002055000000000000000020550000000000-1-1-1-3500-4200-5300-55-1100000000", "00000000000000000000000000000000000000000005050505050505050020002010200000000000102010201020000000202010200020102000201000000000002010201020000000000000201020000005050505050505050000000000000000000000-3-50-0-2200-3000-3700-45-1111111111", "00000020050000000000000000200505000000000000000020050000000000000000200500000000000000002005050000000000000000200500000000000000002005000000000000000020050500000000000000002005000000000000000020050000-2-3-1-4000-4500-5700-55-1111111111", "00000000000000000000000000000000000000000000050500000505000000400555505055050000004000505555500000000040005055555000000000400555505055050000000005050000050500000000000000000000000000000000000000000000-1-1-1-1400-2100-2600-30-1100000000", "00002020202020205030000055555555555550300000553030303030503000005555555555555030000020202020202050300000202020202020503000005555555555555030000055303030303050300000555555555555503000002020202020205030-1-1-1-4000-4600-5600-65-1100000000", "00004000000000200040002000300000000030000000000000000000000000000030003000000030000020000000400020000000004000200000004040000000000000000000002000002000000030003000004000300020000000000000000000004000-4-3400-1-3300-3800-4200-35-1111111111", "00000060000000000030000000500000000000306050000050000000003000500000005050000030000050500000005050306050005000505050503000000050505050500030505050000050000000306000000050600000003000000060000000000030-1-3400-1-2500-3100-4100-38-1111111111", "00000000000010101010000000000000100060500000000000004000005000000000000010101010000000000000100000500000000000004000605000000000000010000050000000000000101010100000000000004000005000000000000010006050-1-3400-1-5000-6500-7500-90-1111111111", "00000000202060505050000000000020206050500000000000002020605000000000000000202060000000000000000020200000000000000000002000000000000000000030000000000000000030300000000000000030305000000000000030305050-1-3400-1-3000-3500-3900-45-1111111111", "00000000000000000010000000000000000010600000000000000010605000000000000010605050000000000000001050500000000000001060505000000000000000106050000000000000000010600000000000000000001000000000000000000010-1-3400-1-4000-5200-6200-65-1111111111", "00000000002020300040000000000020200030000000000000202030004000000000002020003000000000000020203000400000000000202000300000000000002020300040000000000020200030000000000000202030004000000000002020003000-2-3-1-4500-6200-7500-75-0011111100", "00000000000020100000000000000000203010000000000000002030501000000000000020305060000000000000203050600000000000002030506000000000000020305060000000000000203050100000000000002030100000000000000020100000-1-3400-1-3800-4500-5300-55-1111111111", "10101010101010101010005050505050505050100050606060606060501000506050505050605010005060506060506050100050605060605060501000506050505050605010005060606060606050100050505050505050501010101010101010101010-1-1-1-2500-4000-5000-50-1111111111", "00000000000000000000004040404040404040000040303030303030400000404040404040304000000000002020403040000000000020204030400000202020000040304000002020200000403040000020202000004040400000000000000000000000-3-65-2-3000-4500-5600-48-1111111111", "50501010101010105050505050503030505050500050502020202050501000502020303020205010003020303030302030100030203030303020301000502020303020205010005050202020205050105050505030305050505050501010101010105050-1-1-1-2900-4000-5400-65-1111111111", "30302020200000000000003030202020000000000000303020202000000000000030302020200000000000003020202000000000000030202020000000000030302020200000000030302020200000000030302020200000000030302020200000000000-0-1-1-2500-3800-4500-48-1111111111", "00000000000000000000030201020304101010100104032020203030303003020201020330405050010401202020304050500402032020203040505002010402030430405050040103202020303030300102020401031010101000000000000000000000-1-2000-1-2200-2700-3700-45-1111111111", "00000000000000203010000000000000203010500000000000203010505000000000203010505000000000203010505000100000203010505000101000203010505000101000203010505000101000003010505000101000000010505000101000000000-1-1-1-1800-2900-3800-70-1111111111"]
        ];
        return e
    }
    ();
var LevelData = function() {
        function e(t, n, r) {
            if (typeof r === "undefined") {
                r = 0
            }
            this.state = 0;
            this.levelNumber = 0;
            this.stars = 0;
            this.score = 0;
            this.pushPositions = [];
            this.hasWhiteChoco = false;
            this.hasBlackChoco = false;
            this.data = n;
            if (!this.data)
                this.data = e.defaultData;
            this.state = r;
            this.levelNumber = t;
            this.stars = 0;
            for (var i = 0; i < Match3Level.LEVEL_W; ++i)
                this.pushPositions.push(i);
            var s = this.data.split("-");
            this.cellData = s[0];
            this.targetData = parseInt(s[1]);
            this.customData = parseInt(s[2]);
            this.customData2 = parseInt(s[3]);
            this.movesLeft = parseInt(s[7]);
            this.starValues = [parseInt(s[4]), parseInt(s[5]), parseInt(s[6])];
            if (s.length > 8) {
                this.pushPositions = [];
                var o = s[8];
                for (var u = 0; u < o.length && u < Match3Level.LEVEL_W; ++u)
                    if (parseInt(o.charAt(u)) == 1)
                        this.pushPositions.push(u)
            }
            for (var i = 0; i < Match3Level.LEVEL_W; ++i) {
                for (var a = 0; a < Match3Level.LEVEL_H; ++a) {
                    var f = Match3Level.getCellDataType(this.cellData, i, a);
                    if (f == 2)
                        this.hasWhiteChoco = true;
                    if (f == 3)
                        this.hasBlackChoco = true
                }
            }
            switch (this.targetData) {
                case 0:
                    this.targetSpriteName = "chocolate white";
                    break;
                case 1:
                    this.targetSpriteName = "cookie";
                    break;
                case 2:
                    this.targetSpriteName = "cupcake";
                    break;
                case 3:
                    this.targetSpriteName = FieldObject.assetNames[this.customData2];
                    break;
                case 4:
                    this.targetSpriteName = "star";
                    break;
                case -1:
                    this.targetSpriteName = "star";
                    break
            }
        }
        e.prototype.getCakeSpawnPos = function() {
            var e = getInt(this.pushPositions.length);
            return this.pushPositions[e]
        };
        e.CLOSED_STATE = 0;
        e.OPENED_STATE = 1;
        e.COMPLETED_STATE = 2;
        e.defaultData = "=00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000-4-99999-1-500-1500-3000-99";
        return e
    }
    ();
var SinglePlayObject = function(e) {
        function t(t, n, r, i, s, o, u, a) {
            if (typeof a === "undefined") {
                a = 1
            }
            e.call(this);
            var f = createSpriteFromSpritesheet(r);
            f.play();
            f.scaleX = f.scaleY = a;
            f.regX = o / a;
            f.regY = u / a;
            f.x = t;
            f.y = n;
            this.lastFrame = i;
            this.sprite = f;
            addChild(this.sprite, s)
        }
        __extends(t, e);
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            var n = this.sprite;
            if (n.currentAnimationFrame >= this.lastFrame) {
                n.stop();
                this.destroy()
            }
        };
        return t
    }
    (GameObject);
var CellObject = function(e) {
        function t(n, r) {
            e.call(this);
            this._isBlock = false;
            this.isTempBlock = false;
            this.tempBlockTime = -1;
            this.breakCountLeft = 0;
            this.marksLeft = 0;
            this.mark = null;
            this.block = null;
            this.blockTop = null;
            this.colorBlock = -1;
            this.isClearedByClickOrColor = false;
            this.bonusComboCount = -1;
            this.scoreToAdd = -1;
            this.breakMatchId = -1;
            this.changeTypeIn = -1;
            this.typeToChange = -1;
            this.clearIn = -1;
            this.removeBlockIn = -1;
            this.timeSinceBlockRemove = 100;
            this.lastBlockSet = -1;
            this.cacheUpdateState = t.CACHE_NONE;
            this.timeSinceLastTypeChange = 0;
            this.x = n;
            this.y = r;
            this.pos = Match3Level.instance.gridToStage(n, r);
            var i = this.level.tileSize;
            this.rect = new createjs.Rectangle(this.pos.x - i / 2, this.pos.y - i / 2, i, i)
        }
        __extends(t, e);
        Object.defineProperty(t.prototype, "isChangingType", {
            get: function() {
                return this.changeTypeIn >= 0
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.prepareToChangeType = function(e, t) {
            if (typeof t === "undefined") {
                t = -1
            }
            while (t < 0) {
                t = getInt(this.level.assetNumber)
            }
            this.changeTypeIn = e;
            this.typeToChange = t
        };
        t.prototype.setCacheState = function(e) {
            this.cacheUpdateState = Math.max(e, this.cacheUpdateState)
        };
        t.prototype.resetCacheState = function() {
            this.cacheUpdateState = t.CACHE_NONE
        };
        t.prototype.setMark = function(e) {
            if (typeof e === "undefined") {
                e = 1
            }
            var t = this.marksLeft;
            this.marksLeft = e;
            App.game.needToUpdateBack = true;
            if (t > 0 && e < t && this.mark && e >= 0)
                this.level.objects.push(new CookieTweenSprite(this.mark.x, this.mark.y, e));
            if (this.marksLeft <= 0) {
                removeClip(this.mark);
                this.mark = null;
                this.level.target.onMarkRemoved();
                return
            }
            var n = e == 1 ? "cookie" : "cookie honey";
            var r = this.mark ? this.mark : createSpriteFromSpritesheet(n);
            r.gotoAndStop(n);
            r.x = App.level.offsetX + this.x * App.level.tileSize;
            r.y = App.level.offsetY + this.y * App.level.tileSize;
            r.regX = r.regY = 4;
            if (r.parent == null)
                App.level.marks.addChild(r);
            this.mark = r
        };
        t.prototype.reset = function() {
            removeClip(this.block);
            removeClip(this.mark);
            removeClip(this.blockTop);
            this.blockTop = null;
            this.block = null;
            this.mark = null;
            if (this.object) {
                Match3Level.pool.returnObject(this.object);
                this.object = null
            }
            this._isBlock = false;
            this.isTempBlock = false;
            this.tempBlockTime = -1;
            this.breakCountLeft = 0;
            this.marksLeft = 0;
            this.colorBlock = -1;
            this.isClearedByClickOrColor = false;
            this.breakMatchId = -1;
            this.clearIn = -1;
            this.removeBlockIn = -1;
            this.timeSinceBlockRemove = 100;
            this.lastBlockSet = -1;
            this.scoreToAdd = -1;
            this.bonusComboCount = -1
        };
        Object.defineProperty(t.prototype, "isMarked", {
            get: function() {
                return this.marksLeft > 0
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.getStagePos = function() {
            return App.level.gridToStage(this.x, this.y)
        };
        Object.defineProperty(t.prototype, "isColorBlocked", {
            get: function() {
                return this.colorBlock >= 0
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.setBlock = function(e, t) {
            if (typeof e === "undefined") {
                e = 0
            }
            if (typeof t === "undefined") {
                t = false
            }
            this.lastBlockSet = e;
            this.breakCountLeft = t ? 0 : e;
            this._isBlock = true;
            this.colorBlock = t ? getInt(this.level.assetNumber) : -1;
            if (t) {
                this.setObject(Match3Level.pool.getObject(this, this.level.gridToStage(this.x, this.y), this.level.assetNumber, this.colorBlock));
                this.object.isMoving = false
            }
            var n = new createjs.Sprite(App.game.atlas, t ? "wall color" : e == 0 ? "chocolate nuts" : e == 1 ? "chocolate white" : "chocolate black");
            n.x = App.level.offsetX + this.x * App.level.tileSize;
            n.y = App.level.offsetY + this.y * App.level.tileSize;
            addChild(n, this.level.blockLayer);
            this.block = n
        };
        t.prototype.changeObjectType = function(e) {
            if (e != this.getType()) {
                var t = this.object.isBonus;
                var n = this.object.bonusType;
                this.timeSinceLastTypeChange = 0;
                Match3Level.pool.returnObject(this.object);
                var r = this.level.gridToStage(this.x, this.y);
                this.setObject(Match3Level.pool.getObject(this, r, 3, e));
                this.object.playJellyAnimation(1, 1);
                if (t)
                    this.object.setBonusType(n)
            }
        };
        t.prototype.removeBlock = function() {
            if (!this.isColorBlocked && (!this.isBreakable || this.breakMatchId == App.level.currentMove))
                return;
            var e = this.block != null;
            this.breakMatchId = App.level.currentMove;
            this.breakCountLeft--;
            this.timeSinceBlockRemove = 0;
            var t = this.isColorBlocked;
            if (this.isColorBlocked) {
                this.colorBlock = -1;
                this.setTempBlock(true, .15);
                removeClip(this.blockTop);
                this.blockTop = null
            }
            if (this.level.isActive)
                SoundsManager.instance.playSound(t ? "color_crash" : "choco_crash");
            if (this.breakCountLeft <= 0) {
                if (t)
                    this.level.objects.push(new SinglePlayObject(this.block.x + this.level.tileSize / 2, this.block.y + this.level.tileSize / 2, "color wall", 18, this.level.blockDestroyLayer, 53, 53, ANIM_SCALE));
                else if (this.lastBlockSet == 2)
                    this.level.objects.push(new SinglePlayObject(this.block.x + this.level.tileSize / 2, this.block.y + this.level.tileSize / 2, "chocolate destroy", 15, this.level.blockDestroyLayer, 53, 65, ANIM_SCALE));
                else
                    this.level.objects.push(new SinglePlayObject(this.block.x + this.level.tileSize / 2, this.block.y + this.level.tileSize / 2, "chocolate white destr", 18, this.level.blockDestroyLayer, 57, 58, ANIM_SCALE));
                this._isBlock = false;
                removeClip(this.block);
                this.block = null
            } else if (this.breakCountLeft == 1) {
                this.block.gotoAndStop("chocolate black2");
                this.block.regX = this.block.regY = 2
            }
            if (e && this.block == null)
                this.level.target.onBlockRemoved()
        };
        t.prototype.setTempBlock = function(e, t) {
            if (typeof t === "undefined") {
                t = -1
            }
            this.isTempBlock = e;
            this.tempBlockTime = t
        };
        t.prototype.isBlock = function() {
            return this._isBlock || this.isTempBlock
        };
        Object.defineProperty(t.prototype, "isBreakable", {
            get: function() {
                return this._isBlock && this.breakCountLeft > 0
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.setObject = function(e) {
            this.object = e;
            if (this.object)
                this.object.cell = this
        };
        t.prototype.getSprite = function() {
            return this.object ? this.object.sprite : null
        };
        t.prototype.getType = function() {
            return this.object == null ? -1 : this.object.colorType
        };
        t.prototype.getBonusType = function() {
            return this.object == null ? 0 : this.object.bonusType
        };
        t.prototype.clearCell = function(e) {
            if (typeof e === "undefined") {
                e = true
            }
            var t = false;
            if (this.object && (!this.object.isPushable || !this.level.isActive) && !this.isColorBlocked) {
                if (this.level.isActive) {
                    if (!(this.object.bonusType >= 1 && this.object.bonusType <= 4))
                        Match3Level.pool.getDestroyAnimation(this.object.colorType, this.object.sprite.x, this.object.sprite.y, this);
                    if (this.object.bonusType == 4)
                        this.tryPlayScoreAnimation();
                    if (this.object.isBonus) {
                        var n = this.object.bonusType;
                        if (n == 1 || n == 2 || n == 5 || n == 6) {
                            SoundsManager.instance.playSound("bonus_line");
                            new BonusLineSprite(n, this.object.sprite.x, this.object.sprite.y)
                        } else if (n == 3 || n == 7) {
                            new BonusBombSprite(n, this.object.sprite.x, this.object.sprite.y);
                            SoundsManager.instance.playSound("bonus_bomb")
                        } else if (n == 4)
                            SoundsManager.instance.playSound("bonus_color");
                        LevelManager.instance.bonuses++
                    }
                }
                this.level.target.onObjectRemove(this.object);
                Match3Level.pool.returnObject(this.object);
                this.object = null;
                t = true
            }
            if (this.marksLeft > 0 && t) {
                this.setMark(this.marksLeft - 1);
                SoundsManager.instance.playSound("cookie_crash")
            }
            this.isClearedByClickOrColor = false;
            var r = this.isBreakable;
            if (this.isBreakable || this.isColorBlocked) {
                this.removeBlock()
            }
            if (e && !r) {
                for (var i = 0; i < 4; ++i) {
                    var s = this.x + (i == 0 ? 1 : i == 1 ? -1 : 0);
                    var o = this.y + (i == 2 ? 1 : i == 3 ? -1 : 0);
                    if (s >= 0 && o >= 0 && s < this.level.fieldWidth && o < this.level.fieldHeight) {
                        var u = this.level.cells[s][o];
                        if (u && u.isBreakable && (!u.isColorBlocked || u.colorBlock == this.getType())) {
                            u.removeBlockIn = .01;
                            var a = Math.max(this.tempBlockTime, u.tempBlockTime);
                            if (a <= 0)
                                a = FieldObject.GEM_KILL_DELAY * 1.1;
                            if (a >= 0)
                                u.setTempBlock(true, a)
                        }
                    }
                }
            }
        };
        Object.defineProperty(t.prototype, "blockWasRemovedRecently", {
            get: function() {
                return this.timeSinceBlockRemove < .5
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.onSpellExplosion = function(e) {
            if (typeof e === "undefined") {
                e = -1
            }
            if (this.object && !this.object.isMoving) {
                this.object.onSpellExplosion(e)
            }
        };
        t.prototype.isStable = function() {
            return this.object == null || !this.object.isMoving
        };
        t.prototype.isStatic = function() {
            return !this.object.isMoving
        };
        t.prototype.tryPlayScoreAnimation = function() {
            if (this.scoreToAdd > 0) {
                var e = this.level.isEnded;
                if (e)
                    this.scoreToAdd = 10 * Math.round(this.scoreToAdd * 1.25 / 10);
                this.level.objects.push(Match3Level.pool.getText(this.scoreToAdd.toString(), this, 0));
                this.scoreToAdd = -1;
                this.bonusComboCount = -1
            }
        };
        t.prototype.prepareToClear = function(e, t, n, r) {
            if (typeof e === "undefined") {
                e = -1
            }
            if (typeof t === "undefined") {
                t = 0
            }
            if (typeof n === "undefined") {
                n = -1
            }
            if (typeof r === "undefined") {
                r = false
            }
            var i = t == 0;
            var s = t == 4;
            this.isClearedByClickOrColor = this.isClearedByClickOrColor || i || s;
            if (this.isWaitingForClear && e >= this.clearIn)
                return;
            this.clearIn = .01 + e;
            if (this.object && (this.object.isBonus || r)) {
                var e = this.object.bonusType <= 3 || r ? BonusDestroyAnimation.TIME : this.object.bonusType == 4 ? 20 / 30 : -1;
                if (e > 0) {
                    this.object.playBonusAnimationIn = this.clearIn > e ? this.clearIn - e - .01 : -1
                }
            }
        };
        Object.defineProperty(t.prototype, "isWaitingForClear", {
            get: function() {
                return this.clearIn > 0
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.update = function(e) {
            if (this.isTempBlock) {
                this.tempBlockTime -= e;
                if (this.tempBlockTime < 0) {
                    this.setTempBlock(false);
                    this.isTempBlock = false
                }
            }
            if (this.clearIn > 0) {
                this.clearIn -= e;
                if (this.clearIn <= 0) {
                    this.clearCell(this.isClearedByClickOrColor)
                }
            }
            if (!this._isBlock || this.breakCountLeft <= 0)
                this.timeSinceBlockRemove += e;
            if (this.removeBlockIn > 0) {
                this.removeBlockIn -= e;
                if (this.removeBlockIn <= 0 && this.isBreakable)
                    this.removeBlock()
            }
            this.timeSinceLastTypeChange += e;
            if (this.object) {
                this.object.update(e);
                this.object.cell = this
            }
            if (this.changeTypeIn > 0) {
                this.changeTypeIn -= e;
                if (this.changeTypeIn <= 0 && this.object) {
                    this.changeObjectType(this.typeToChange)
                }
            }
        };
        t.prototype.destroy = function() {
            this.clearCell(false);
            removeClip(this.mark);
            this.mark = null;
            removeClip(this.blockTop);
            this.blockTop = null;
            removeClip(this.block);
            this.block = null;
            e.prototype.destroy.call(this)
        };
        t.BASE_SCORE = 10;
        t.BONUS_CELL_SCORE_FACTOR = 5;
        t.BONUS_SCORE_FACTOR = 2;
        t.BONUS_COLOR_SCORE_FACTOR = 4;
        t.CACHE_NONE = 0;
        t.CACHE_CLEAR = 1;
        t.CACHE_DRAW = 2;
        return t
    }
    (GameObject);
var Preloader = function() {
        function e() {
            this.sprites = [];
            this.mainLoadingStarted = false;
            this.shownButton = false;
            this.loadedMain = false;
            this.hasBrandLogo = false;
            this.hasMoreGames = false;
            e.instance = this;
            this.loadApi()
        }
        e.prototype.loadApi = function() {
            var e = this;
            GameAPI.loadAPI(function(t) {
                return e.onApiLoaded(t)
            })
        };
        e.prototype.onApiLoaded = function(e) {
            var t = this;
            apiInstance = e;
            var n = new createjs.Container;
            App.game.stage.addChild(n);
            this.sprite = n;
            var r = [{
                src: "assets/preloader/preloader back.jpg",
                id: "preloader back"
            }, {
                src: "assets/preloader/circle.png",
                id: "preloader candy top"
            }, {
                src: "assets/preloader/progressbar top.png",
                id: "preloader progress top"
            }, {
                src: "assets/preloader/play.png",
                id: "play button"
            }];
            var i = apiInstance.Branding.getLogo();
            var s = i.error != undefined;
            if (i && i.image) {
                var o = s ? "img/logo.png" : i.image;
                this.hasBrandLogo = true;
                console.log("logo: ", s, i.image, o);
                r.push({
                    src: o,
                    id: "brand logo"
                })
            }
            /*var u = apiInstance.Branding.getLink("more_games");
            var s = i.error != undefined;
            if (u && u.action && !s) {
                
            }*/
			this.hasMoreGames = true;
            this.preLoader = new createjs.LoadQueue(true);
            this.preLoader.addEventListener("complete", function() {
                return t.onPreLoadComplete()
            });
            this.preLoader.loadManifest(r)
        };
        e.prototype.onPreLoadComplete = function() {
            var e = this;
            if (this.mainLoadingStarted)
                return;
            this.mainLoadingStarted = true;
            var t = this.sprite;
            var n = new createjs.Bitmap(this.preLoader.getResult("preloader back"));
            t.addChild(n);
            this.sprites.push(n);
            n = new createjs.Bitmap(this.preLoader.getResult("preloader progress top"));
            t.addChild(n);
            n.regX = n.getBounds().width / 2.2;
            n.regY = n.getBounds().height / 2;
            this.barRect = n.getBounds().clone();
            this.sprites.push(n);
            n = new createjs.Bitmap(this.preLoader.getResult("preloader candy top"));
            t.addChild(n);
            n.regX = n.getBounds().width / 2;
            n.regY = n.getBounds().height / 2 + 3;
            this.sprites.push(n);
            n = new createjs.Bitmap(this.preLoader.getResult("play button"));
            t.addChild(n);
            n.regX = 78;
            n.regY = n.getBounds().height / 2 + 3;
            n.x = 310;
            n.y = 470;
            this.playButton = n;
            this.playButton.alpha = 0;
            this.sprites.push(n);
            this.onResize();
            createjs.Sound.initializeDefaultPlugins();
            createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);
            createjs.Sound.alternateExtensions = ["mp3"];
            var r = App.episode;
            var i = App.episode <= 1 ? "assets/tutorial/" : "assets/tutorial/episode2/";
            var s = [{
                src: "assets/preloader/zibbo_logo.png",
                id: "zibbo_logo"
            }, {
                src: ["assets/map/map1.jpg", "assets/map/map ep1_3.jpg", "assets/map/map ep2_3.jpg"][r],
                id: "map1"
            }, {
                src: ["assets/map/map2.jpg", "assets/map/map ep1_2.jpg", "assets/map/map ep2_2.jpg"][r],
                id: "map2"
            }, {
                src: ["assets/map/map3.jpg", "assets/map/map ep1_1.jpg", "assets/map/map ep2_1.jpg"][r],
                id: "map3"
            }, {
                src: "assets/bar.png",
                id: "bar"
            }, {
                src: "assets/art.png",
                id: "art.png"
            }, {
                src: "assets/art.txt",
                id: "artJson",
                type: createjs.LoadQueue.JSON
            }, {
                src: "assets/font2.png",
                id: "font2.png"
            }, {
                src: "assets/font2.txt",
                id: "font2Json",
                type: createjs.LoadQueue.JSON
            }, {
                src: App.episode == 2 ? "assets/back2.jpg" : "assets/back1.jpg",
                id: "back1"
            }, {
                src: App.episode != 2 ? "assets/main menu ep2.jpg" : "assets/main menu.jpg",
                id: "main menu"
            }, {
                src: "assets/menu back.jpg",
                id: "menu back"
            }, {
                src: "assets/logo top.jpg",
                id: "logo top"
            }, {
                src: "assets/logo.txt",
                id: "logo text",
                type: createjs.LoadQueue.JSON
            }, {
                src: "assets/button.txt",
                id: "button text",
                type: createjs.LoadQueue.JSON
            }, {
                src: "assets/Char win.txt",
                id: "Char win",
                type: createjs.LoadQueue.JSON
            }, {
                src: "assets/Char lose.txt",
                id: "Char lose",
                type: createjs.LoadQueue.JSON
            }, {
                src: "assets/gloss anim.txt",
                id: "gloss anim",
                type: createjs.LoadQueue.JSON
            }, {
                src: "assets/buttons pause anim.txt",
                id: "buttons pause anim",
                type: createjs.LoadQueue.JSON
            }, {
                src: "assets/pointer.txt",
                id: "pointer",
                type: createjs.LoadQueue.JSON
            }, {
                src: i + "t1.png",
                id: "tutorial1"
            }, {
                src: i + "t2.png",
                id: "tutorial2"
            }, {
                src: i + "t3.png",
                id: "tutorial3"
            }, {
                src: i + "t4.png",
                id: "tutorial4"
            }, {
                src: i + "t5.png",
                id: "tutorial5"
            }, {
                src: i + "t6.png",
                id: "tutorial6"
            }, {
                src: i + "t7.png",
                id: "tutorial7"
            }, {
                src: "assets/sound/music/btcl_main_music.ogg",
                id: "main_music",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/hero_show.ogg",
                id: "hero_show",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/hero_hide.ogg",
                id: "hero_hide",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/win.ogg",
                id: "win",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/fail.ogg",
                id: "fail",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/play_button.ogg",
                id: "play_button",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/button.ogg",
                id: "button",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/pause.ogg",
                id: "pause",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/transition.ogg",
                id: "transition",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/remove1.ogg",
                id: "remove1",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/remove2.ogg",
                id: "remove2",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/remove3.ogg",
                id: "remove3",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/remove4.ogg",
                id: "remove4",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/bonus_show.ogg",
                id: "bonus_show",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/bonus_set.ogg",
                id: "bonus_set",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/bonus_bomb.ogg",
                id: "bonus_bomb",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/bonus_line.ogg",
                id: "bonus_line",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/bonus_color.ogg",
                id: "bonus_color",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/star1.ogg",
                id: "star1",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/pointer.ogg",
                id: "pointer_sound",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/star2.ogg",
                id: "star2",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/star3.ogg",
                id: "star3",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/cookie_crash.ogg",
                id: "cookie_crash",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/choco_crash.ogg",
                id: "choco_crash",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/color_crash.ogg",
                id: "color_crash",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/cake_down.ogg",
                id: "cake_down",
                type: createjs.LoadQueue.SOUND
            }, {
                src: "assets/sound/stop_move.ogg",
                id: "stop_move",
                type: createjs.LoadQueue.SOUND
            }];
            this.loader = new createjs.LoadQueue(true);
            this.loader.installPlugin(createjs.Sound);
            createjs.Sound.initializeDefaultPlugins();
            createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]);
            createjs.Sound.alternateExtensions = ["mp3"];
            this.loader.addEventListener("complete", function() {
                return e.onLoadComplete()
            });
            this.loader.addEventListener("progress", function() {
                return e.onProgress()
            });
            this.loader.loadManifest(s)
        };
        e.prototype.onLoadComplete = function() {
            this.onResize();
            this.onProgress();
            this.showButton()
        };
        e.prototype.showButton = function() {
            if (!this.shownButton) {
                this.shownButton = true;
                this.playButton.scaleX = this.playButton.scaleY = .5;
                this.sprites[2].visible = false;
                createjs.Tween.get(this.playButton, {
                    loop: false
                }).wait(0).to({
                    scaleX: 1.2,
                    scaleY: 1.2,
                    alpha: 1
                }, 150, createjs.Ease.circOut).wait(0).to({
                    scaleX: 1,
                    scaleY: 1
                }, 250, createjs.Ease.circIn)
            }
        };
        e.prototype.onDown = function(e, t) {
            if (!this.loadedMain) {
                var n = this.playButton.getTransformedBounds();
                if (e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height) {
                    this.loadedMain = true;
                    App.game.loadApi();
                    createjs.Tween.get(this.playButton, {
                        loop: false
                    }).wait(0).to({
                        scaleX: 1.2,
                        scaleY: 1.2,
                        alpha: 1
                    }, 200, createjs.Ease.circOut).wait(0).to({
                        scaleX: 1,
                        scaleY: 1
                    }, 200, createjs.Ease.circIn)
                }
            }
        };
        e.prototype.isActive = function() {
            return this.sprite.parent != null
        };
        e.prototype.disable = function() {
            removeClip(this.sprite);
            for (var e = 0; e < this.sprites.length; ++e)
                removeClip(this.sprites[e])
        };
        e.prototype.onProgress = function() {
            if (this.sprites.length <= 0 || !this.barRect)
                return;
            var e = this.loader.progress;
            var t = new createjs.Rectangle(this.barRect.x, this.barRect.y, limit(this.barRect.width * e, 1, this.barRect.width), this.barRect.height);
            this.sprites[1].sourceRect = t
        };
        e.prototype.update = function(e) {
            if (this.sprite && this.sprite.parent && this.sprites.length > 0) {
                this.sprites[2].rotation -= 400 * e
            }
        };
        e.prototype.onResize = function() {
            if (!this.sprite || !this.sprite.parent || this.sprites.length <= 0)
                return;
            var e = App.ACTUAL_H - Math.min(App.CURRENT_SHIFT, 0);
            this.sprites[1].x = 280 + 13;
            this.sprites[2].x = 620 - 5;
            this.sprites[1].y = 620 - 1;
            this.sprites[2].y = 620 - 1
        };
        return e
    }
    ();
var CookieTweenSprite = function(e) {
        function t(t, n, r) {
            var i = this;
            e.call(this);
            var s = createSpriteFromSpritesheet(r == 0 ? "cookie" : "cookie honey");
            s.regX = s.regY = 4 + Match3Level.TILE_SIZE / 2;
            s.x = t + Match3Level.TILE_SIZE / 2;
            s.y = n + Match3Level.TILE_SIZE / 2;
            this.sprite = s;
            this.level.underGemLayer.addChild(s);
            if (r == 0)
                createjs.Tween.get(s, {
                    loop: false
                }).wait(0).to({
                    scaleX: 1.3,
                    scaleY: 1.3
                }, 110, createjs.Ease.quadOut);
            createjs.Tween.get(s, {
                loop: false
            }).wait(0).to({
                alpha: 0
            }, 110, createjs.Ease.quadIn).call(function() {
                return i.onComplete()
            })
        }
        __extends(t, e);
        t.prototype.onComplete = function() {
            this.destroy()
        };
        return t
    }
    (GameObject);
var BonusDestroyAnimation = function(e) {
        function t(n, r, i, s) {
            var o = this;
            e.call(this);
            this.progress = 0;
            this.cell = s;
            var u = createSpriteFromSpritesheet(i);
            u.regX = u.getBounds().width / 2;
            u.regY = u.getBounds().height / 2;
            u.x = n;
            u.y = r;
            this.level.gemLayer.addChild(u);
            this.sprite = u;
            var a = createSpriteFromSpritesheet("star glow");
            a.regX = a.getBounds().width / 2;
            a.regY = a.getBounds().height / 2;
            a.x = n;
            a.y = r;
            a.scaleX = a.scaleY = .15;
            a.alpha = 0;
            this.level.underGemLayer.addChild(a);
            this.glow = a;
            createjs.Tween.get(this, {
                loop: false
            }).to({
                progress: 1
            }, t.TIME * 1e3, createjs.Ease.none).call(function() {
                return o.setLight()
            })
        }
        __extends(t, e);
        t.prototype.setLight = function() {
            this.sprite.visible = this.glow.visible = false;
            this.light = createSpriteFromSpritesheet("bonus blink");
            this.light.x = this.sprite.x;
            this.light.y = this.sprite.y;
            this.light.scaleX = this.light.scaleY = ANIM_SCALE * 1.5;
            this.light.regX = 67 / ANIM_SCALE;
            this.light.regY = 61 / ANIM_SCALE;
            this.level.blockLayer.addChild(this.light);
            this.light.play()
        };
        t.prototype.update = function(e) {
            if (this.sprite.visible) {
                this.sprite.scaleX = this.sprite.scaleY = lerp(1, 1.2, this.progress);
                this.glow.alpha = this.progress;
                this.glow.scaleX = this.glow.scaleY = lerp(.15, .95, this.progress)
            }
            if (this.light && this.light.currentAnimationFrame >= 8) {
                if (this.cell)
                    this.cell.tryPlayScoreAnimation();
                this.destroy()
            }
        };
        t.prototype.destroy = function() {
            e.prototype.destroy.call(this);
            createjs.Tween.removeTweens(this);
            removeClip(this.glow);
            this.glow = null;
            removeClip(this.light);
            this.light = null
        };
        t.TIME = .5;
        return t
    }
    (GameObject);
var JumpText = function(e) {
        function t(t, n) {
            e.call(this);
            this.speed = new createjs.Point;
            this.targetPos = new createjs.Point;
            this.diff = new createjs.Point;
            this.isHiding = false;
            this.isFinished = false;
            this.isScore = false;
            this.isBonusCombo = false;
            this.isEnding = false;
            this.score = 0;
            this.isScore = n == 0;
            this.isBonusCombo = n == 1;
            this.isEnding = n == 3;
            if (this.isScore)
                this.score = parseInt(t);
            var r = new createjs.BitmapText(t, n == 0 ? App.game.atlas : App.game.fontAtlas);
            r.letterSpacing = -10;
            var i = getTextSize(r);
            r.mouseEnabled = false;
            r.scaleX = r.scaleY = this.isScore ? .85 : this.isBonusCombo ? .6 : this.isEnding ? 1 : .7;
            var s = r.getTransformedBounds();
            r.regX = Math.ceil(i.x / 2);
            r.regY = Math.ceil(i.y);
            this.sprite = r;
            this.text = t
        }
        __extends(t, e);
        t.prototype.init = function(e, t, n) {
            this.speed.x = this.speed.y = this.targetPos.x = this.targetPos.y = this.diff.x = this.diff.y = 0;
            this.isHiding = this.isFinished = false;
            this.sprite.alpha = 1;
            this.level = Match3Level.instance;
            if (this.level)
                this.level.hudLayer.addChild(this.sprite);
            this.sprite.x = e;
            this.sprite.y = t;
            this.sprite.visible = true;
            this.isDestroyed = false;
            this.speedModulo = (this.isScore ? 11 : 15) * 60;
            this.speed.y = -this.speedModulo;
            var r = 0;
            if (this.isScore)
                r = n && n.x == 0 ? lerp(15, 30, Math.random()) : n && n.x == this.level.fieldWidth - 1 ? lerp(-30, -15, Math.random()) : lerp(-20, 20, Math.random());
            else if (this.isBonusCombo) {
                var i = n.y < 3 ? 110 : n.y > this.level.fieldHeight - 3 ? 70 : Math.random() > .5 ? 110 : 70;
                r = lerp(-15, 15, Math.random()) + (n.x < 3 ? i : n.x > this.level.fieldWidth - 3 ? -i : Math.random() > .5 ? i : -i)
            } else
                r = 0;
            rotatePoint(this.speed, r);
            createjs.Tween.get(this, {
                loop: false
            }).to({
                speedModulo: 0
            }, 750, createjs.Ease.quadOut);
            this.targetPos.x = e;
            this.targetPos.y = t;
            return this
        };
        t.prototype.release = function() {
            createjs.Tween.removeTweens(this.sprite);
            createjs.Tween.removeTweens(this);
            removeClip(this.sprite);
            this.sprite.visible = false;
            this.isDestroyed = true
        };
        t.prototype.update = function(t) {
            var n = this;
            if (this.isFinished) {
                Match3Level.pool.returnText(this);
                return
            }
            e.prototype.update.call(this, t);
            if (!this.isHiding) {
                this.sprite.x += this.speed.x * t;
                this.sprite.y += this.speed.y * t;
                this.diff.x = this.targetPos.x - this.sprite.x;
                this.diff.y = this.targetPos.y - this.sprite.y;
                var r = distanceBetweenPoints(0, 0, this.diff.x, this.diff.y);
                this.diff.x /= r;
                this.diff.y /= r;
                var i = .8 * 60 * 60;
                this.diff.x *= i;
                this.diff.y *= i;
                if (this.speedModulo > 0) {
                    this.speed.x += this.diff.x * t;
                    this.speed.y += this.diff.y * t;
                    var r = distanceBetweenPoints(0, 0, this.speed.x, this.speed.y);
                    if (r > this.speedModulo) {
                        var s = this.speedModulo / r;
                        this.speed.x *= s;
                        this.speed.y *= s
                    }
                } else
                    this.speed.x = this.speed.y = 0;
                if (Math.abs(this.speedModulo) < 1e-5 && !this.isHiding) {
                    this.isHiding = true;
                    if (this.isScore)
                        createjs.Tween.get(this.sprite, {
                            loop: false
                        }).wait(0).to({
                            x: this.level.hud.scoreText.x,
                            y: this.level.hud.scoreText.y,
                            alpha: .2
                        }, 400, createjs.Ease.quartIn).call(function() {
                            return n.finishMovement()
                        });
                    else
                        createjs.Tween.get(this.sprite, {
                            loop: false
                        }).wait(0).to({
                            alpha: .2
                        }, 400, createjs.Ease.quartIn).call(function() {
                            return n.finishMovement()
                        })
                }
            }
        };
        t.prototype.finishMovement = function() {
            if (this.isFinished)
                return;
            if (this.isScore) {
                this.level.score += this.score
            }
            this.isFinished = true
        };
        t.prototype.destroy = function() {
            Match3Level.pool.returnText(this)
        };
        return t
    }
    (GameObject);
var EndBonusIndicator = function(e) {
        function t(t, n, r, i, s) {
            e.call(this);
            this.delay = -1;
            this.cell = r;
            this.bonusType = s;
            var o = createSpriteFromSpritesheet("bonus new");
            o.regX = o.getBounds().width / 2;
            o.regY = o.getBounds().height / 2;
            o.x = t;
            o.y = n;
            o.visible = false;
            this.delay = i;
            this.sprite = o;
            addChild(this.sprite, this.level.hudLayer)
        }
        __extends(t, e);
        Object.defineProperty(t.prototype, "totalTime", {
            get: function() {
                return this.delay + t.MOVE_TIME
            },
            enumerable: true,
            configurable: true
        });
        t.prototype.update = function(n) {
            var r = this;
            e.prototype.update.call(this, n);
            this.delay -= n;
            if (this.delay <= 0 && !this.sprite.visible) {
                SoundsManager.instance.playSound("bonus_show");
                this.sprite.visible = true;
                this.sprite.alpha = .3;
                this.sprite.scaleX = this.sprite.scaleY = .3;
                createjs.Tween.get(this.sprite, {
                    loop: false
                }).wait(0).to({
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1,
                    x: this.cell.pos.x,
                    y: this.cell.pos.y
                }, t.MOVE_TIME * 1e3, createjs.Ease.cubicIn).call(function() {
                    return r.hide()
                });
                this.level.movesLeft = Math.max(0, this.level.movesLeft - 1)
            }
        };
        t.prototype.hide = function() {
            if (this.cell && this.cell.object) {
                this.cell.object.setBonusType(this.bonusType);
                this.cell.setTempBlock(false, -1)
            }
            this.destroy()
        };
        t.prototype.destroy = function() {
            e.prototype.destroy.call(this);
            this.cell = null
        };
        t.MOVE_TIME = .5;
        return t
    }
    (GameObject);
var SoundsManager = function() {
        function e() {
            this.lastPlays = {};
            this.delays = {};
            this.shifts = {};
            this.musicPlayed = false;
            this.isSoundEnabled = true;
            this.isMusicEnabled = true;
            this.musicPaused = false;
            this.volumes = {};
            e.instance = this;
            this.delays["remove1"] = this.delays["remove2"] = this.delays["remove3"] = this.delays["remove4"] = FieldObject.GEM_KILL_DELAY * .5;
            this.delays["cookie_crash"] = this.delays["choco_crash"] = this.delays["color_crash"] = .05;
            this.delays["stop_move"] = .05;
            this.delays["bonus_show"] = .05;
            this.volumes["bonus_set"] = .78;
            this.volumes["choco_crash"] = 1.6;
            this.volumes["cookie_crash"] = 1.6;
            this.volumes["color_crash"] = 1
        }
        e.prototype.update = function(e) {
            this.time += e
        };
        e.prototype.playSound = function(e, t) {
            if (typeof t === "undefined") {
                t = 0
            }
            if (!this.isSoundEnabled)
                return;
            var n = this.delays[e];
            var r = this.lastPlays[e];
            var i = this.shifts[e];
            var s = 0;
            var o = this.volumes[e] ? this.volumes[e] : 1;
            if (n) {
                if (!i) {
                    if (r && Math.abs(this.time - r) < n)
                        return;
                    else
                        this.lastPlays[e] = this.time
                } else {
                    if (!r || r < this.time)
                        this.lastPlays[e] = this.time;
                    else {
                        if (r + i < this.time + n) {
                            this.lastPlays[e] = r + i;
                            s = (this.lastPlays[e] - this.time) * 1e3
                        } else
                            return
                    }
                }
            }
            createjs.Sound.play(e, "none", s + t, 0, 0, o)
        };
        e.prototype.playMusic = function() {
            if (!this.musicPlayed) {
                var e = this.music != null;
                if (!this.music)
                    this.music = createjs.Sound.play("main_music", {
                        interrupt: createjs.Sound.INTERRUPT_ANY,
                        loop: -1,
                        volume: .55
                    });
                else
                    this.music.play(createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1);
                this.musicPlayed = this.music.playState == createjs.Sound.PLAY_SUCCEEDED;
                if (!this.isMusicEnabled)
                    this.music.pause()
            }
        };
        e.prototype.pauseMusic = function() {
            console.log("pause", App.game.gameTime);
            this.musicPaused = true;
            if (this.musicPlayed && this.music) {
                createjs.Tween.removeTweens(this.music);
                createjs.Tween.get(this.music, {
                    loop: false
                }).wait(0).to({
                    volume: 0
                }, 200, createjs.Ease.cubicIn)
            }
        };
        e.prototype.resumeMusic = function() {
            //console.log("resume", App.game.gameTime);
            gradle.event('resume');
            this.musicPaused = false;
            if (this.musicPlayed && this.music) {
                createjs.Tween.removeTweens(this.music);
                createjs.Tween.get(this.music, {
                    loop: false
                }).wait(0).to({
                    volume: .55
                }, 200, createjs.Ease.cubicIn)
            }
        };
        e.prototype.setSound = function(e) {
            if (typeof e === "undefined") {
                e = true
            }
            this.isSoundEnabled = e
        };
        e.prototype.setMusic = function(e) {
            if (typeof e === "undefined") {
                e = true
            }
            this.isMusicEnabled = e;
            if (this.music) {
                if (e)
                    this.music.resume();
                else
                    this.music.pause()
            }
        };
        e.prototype.reset = function() {
            this.time = 0;
            this.lastPlays = {}
        };
        return e
    }
    ();
var ClickableObject = function(e) {
        function t(t) {
            if (typeof t === "undefined") {
                t = null
            }
            e.call(this);
            this.shape = -1;
            this.radius = 0;
            this.shift = new createjs.Point;
            this.rect = new createjs.Rectangle;
            this.lastClickTime = -1;
            if (t)
                this.sprite = t
        }
        __extends(t, e);
        t.prototype.setCircle = function(e, n, r) {
            if (typeof n === "undefined") {
                n = 0
            }
            if (typeof r === "undefined") {
                r = 0
            }
            this.shape = t.CIRCLE_SHAPE;
            this.radius = e;
            this.shift.x = n;
            this.shift.y = r
        };
        t.prototype.setRect = function(e, n, r, i) {
            this.shape = t.RECT_SHAPE;
            this.rect.initialize(e, n, r, i)
        };
        t.prototype.checkClick = function(e, n) {
            if (this.sprite && this.shape >= 0 && this.sprite.visible && this.sprite.parent && this.sprite.parent.visible) {
                var r = this.sprite.localToGlobal(0, 0);
                switch (this.shape) {
                    case t.CIRCLE_SHAPE:
                        return distanceBetweenPoints(r.x + this.shift.x, r.y + this.shift.y, e, n) <= this.radius;
                    case t.RECT_SHAPE:
                        return e >= r.x + this.rect.x && n >= r.y + this.rect.y && e <= r.x + this.rect.x + this.rect.width && n <= r.y + this.rect.y + this.rect.height
                }
            }
            return false
        };
        t.prototype.onClick = function() {
            if (this.callback) {
                var e = App.game.gameTime;
                if (Math.abs(e - this.lastClickTime) > .3) {
                    this.lastClickTime = e;
                    this.callback()
                }
            }
        };
        t.prototype.updateRectScale = function() {
            var e = this.sprite.getBounds();
            this.setRect(e.x * this.sprite.scaleX, e.y * this.sprite.scaleY, e.width * this.sprite.scaleX, e.height * this.sprite.scaleY)
        };
        t.CIRCLE_SHAPE = 0;
        t.RECT_SHAPE = 1;
        return t
    }
    (GameObject);
var LogoObject = function(e) {
        function t(t, n, r, i) {
            var s = this;
            e.call(this);
            this.initScale = i;
            var o = App.game.preloader.hasBrandLogo ? new createjs.Bitmap(App.game.preloader.preLoader.getResult("brand logo")) : null;
            if (o) {
                o.scaleX = o.scaleY = i;
                o.x = n;
                o.y = r;
                o.regX = o.getBounds().width / 2;
                o.regY = o.getBounds().height / 2;
                o.mouseEnabled = false;
                t.addChild(o);
                this.sprite = o;
                if (apiInstance.Branding.getLogo().action)
                    this.callback = function() {
                        return s.onLogoClick()
                    }
            }
        }
        __extends(t, e);
        t.prototype.onLogoClick = function() {
            if (!this.sprite)
                return;
            if (apiInstance.Branding.getLogo().action)
                apiInstance.Branding.getLogo().action();
            createjs.Tween.get(this.sprite, {
                loop: false
            }).wait(0).to({
                scaleX: 1.2 * this.initScale,
                scaleY: 1.2 * this.initScale,
                alpha: 1
            }, 200, createjs.Ease.circOut).wait(0).to({
                scaleX: this.initScale,
                scaleY: this.initScale
            }, 250, createjs.Ease.circIn)
        };
        t.prototype.checkClick = function(e, t) {
            if (this.sprite) {
                var n = this.sprite.getBounds();
                var r = this.sprite.localToGlobal(0, 0);
                var i = this.initScale * n.width;
                var s = this.initScale * n.height;
                console.log(e, t, r.x, r.y, i, s);
                return e >= r.x && e <= r.x + i && t >= r.y && t <= r.y + s
            }
            return false
        };
        return t
    }
    (ClickableObject);
var MoreGamesButton = function(e) {
        function t(t, n, r, i) {
            var s = this;
            e.call(this);
            this.initScale = i;
            var o = App.game.preloader.hasMoreGames ? createSpriteFromSpritesheet("more") : null;
            if (o) {
                o.scaleX = o.scaleY = i;
                o.x = n;
                o.y = r;
                o.regX = o.getBounds().width / 2;
                o.regY = o.getBounds().height / 2;
                o.mouseEnabled = false;
                t.addChild(o);
                this.sprite = o;
				//gradle.event('more_games');
                //if (apiInstance.Branding.getLink("more_games").action)
                    this.callback = function() {
                        return s.onLogoClick()
                    }
            }
        }
        __extends(t, e);
        t.prototype.onLogoClick = function() {
            if (!this.sprite)
                return;
			gradle.event('more_games');
            //if (apiInstance.Branding.getLink("more_games").action)
            //    apiInstance.Branding.getLink("more_games").action();
            createjs.Tween.get(this.sprite, {
                loop: false
            }).wait(0).to({
                scaleX: 1.2 * this.initScale,
                scaleY: 1.2 * this.initScale,
                alpha: 1
            }, 200, createjs.Ease.circOut).wait(0).to({
                scaleX: this.initScale,
                scaleY: this.initScale
            }, 250, createjs.Ease.circIn)
        };
        t.prototype.checkClick = function(e, t) {
            if (this.sprite) {
                var n = this.sprite.getBounds();
                var r = this.sprite.localToGlobal(0, 0);
                var i = this.initScale * n.width;
                var s = this.initScale * n.height;
                console.log(e, t, r.x, r.y, i, s);
                return e >= r.x && e <= r.x + i && t >= r.y && t <= r.y + s
            }
            return false
        };
        return t
    }
    (ClickableObject);
var ButtonObject = function(e) {
        function t(t, n, r, i, s) {
            if (typeof i === "undefined") {
                i = 0
            }
            if (typeof s === "undefined") {
                s = 0
            }
            e.call(this);
            this.playAnimIn = -1;
            this.callback = n;
            var o = getButtonAnimation(t);
            this.anim = o;
            o.stop();
            o.x = i;
            o.y = s;
            r.addChild(o);
            this.sprite = o;
            var u = this.sprite.getBounds();
            this.setRect(u.x, u.y, u.width, u.height)
        }
        __extends(t, e);
        t.prototype.update = function(t) {
            e.prototype.update.call(this, t);
            if (this.playAnimIn > 0) {
                this.playAnimIn -= t;
                if (this.playAnimIn <= 0)
                    this.playAnim()
            }
            this.anim.update(t)
        };
        t.prototype.playAnim = function() {
            var e = 30 * lerp(1.3, 1.6, Math.random());
            this.anim.setFrameDelay(1 / e);
            this.playAnimIn = -1;
            this.anim.gotoAndPlay(0)
        };
        t.prototype.onClick = function() {
            e.prototype.onClick.call(this);
            SoundsManager.instance.playSound("button");
            this.playAnim()
        };
        t.prototype.onShow = function() {
            this.playAnimIn = lerp(1 / 60, 6 / 60, Math.random())
        };
        t.prototype.onHide = function() {};
        return t
    }
    (ClickableObject);
var SoundButton = function(e) {
        function t(t, n, r, i) {
            var s = this;
            var o = function(e) {
                s.changeState(e)
            };
            this.isMusic = t;
            e.call(this, t ? 2 : 0, o, n, r, i)
        }
        __extends(t, e);
        t.prototype.changeState = function(e) {
            var t = !(this.isMusic ? SoundsManager.instance.isMusicEnabled : SoundsManager.instance.isSoundEnabled);
            this.anim.setPartSkin("Layer 1", this.isMusic ? t ? 2 : 3 : t ? 0 : 1);
            this.isMusic ? SoundsManager.instance.setMusic(t) : SoundsManager.instance.setSound(t)
        };
        t.prototype.oShow = function() {
            e.prototype.onShow.call(this);
            var t = this.isMusic ? SoundsManager.instance.isMusicEnabled : SoundsManager.instance.isSoundEnabled;
            this.anim.setPartSkin("Layer 1", this.isMusic ? t ? 2 : 3 : t ? 0 : 1)
        };
        return t
    }
    (ButtonObject);
var Tutorial = function(e) {
        function t() {
            e.call(this);
            this.pages = [];
            this.currentPage = 0;
            this.currentSequence = [];
            this.sequences = {
                0: [0, 2, 3, 5],
                1: [6, 1, 4]
            };
            this.tapAllowed = false;
            t.instance = this;
            this.pages.push(new FirstGroupTapTutorial, new HighValueTapTutorial, new LineTapTutorial, new BonusTapTutorial, new BonusInfoTutorial, new ReachScoreTutorial, new BonusComboTapTutorial, new ComboInfoTutorial)
        }
        __extends(t, e);
        t.prototype.hasTutorial = function(e) {
            return this.sequences[e.toString()]
        };
        t.prototype.show = function() {
            var e = this.sequences[Match3Level.instance.levelData.levelNumber.toString()];
            this.currentSequence = [];
            for (var t = 0; t < e.length; ++t)
                this.currentSequence.push(this.pages[e[t]]);
            this.currentPage = 0;
            this.currentSequence[this.currentPage].show()
        };
        t.prototype.hide = function() {};
        t.prototype.getBonusComboCell = function(e, t) {
            return this.currentPage == 1 && this.currentSequence[this.currentPage] == this.pages[1] && Match3Level.instance.currentMove == 1 ? App.episode <= 1 ? e.x < t.x ? e : t : e.x < t.x ? t : e : null
        };
        t.prototype.checkHighValueCell = function(e) {
            return this.currentPage == 1 && this.currentSequence[this.currentPage] == this.pages[1] && Match3Level.instance.currentMove == 1 && (App.episode <= 1 && e.x == 3 && e.y == 6 || App.episode == 2 && e.x == 6 && e.y == 8)
        };
        t.prototype.getBonusSpawnCell = function() {
            return this.currentPage == 2 && this.currentSequence[this.currentPage] == this.pages[3] ? App.episode <= 1 ? Match3Level.instance.cells[2][3] : Match3Level.instance.cells[1][3] : null
        };
        t.prototype.nextPage = function() {
            this.currentSequence[this.currentPage].hide();
            if (this.currentPage < this.currentSequence.length - 1) {
                ++this.currentPage;
                this.currentSequence[this.currentPage].show()
            } else {
                if (this == MenuManager.instance.current)
                    MenuManager.instance.closeCurrent()
            }
        };
        t.prototype.allowTap = function(e, t) {
            return this.currentSequence[this.currentPage].allowTap(e, t)
        };
        t.prototype.onDown = function(t, n) {
            e.prototype.onDown.call(this, t, n);
            this.tapAllowed = this.allowTap(t, n);
            this.currentSequence[this.currentPage].onDown(t, n)
        };
        return t
    }
    (Menu);
var TutorialPage = function(e) {
        function t() {
            e.call(this);
            this.tapCells = [];
            this.isHiding = false;
            this.isShowing = false;
            this.showDelay = 0;
            this.hideDelay = 0;
            this.tutorial = Tutorial.instance
        }
        __extends(t, e);
        t.prototype.init = function(e) {
            e.cache(0, -20, App.SCREEN_W, App.SCREEN_H + 40);
            this.sprite = e
        };
        t.prototype.onDown = function(e, t) {
            if (this.checkHide(e, t))
                this.tutorial.nextPage()
        };
        t.prototype.allowTap = function(e, t) {
            if (this.sprite.alpha < .5)
                return false;
            var n = this.tapCells.length;
            var r = Match3Level.instance.stageToGrid(e, t);
            r.x = Math.floor(r.x);
            r.y = Math.floor(r.y);
            for (var i = 0; i < n; ++i) {
                var s = this.tapCells[i];
                if (s.x == r.x && s.y == r.y)
                    return true
            }
            return false
        };
        t.prototype.checkHide = function(e, t) {
            return this.allowTap(e, t)
        };
        t.prototype.hide = function() {
            var e = this;
            if (!this.isHiding) {
                this.isHiding = true;
                createjs.Tween.get(this.sprite, {
                    loop: false
                }).wait(this.hideDelay * 1e3).to({
                    alpha: 0
                }, 300).call(function() {
                    return e.removeSprite()
                })
            }
        };
        t.prototype.show = function() {
            this.isShowing = true;
            this.isHiding = false;
            if (!this.sprite.parent) {
                App.game.stage.addChild(this.sprite);
                this.sprite.y = App.SHIFT_H;
                this.sprite.alpha = 0;
                createjs.Tween.get(this.sprite, {
                    loop: false
                }).wait(this.showDelay * 1e3).to({
                    alpha: 1
                }, 300)
            }
        };
        t.prototype.removeSprite = function() {
            removeClip(this.sprite)
        };
        return t
    }
    (GameObject);
var FirstGroupTapTutorial = function(e) {
        function t() {
            e.call(this);
            if (App.episode <= 1)
                this.tapCells.push(cjp(5, 1), cjp(5, 2), cjp(5, 3), cjp(4, 2), cjp(6, 2), cjp(6, 3));
            else
                this.tapCells.push(cjp(2, 5), cjp(3, 4), cjp(3, 5), cjp(4, 4), cjp(4, 5), cjp(4, 6), cjp(5, 6));
            var t = new createjs.Container;
            var n = createBitmap("tutorial1");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .8;
            t.addChild(n);
            var r = new createjs.BitmapText("Tap to remove\n     jellies", App.game.atlas);
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.scaleX = r.scaleY = .9;
            r.x = 99 + 50 + (App.episode <= 1 ? 0 : -85);
            r.y = 340 - 10 + (App.episode <= 1 ? 0 : -120);
            t.addChild(r);
            this.hideDelay = .15;
            this.showDelay = .5;
            this.init(t)
        }
        __extends(t, e);
        return t
    }
    (TutorialPage);
var HighValueTapTutorial = function(e) {
        function t() {
            e.call(this);
            var t = new createjs.Container;
            var n = createBitmap("tutorial2");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .8;
            t.addChild(n);
            var r = new createjs.BitmapText("Some jellies give\nadditional points", App.game.atlas);
            r.scaleX = r.scaleY = .8;
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 99 + (App.episode <= 1 ? 0 : 90);
            r.y = 400 + (App.episode <= 1 ? 0 : 50);
            t.addChild(r);
            var r = new createjs.BitmapText("Tap anywhere to continue", App.game.fontAtlas);
            r.scaleX = r.scaleY = .55;
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 45;
            r.y = 660;
            t.addChild(r);
            this.hideDelay = 0;
            this.showDelay = 2.5;
            this.init(t)
        }
        __extends(t, e);
        t.prototype.allowTap = function(e, t) {
            return false
        };
        t.prototype.checkHide = function(t, n) {
            return e.prototype.checkHide.call(this, t, n) || this.sprite.alpha > .9
        };
        return t
    }
    (TutorialPage);
var LineTapTutorial = function(e) {
        function t() {
            e.call(this);
            if (App.episode <= 1)
                this.tapCells.push(cjp(3, 7), cjp(4, 7), cjp(5, 7), cjp(6, 7), cjp(7, 7));
            else
                this.tapCells.push(cjp(6, 2), cjp(6, 3), cjp(6, 4), cjp(6, 5), cjp(6, 6));
            var t = new createjs.Container;
            var n = createBitmap("tutorial3");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .8;
            t.addChild(n);
            var r = new createjs.BitmapText("   remove line\nto create bonus", App.game.atlas);
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 130 + (App.episode <= 1 ? 0 : 55);
            r.y = 340 + 50 + (App.episode <= 1 ? 0 : 85);
            r.scaleX = r.scaleY = .85;
            t.addChild(r);
            this.hideDelay = .15;
            this.showDelay = 2;
            this.init(t)
        }
        __extends(t, e);
        return t
    }
    (TutorialPage);
var BonusTapTutorial = function(e) {
        function t() {
            e.call(this);
            if (App.episode <= 1)
                this.tapCells.push(cjp(0, 3), cjp(1, 3), cjp(2, 3), cjp(0, 2));
            else
                this.tapCells.push(cjp(0, 3), cjp(0, 4), cjp(0, 4), cjp(1, 3));
            var t = new createjs.Container;
            var n = createBitmap("tutorial4");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .8;
            t.addChild(n);
            var r = new createjs.BitmapText("activate bonus", App.game.atlas);
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 35 + (App.episode <= 1 ? 0 : 45);
            r.y = 240 + 90;
            r.scaleX = r.scaleY = .7;
            t.addChild(r);
            this.hideDelay = .15;
            this.showDelay = 1.5;
            this.init(t)
        }
        __extends(t, e);
        return t
    }
    (TutorialPage);
var BonusInfoTutorial = function(e) {
        function t() {
            e.call(this);
            var t = new createjs.Container;
            var n = createBitmap("tutorial5");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .85;
            t.addChild(n);
            var r = new createjs.BitmapText("line length determines\n       bonus power", App.game.atlas);
            r.scaleX = r.scaleY = .85;
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 25 - 20;
            r.y = 140 - 30 - 80;
            t.addChild(r);
            var i = -40;
            var s = 0;
            for (var o = 0; o < 3; ++o) {
                var u = .85;
                var a = 250 + o * 90 * u;
                for (var f = 0; f < 4 + o; ++f) {
                    var l = createSpriteFromSpritesheet("orange");
                    l.scaleX = l.scaleY = u;
                    l.x = 100 + (f + (2 - o)) * 60 * l.scaleX + i;
                    l.y = a + s;
                    t.addChild(l)
                }
                var r = new createjs.BitmapText("-", App.game.fontAtlas);
                r.x = 340 + 100 - 15 - 5 + i;
                r.y = a - 30 + 5 + s;
                t.addChild(r);
                for (var f = 0; f < (o == 0 ? 2 : 1); ++f) {
                    var l = createSpriteFromSpritesheet(o == 0 ? f == 0 ? "orange horizontal" : "orange vertical" : o == 1 ? "orange bomb" : "bonus color");
                    l.scaleX = l.scaleY = 1;
                    l.regX = l.getBounds().width / 2;
                    l.regY = l.getBounds().height / 2;
                    l.x = 400 + f * 65 + 100 + i;
                    l.y = a + 20 + s;
                    t.addChild(l)
                }
            }
            var r = new createjs.BitmapText("Tap anywhere to continue", App.game.fontAtlas);
            r.scaleX = r.scaleY = .55;
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 45;
            r.y = 660;
            t.addChild(r);
            this.hideDelay = 0;
            this.showDelay = .5;
            this.init(t)
        }
        __extends(t, e);
        t.prototype.allowTap = function(e, t) {
            return false
        };
        t.prototype.checkHide = function(t, n) {
            return e.prototype.checkHide.call(this, t, n) || this.sprite.alpha > .9
        };
        return t
    }
    (TutorialPage);
var ReachScoreTutorial = function(e) {
        function t() {
            e.call(this);
            var t = new createjs.Container;
            var n = createBitmap("tutorial6");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .8;
            t.addChild(n);
            var r = LevelManager.instance.data[0].customData;
            var i = new createjs.BitmapText("    Continue and\ncollect " + r + " points!", App.game.atlas);
            i.scaleX = i.scaleY = .92;
            i.letterSpacing = -10;
            i.spaceWidth = 25;
            i.lineHeight = 60;
            i.x = 50;
            i.y = 240 - 100;
            t.addChild(i);
            var i = new createjs.BitmapText(LevelManager.instance.data[0].movesLeft - 3 + " moves left!", App.game.atlas);
            i.scaleX = i.scaleY = 1;
            i.letterSpacing = -10;
            i.spaceWidth = 35;
            i.lineHeight = 60;
            i.x = 100;
            i.y = 240 + 66;
            t.addChild(i);
            var i = new createjs.BitmapText("Tap anywhere to continue", App.game.fontAtlas);
            i.scaleX = i.scaleY = .55;
            i.letterSpacing = -10;
            i.spaceWidth = 25;
            i.lineHeight = 60;
            i.x = 45;
            i.y = 660;
            t.addChild(i);
            this.hideDelay = 0;
            this.showDelay = 2.8;
            this.init(t)
        }
        __extends(t, e);
        t.prototype.allowTap = function(e, t) {
            return false
        };
        t.prototype.checkHide = function(t, n) {
            return e.prototype.checkHide.call(this, t, n) || this.sprite.alpha > .9
        };
        return t
    }
    (TutorialPage);
var BonusComboTapTutorial = function(e) {
        function t() {
            e.call(this);
            if (App.episode <= 1)
                this.tapCells.push(cjp(1, 4), cjp(1, 5), cjp(1, 6), cjp(2, 5), cjp(2, 6), cjp(2, 7), cjp(3, 4), cjp(3, 5), cjp(3, 7), cjp(3, 8), cjp(3, 9), cjp(4, 7), cjp(4, 8));
            else
                this.tapCells.push(cjp(2, 6), cjp(2, 7), cjp(3, 7), cjp(3, 8), cjp(4, 5), cjp(4, 6), cjp(4, 8), cjp(4, 9), cjp(5, 5), cjp(5, 7), cjp(5, 8), cjp(6, 5), cjp(6, 6), cjp(6, 7));
            var t = new createjs.Container;
            var n = createBitmap("tutorial7");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .8;
            t.addChild(n);
            var r = new createjs.BitmapText("  Combine bonuses\nto enchance them!", App.game.atlas);
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 210 + (App.episode <= 1 ? 0 : -90);
            r.y = 340 + 67 + (App.episode <= 1 ? 0 : -110);
            r.scaleX = r.scaleY = .7;
            t.addChild(r);
            this.hideDelay = .15;
            this.showDelay = .5;
            this.init(t)
        }
        __extends(t, e);
        return t
    }
    (TutorialPage);
var ComboInfoTutorial = function(e) {
        function t() {
            e.call(this);
            var t = new createjs.Container;
            var n = createBitmap("tutorial5");
            n.scaleX = n.scaleY = 4;
            n.regX = 0;
            n.x = 0;
            n.y = 3 - 9;
            n.alpha = .85;
            t.addChild(n);
            var r = new createjs.BitmapText(" Combine bonuses\nto enchance them!", App.game.atlas);
            r.scaleX = r.scaleY = .95;
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 40;
            r.y = 140 - 30 - 80;
            t.addChild(r);
            var i = -40;
            var s = 0;
            for (var o = 0; o < 4; ++o) {
                for (var u = 0; u < o + 4; ++u) {
                    var a = Math.random() < .25;
                    var f = getInt(3);
                    var l = createSpriteFromSpritesheet(a ? f == 0 ? "blue horizontal" : f == 1 ? "blue vertical" : "blue bomb" : "blue");
                    l.x = 140 + u * 60;
                    l.y = 250 + o * 60;
                    t.addChild(l)
                }
            }
            var r = new createjs.BitmapText("Tap anywhere to continue", App.game.fontAtlas);
            r.scaleX = r.scaleY = .55;
            r.letterSpacing = -10;
            r.spaceWidth = 25;
            r.lineHeight = 60;
            r.x = 45;
            r.y = 660;
            t.addChild(r);
            this.hideDelay = 0;
            this.showDelay = 2.5;
            this.init(t)
        }
        __extends(t, e);
        t.prototype.allowTap = function(e, t) {
            return false
        };
        t.prototype.checkHide = function(t, n) {
            return e.prototype.checkHide.call(this, t, n) || this.sprite.alpha > .9
        };
        return t
    }
    (TutorialPage);
var viewporter;
window.onload = function() {
    var e = new App
}