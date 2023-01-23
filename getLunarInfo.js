function JulianDateFromUnixTime(t){
	//Not valid for dates before Oct 15, 1582
	return (t / 86400000) + 2440587.5;
}

function constrain(d){
    let t=d%360;
    if(t<0){t+=360;}
    return t;
}

// source code/credit for illumination %: https://www.celestialprogramming.com/meeus-illuminated_fraction_of_the_moon.html
function getIlluminatedFractionOfMoon(jd){
    const toRad=Math.PI/180.0;
    const T=(jd-2451545)/36525.0;

    const D = constrain(297.8501921 + 445267.1114034*T - 0.0018819*T*T + 1.0/545868.0*T*T*T - 1.0/113065000.0*T*T*T*T)*toRad; //47.2
    const M = constrain(357.5291092 + 35999.0502909*T - 0.0001536*T*T + 1.0/24490000.0*T*T*T)*toRad; //47.3
    const Mp = constrain(134.9633964 + 477198.8675055*T + 0.0087414*T*T + 1.0/69699.0*T*T*T - 1.0/14712000.0*T*T*T*T)*toRad; //47.4

    //48.4
    const i=constrain(180 - D*180/Math.PI - 6.289 * Math.sin(Mp) + 2.1 * Math.sin(M) -1.274 * Math.sin(2*D - Mp) -0.658 * Math.sin(2*D) -0.214 * Math.sin(2*Mp) -0.11 * Math.sin(D))*toRad;

    const k=(1+Math.cos(i))/2;
    return k;
}

function getLunarPhaseEmoji (date) {
    const lunarCycleLength = 29.53058770576;
    let firstFullMoon2000 = new Date('2000-01-06T18:14:00.137Z');
        
    let difference = date.getTime() - firstFullMoon2000.getTime();
    const days = difference / (1000 * 3600 * 24);
    const dayInCycle = days % lunarCycleLength;

    if ( dayInCycle >= 28.53058770576 || dayInCycle < 1 ) {
        return '🌑';
    }
    else if ( dayInCycle >= 1 && dayInCycle < 6.38264692644001 ) {
        return '🌒';
    }
    else if ( dayInCycle >= 6.38264692644001 && dayInCycle < 8.38264692644 ) {
        return '🌓';
    }
    else if ( dayInCycle >= 8.38264692644 && dayInCycle < 13.76529385288 ) {
        return '🌔';
    }
    else if ( dayInCycle >= 13.76529385288 && dayInCycle < 15.76529385288 ) {
        return '🌕';
    }
    else if ( dayInCycle >= 15.76529385288 && dayInCycle < 21.14794077932 ) {
        return '🌖';
    }
    else if ( dayInCycle >= 21.14794077932 && dayInCycle < 23.14794077932 ) {
        return '🌗';
    }
    else if ( dayInCycle >= 23.14794077932 && dayInCycle < 28.53058770576 ) {
        return '🌘';
    }
}

function getLunarSign (date) {
    const lunarOrbitLength = 27.32;
    let firstAries2022 = new Date('2022-01-08 08:56:00');

    let difference = date.getTime() - firstAries2022.getTime();
    const days = difference / (1000 * 3600 * 24);
    const dayInCycle = days % lunarOrbitLength;
    const signDuration = lunarOrbitLength / 12;

    if ( dayInCycle >= 0 && dayInCycle < signDuration ) {
        return '♈';
    }
    else if ( dayInCycle >= signDuration && dayInCycle < 2*signDuration ) {
        return '♉';
    }
    else if ( dayInCycle >= 2*signDuration && dayInCycle < 3*signDuration ) {
        return '♊';
    }
    else if ( dayInCycle >= 3*signDuration && dayInCycle < 4*signDuration ) {
        return '♋';
    }
    else if ( dayInCycle >= 4*signDuration && dayInCycle < 5*signDuration ) {
        return '♌';
    }
    else if ( dayInCycle >= 5*signDuration && dayInCycle < 6*signDuration ) {
        return '♍';
    }
    else if ( dayInCycle >= 6*signDuration && dayInCycle < 7*signDuration ) {
        return '♎';
    }
    else if ( dayInCycle >= 7*signDuration && dayInCycle < 8*signDuration ) {
        return '♏';
    }
    else if ( dayInCycle >= 8*signDuration && dayInCycle < 9*signDuration ) {
        return '♐';
    }
    else if ( dayInCycle >= 9*signDuration && dayInCycle < 10*signDuration ) {
        return '♑';
    }
    else if ( dayInCycle >= 10*signDuration && dayInCycle < 11*signDuration ) {
        return '♒';
    }
    else if ( dayInCycle >= 11*signDuration && dayInCycle < 12*signDuration ) {
        return '♓';
    }
}

function getLunarInfo (date) {
    const dateObj = new Date(date);

    const sign = getLunarSign(dateObj);
    const phase = getLunarPhaseEmoji(dateObj);
    const percentage = Math.round(getIlluminatedFractionOfMoon(JulianDateFromUnixTime(dateObj.getTime()))*100);

    return sign + phase + ': ' + percentage + '%'
}

module.exports = getLunarInfo;
