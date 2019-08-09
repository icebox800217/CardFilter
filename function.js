var filter_set = new Set();
var blue_str = "rgb(100, 120, 180)";
var green_str = "rgb(100, 180, 140)";
var white_str = "rgb(245, 245, 245)";
var black_str = "rgb(0, 0, 0)";
var or_filter = true;


var attr_type_string = ['水', '火', '木', '光', '暗'];
var race_type_string = ['人類', '獸類', '妖精類', '龍類', '神族', '魔族', '機械族'];
var star_type_string = ['1', '2', '3', '4', '5', '6', '7', '8'];
var skill_type_string = [
    '符石轉水', '符石轉火', '符石轉木', '符石轉光', '符石轉暗', '符石轉心',
    '水轉其他', '火轉其他', '木轉其他', '光轉其他', '暗轉其他', '心轉其他',
    '水符石引爆', '火符石引爆', '木符石引爆', '光符石引爆', '暗符石引爆',
    '減傷', '意志', '敵方減攻', '迴避', '回血',
    '破防', '直傷', '無法行動', '敵方轉屬', '屬性剋制改變', '排珠', '延長轉珠時間',
    '增傷', '界王拳', '攻擊轉屬', '增回', '攻擊力吸收', '共鳴',

];

$(".attr-row").html(function() {
    var str = $(".attr-row").html();
    str += "<div class=\"row skill-group\">";
    for (var x of attr_type_string) {
        str += "<div class=\"col-sm-2 attr-btn\"\">" + x + "</div>";
    }
    str += "</div>";
    return str;
});
$(".attr-btn").each(function() {
    $(this).css({
        "background-color": white_str
    }, {
        "color": black_str
    }, {
        "font-weight": "normal"
    });
    $(this).on("click", function() {
        $(this).css("background-color", ($(this).css("background-color") != green_str) ? green_str : white_str);
        $(this).css("color", ($(this).css("color") != black_str) ? black_str : white_str);
        $(this).css("font-weight", ($(this).css("background-color") != green_str) ? "normal" : "bold");
    });
});
$(".race-row").html(function() {
    var str = $(".race-row").html();
    str += "<div class=\"row skill-group\">";
    for (var x of race_type_string) {
        str += "<div class=\"col-sm-2 race-btn\"\">" + x + "</div>";
    }
    str += "</div>";
    return str;
});
$(".race-btn").each(function() {
    $(this).css({
        "background-color": white_str
    }, {
        "color": black_str
    }, {
        "font-weight": "normal"
    });
    $(this).on("click", function() {
        $(this).css("background-color", ($(this).css("background-color") != green_str) ? green_str : white_str);
        $(this).css("color", ($(this).css("color") != black_str) ? black_str : white_str);
        $(this).css("font-weight", ($(this).css("background-color") != green_str) ? "normal" : "bold");
    });
});

$(".star-row").html(function() {
    var str = $(".star-row").html();
    str += "<div class=\"row skill-group\">";
    for (var x of star_type_string) {
        str += "<div class=\"col-sm-2 star-btn\"\">";
        str += x + " ★ ";
        str += "</div>";
    }
    str += "</div>";
    return str;
});
$(".star-btn").each(function() {
    $(this).css({ "background-color": white_str }, { "color": black_str }, { "font-weight": "normal" });
    $(this).on("click", function() {
        $(this).css("background-color", ($(this).css("background-color") != green_str) ? green_str : white_str);
        $(this).css("color", ($(this).css("color") != black_str) ? black_str : white_str);
        $(this).css("font-weight", ($(this).css("background-color") != green_str) ? "normal" : "bold");
    });
});
$(".filter-row").html(function() {
    var str = $(".filter-row").html();
    str += "<div class=\"row skill-group\">";
    for (var x of skill_type_string) {
        str += "<div class=\"col-sm-2 filter-btn\"\">";
        str += x;
        str += "</div>";
    }
    str += "</div>";

    return str;
});
$(".filter-btn").each(function() {
    $(this).css({ "background-color": white_str }, { "color": black_str }, { "font-weight": "normal" });
    $(this).on("click", function() {
        $(this).css("background-color", ($(this).css("background-color") != blue_str) ? blue_str : white_str);
        $(this).css("color", ($(this).css("color") != black_str) ? black_str : white_str);
        $(this).css("font-weight", ($(this).css("background-color") != blue_str) ? "normal" : "bold");
    });
});

function startFilter() {
    // changeUrl();
    filter_set.clear();
    var attr_set = new Set();
    var attr_intersect = false;
    $(".attr-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            attr_set.add($(this).text());
            attr_intersect = true;
        }
    });

    var race_set = new Set();
    var race_intersect = false;
    $(".race-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            race_set.add($(this).text());
            race_intersect = true;
        }
    });

    var star_set = new Set();
    var star_intersect = false;
    $(".star-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            star_set.add($(this).text()[0]);
            star_intersect = true;
        }
    });
    var skill_set = new Set();
    var skill_select = false;

    skill_set.clear();

    $(".filter-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            skill_set.add($(this).text());
            skill_select = true;
        }
    });



    if ($("#result_title").css("display") == "none") {
        $("#result_title").css("display", "block");
    }
    for (var x of monsterData) {
        if (attr_intersect) {
            if (!(attr_set.has(x.attribute))) continue;
        }
        if (race_intersect) {
            if (!race_set.has(x.race)) continue;
        }
        if (star_intersect) {
            if (!star_set.has(x.star)) continue;
        }

        if (skill_select) {
            var check = false;
            for (var k of skill_set) {
                if (x.skill.includes(k)) {
                    check = true;
                    break;
                }
            }

            if (!check) continue;
        }
        if (attr_intersect == false && race_intersect == false && star_intersect == false && skill_select == false) {
            alert("請先進行選擇");
            return;
        }

        filter_set.add(x.id);
    }


    var monster_array = Array.from(filter_set);
    $(".result-row").html(function() {
        var str = "";

        if (monster_array.length != 0) {
            //monster_array.sort((a, b) => a - b);
            monster_array.forEach(function(x) {
                var monster_attr = monsterData.find(function(element) {
                    return element.id == x;
                }).attribute;
                str += "<div class='col-sm-1 result'><a href='https://tos.fandom.com/zh/wiki/" + x + "' target='_blank'><img class='monsterId' src='img/" + obj[x].id + ".png' ></a></div>"
                console.log(x);
            });

        } else {
            str = "<h1 style=\"text-align: center; color: red;\">查無結果</h1>";
        }
        return str;

    });
    jumpTo("resultTitle");
};

function startFilter2() {
    // changeUrl();
    filter_set.clear();
    var attr_set = new Set();
    var attr_intersect = false;
    $(".attr-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            attr_set.add($(this).text());
            attr_intersect = true;
        }
    });

    var race_set = new Set();
    var race_intersect = false;
    $(".race-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            race_set.add($(this).text());
            race_intersect = true;
        }
    });

    var star_set = new Set();
    var star_intersect = false;
    $(".star-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            star_set.add($(this).text()[0]);
            star_intersect = true;
        }
    });
    var skill_set = new Set();
    var skill_select = false;

    skill_set.clear();

    $(".filter-btn").each(function() {
        if ($(this).css("background-color") != white_str) {
            skill_set.add($(this).text());
            skill_select = true;
        }
    });



    if ($("#result_title").css("display") == "none") {
        $("#result_title").css("display", "block");
    }
    for (var x of monsterData) {
        if (attr_intersect) {
            if (!(attr_set.has(x.attribute))) continue;
        }
        if (race_intersect) {
            if (!race_set.has(x.race)) continue;
        }
        if (star_intersect) {
            if (!star_set.has(x.star)) continue;
        }

        if (skill_select) {
            var check = true;
            for (var k of skill_set) {
                if (!x.skill.includes(k)) {
                    check = false;
                    break;
                }
            }

            if (!check) continue;
        }
        if (attr_intersect == false && race_intersect == false && star_intersect == false && skill_select == false) {
            alert("請先進行選擇");
            return;
        }

        filter_set.add(x.id);
    }


    var monster_array = Array.from(filter_set);
    $(".result-row").html(function() {
        var str = "";

        if (monster_array.length != 0) {
            //monster_array.sort((a, b) => a - b);
            monster_array.forEach(function(x) {
                var monster_attr = monsterData.find(function(element) {
                    return element.id == x;
                }).attribute;
                str += "<div class='col-sm-1 result'><a href='https://tos.fandom.com/zh/wiki/" + x + "' target='_blank'><img class='monsterId' src='img/" + obj[x].id + ".png' ></a></div>"
                console.log(x);
            });

        } else {
            str = "<h1 style=\"text-align: center; color: red;\">查無結果</h1>";
        }
        return str;

    });
    jumpTo("resultTitle");
};

function reset() {
    $(".attr-btn").each(function() {
        $(this).css("background-color", white_str);
        $(this).css("color", black_str);
        $(this).css("font-weight", "normal");
    });

    $(".race-btn").each(function() {
        $(this).css("background-color", white_str);
        $(this).css("color", black_str);
        $(this).css("font-weight", "normal");
    });

    $(".star-btn").each(function() {
        $(this).css("background-color", white_str);
        $(this).css("color", black_str);
        $(this).css("font-weight", "normal");
    });
    $(".filter-btn").each(function() {
        $(this).css("background-color", white_str);
        $(this).css("color", black_str);
        $(this).css("font-weight", "normal");
    });
    filter_set.clear();
    $(".result-row").html('');
};

$(function() {
    $('.gotop').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 'fast');
        // return false;
        console.log('123')
    });
});

function jumpTo() {
    window.scrollTo({
        top: 10000,
        // behavior: "fast"
    });
}