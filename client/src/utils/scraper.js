const cheerio = require('cheerio');
const axios = require('axios');
const _ = require('lodash');

const darebeeBase = "https://darebee.com/";

const axiosDarebee = axios.create({
    baseURL: darebeeBase
});

// getWOD().then(wod => console.log(JSON.stringify(wod, null, 2)));

// getWorkout('https://darebee.com/workouts/rage-workout.html').then(wod => console.log(JSON.stringify(wod, null, 2)));

getProgram('https://darebee.com/programs/fit-christmas.html').then(prog => console.log(JSON.stringify(prog, null, 2)));

async function getProgram(progLink) {
    const response = await axiosDarebee.get(progLink);
    const $ = cheerio.load(response.data);

    const imgElem = $('.fullprogmain img');

    let name = imgElem.attr('alt');
    const imgUrl = imgElem.attr('src');

    if(name != "") {
        name = getNameFromAlt(name);
    }
    else {
        name = getNameFromSrc(getFilename(imgElem.attr('src')));
    }

    const workouts = $('.index_wrapper > .ppp a').toArray().map(workout => $(workout)).map(workout => ({
        progName: name,
        url: workout.attr('href'),
        label: workout.text()
    }));

    const workoutsFull = await Promise.all(workouts.map(workout => getProgWorkout(workout)));

    return {
        name: name,
        url: progLink,
        imgUrl: imgUrl,
        workouts: workoutsFull
    };
}

async function getProgWorkout(workoutInfo) {
    const response = await axiosDarebee.get(workoutInfo.url);
    const $ = cheerio.load(response.data);

    const imgElem = $('.fullprog img');

    let name = imgElem.attr('alt');
    const imgUrl = imgElem.attr('src');

    if(name != "") {
        name = getNameFromAlt(name);
    }
    else {
        name = getNameFromSrc(getFilename(imgElem.attr('src')));
    }
    
    return {
        name: `${name} - ${workoutInfo.label}`,
        url: workoutInfo.url,
        imgUrl: imgUrl
    }
}

async function getWOD() {
    let response = await axiosDarebee.get('/');
    let $ = cheerio.load(response.data);

    const wodLink = $('.darewod a').attr('href');

    return getWorkout(wodLink);
}

async function getWorkout(workoutLink) {
    const response = await axiosDarebee.get(workoutLink);
    const $ = cheerio.load(response.data);

    const imgElem = $('#content .item-image img');
    const focusImgElem = $('#content .infobox-works img');
    const typeImgElem = $('#content .infobox-focus img');
    const diffImgElem = $('#content .infobox-difficulty img');
    
    let name = imgElem.attr('alt');
    const imgUrl = imgElem.attr('src');
    const focus = getFilename(focusImgElem.attr('src'));
    const type = getFilename(typeImgElem.attr('src'));
    const diff = getFilename(diffImgElem.attr('src'));

    if(name != "") {
        name = getNameFromAlt(name);
    }
    else {
        name = getNameFromSrc(getFilename(imgElem.attr('src')));
    }

    return {
        name: name,
        url: workoutLink,
        imgUrl: imgUrl,
        focus: getFocus(focus),
        type: getType(type),
        difficulty: getDifficulty(diff),
    }
}

function getNameFromAlt(alt) {
    let cutIndex = -1;

    const cutTerms = [
        " pdf darebee workout",
        " darebee workout",
        " pdf",
        " darebee",
        " workout"
    ];
    
    for(let i = 0; i < cutTerms.length; i++) {
        cutIndex = alt.toLowerCase().lastIndexOf(cutTerms[i]);
        
        if(cutIndex >= 0) {
            return alt.substring(0, cutIndex);
        }
    }

    return alt;
}

function getNameFromSrc(src) {
    let cutIndex = src.lastIndexOf('-workout.');

    if(cutIndex == -1) {
        cutIndex = src.lastIndexOf('.');
    }

    if(cutIndex == -1) {
        cutIndex = src.length;
    }

    return _.startCase(src.substring(0, cutIndex));
}

function getFocus(filename) {
    const focusMap = {
        "focus-fullbody.jpg": "Full Body"
    };

    let focus = focusMap[filename];

    if(focus) {
        return focus;
    }

    return _.startCase(filename.replace(/focus-(.+?)\..+/g, "$1"));
}

function getType(filename) {
    const typeMap = {
        "type-combat.jpg": "Combat Skills",
        "type-strength.jpg": "Strength",
        "type-burn.jpg": "Burn"
    };

    let type = typeMap[filename];

    if(type) {
        return type;
    }

    return _.startCase(filename.replace(/type-(.+?)\..+/g, "$1"));
}

function getDifficulty(filename) {
    const diffMap = {
        "difficulty-0.jpg": 0,
        "difficulty-1.jpg": 1,
        "difficulty-2.jpg": 2,
        "difficulty-3.jpg": 3,
        "difficulty-4.jpg": 4,
        "difficulty-5.jpg": 5
    };

    let diff = diffMap[filename];

    if(diff) {
        return diff;
    }

    return +_.startCase(filename.replace(/difficulty-(.+?)\..+/g, "$1"));
}

function getFilename(url) {
    return _.last(url.split('/'));
}