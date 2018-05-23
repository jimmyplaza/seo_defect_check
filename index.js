var http = require('http');
var fs = require('fs');
const cheerio = require('cheerio');
var inquirer = require("inquirer");



var $
var htmlpath = ''
var strong_num = 15
var mapchoices = {
          '1. defect <img>':0,
          '2. defect <a>':1,
          '3. defect <head>':2,
          '4. defect <strong>':3,
          '5. defect <H1>':4
    }

async function seoDefectImg() {
    var count = 0;
    $('img').each(function(i, elem) {
        if ($(this).attr('alt')) {
            count++;
        }
    });
    console.log("There are %d <img> tag without alt attribute", count);
    return "seoDefectImg() done"
}

async function seoDefectA() {
    var count = 0;
    $('a').each(function(i, elem) {
        if ($(this).attr('rel')) {
            count++;
        }
    });
    console.log("There are %d <a> tag without rel attribute", count);
    return "seoDefectA() done"
}

async function seoDefectHead() {
    var count_title = 0;
    var count_meta_desc = 0;
    var count_meta_key = 0;
    // var count_meta_robots = 0;
    $('head title').each(function(i, elem) {
        count_title++;
    });
    if (count_title == 0) {
        console.log("This HTML without <title> tag");
    }

    // meta descriptions
    $('head meta').each(function(i, elem) {
        name = $(this).attr('name');
        if (name == "descriptions") {
            count_meta_desc ++;
        }
        if (name == "keywords") {
            count_meta_key ++;
        }
        // if (name == "robots") {
            // count_meta_robots ++;
        // }
    });
    if (count_meta_desc == 0) {
        console.log("Header meta doesn’t have descriptions tag");
    }
    if (count_meta_key == 0) {
        console.log("Header meta doesn’t have key tag");
    }
    // if (count_meta_robots == 0) {
        // console.log("Header meta doesn’t have robots tag");
    // }
    return "seoDefectHea() done"

}

async function seoDefectStrong() {
    var count = 0;
    $('strong').each(function(i, elem) {
        count ++;
    });
    if (count > strong_num) {
        console.log("There are %d <strong> tag, we want only %d <strong> tag", count, strong_num);
    }
    return "seoDefectStrong() done"
}

async function seoDefectH1() {
    var count = 0;
    $('H1').each(function(i, elem) {
        count ++;
    });
    if (count > 1) {
        console.log("This HTML have more than one <h1> tag");
    }
    return "seoDefectH1() done"
}

function Parsing(){
    var questions = [
        {
          name: 'htmlpath',
          type: 'input',
          message: 'What html path do you want?',
            default: './test.html'
        },
        {
          name: 'strongcount',
          type: 'input',
            message: 'What minimum number of <strong> tag you want to config?',
            default: 15
        },
        {
        name: 'seocheck',
        type: "checkbox",
        message: 'What seo defects you want to check?',
        choices: [
          {
            name: "1. defect <img>",
            checked: true
          },
          {
            name: "2. defect <a>"
          },
          {
            name: "3. defect <head>"
          },
          {
            name: "4. defect <strong>"
          },
          {
            name: "5. defect <H1>"
          }
          ],
        }
    ];

    inquirer.prompt(questions).then((answers) => {
          htmlpath = answers['htmlpath']
          strong_num = answers['strongcount']
          $ = cheerio.load(fs.readFileSync(htmlpath))
          console.log("htmlpath: %s\n", htmlpath);
          var arr = []
          answers['seocheck'].map( function(i){
                arr.push(mapchoices[i])
          })
          var seoDetectFuncs = [
                seoDefectImg,
                seoDefectA,
                seoDefectHead,
                seoDefectStrong,
                seoDefectH1
          ]

          let jobs = arr.map(async (num) => {
             await seoDetectFuncs[num]();
          });
    })
}

module.exports = {
    Parsing: Parsing,
    seoDefectImg: seoDefectImg,
    seoDefectA: seoDefectA,
    seoDefectHead: seoDefectHead,
    seoDefectStrong: seoDefectStrong,
    seoDefectH1: seoDefectH1
}
