// Originally inspired by http://www.holytrinityorthodox.com/ru/calendar/v2staff/loadCalendar_v2.js

const fastingLevels = {
    1: 'полное воздержание от пищи',
    2: 'cухоядение',
    3: 'горячая пища без масла',
    4: 'пища с растительным маслом',
    5: 'разрешается рыба',
    6: 'разрешается рыбная икра',
    7: 'исключается мясо',
    8: '',
};

const calculateEasterDate = year => {
    // Pascha Calculation
    let pascha_m;
    let pascha_d;
    const r1 = year % 19;
    const r2 = year % 4;
    const r3 = year % 7;
    const ra = 19 * r1 + 16;
    const r4 = ra % 30;
    const rb = 2 * r2 + 4 * r3 + 6 * r4;
    const r5 = rb % 7;
    const rc = 3 + r4 + r5;

    if (rc < 30) {
        pascha_m = 3; // Pascha is  in April
        pascha_d = rc; // Pascha day in Aplil
    } else {
        pascha_m = 4; // Pascha is in May
        pascha_d = rc - 30; // Pascha day in May
    }

    return new Date(year, pascha_m, pascha_d); // Set Pascha Date
};

export function getLentInfo(date) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    let fastingLevel = 8;
    let fastName = 'Постный день';
    let colour = null;

    const pascha = calculateEasterDate(y);

    const current_date = new Date(y, m, d);
    const current_day_of_week = current_date.getDay();

    // Cristmass Lent
    const cristmass_lent_begin = new Date(y, 10, 28);
    const cristmass_lent_nicolos = new Date(y, 11, 19);
    const cristmass_lent_theotocos = new Date(y, 11, 4);
    const end_of_current_year = new Date(y, 11, 31);
    const begin_of_current_year = new Date(y, 0, 1);
    const cristmass_preprazd = new Date(y, 0, 2);
    const cristmass_lent_end = new Date(y, 0, 6);

    if (current_date >= cristmass_lent_begin && current_date < cristmass_lent_nicolos) {
        if (
            current_day_of_week == 0 ||
            current_day_of_week == 2 ||
            current_day_of_week == 4 ||
            current_day_of_week == 6
        ) {
            fastingLevel = 5;
        }
        if (current_day_of_week == 1) {
            fastingLevel = 3;
        }
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
        if (
            current_date.valueOf() == cristmass_lent_theotocos.valueOf() &&
            (current_day_of_week == 3 || current_day_of_week == 5)
        ) {
            fastingLevel = 5;
        }
    }

    if (
        (current_date >= cristmass_lent_nicolos && current_date <= end_of_current_year) ||
        (current_date >= begin_of_current_year && current_date < cristmass_preprazd)
    ) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fastingLevel = 5;
        }
        if (current_day_of_week == 1) {
            fastingLevel = 3;
        }
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fastingLevel = 4;
        }
    }

    if (current_date >= cristmass_preprazd && current_date <= cristmass_lent_end) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fastingLevel = 4;
        }
        if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fastingLevel = 3;
        }
    }

    if (current_date >= cristmass_lent_begin && current_date <= cristmass_lent_end) {
        fastName = 'Рождественский пост';
    }

    // After Cristmass Lent
    const beg = new Date(y, 0, 20); // January 20th
    const beg_pharesee = calculateEasterDate(y);
    beg_pharesee.setDate(pascha.getDate() - 69); // Begin of Pharesee week
    const end_pharesee = calculateEasterDate(y);
    end_pharesee.setDate(pascha.getDate() - 63); // End of Pharesee week
    const one_week_before_great_lent = calculateEasterDate(y);
    one_week_before_great_lent.setDate(pascha.getDate() - 55); // One week before Great Lent starts

    if (
        (current_date >= beg && current_date < beg_pharesee) ||
        (current_date >= end_pharesee && current_date < one_week_before_great_lent)
    ) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 5;
        }
    }

    // Meat free week
    const beg_meet_free_week = calculateEasterDate(y);
    beg_meet_free_week.setDate(pascha.getDate() - 55); // Begin of Meet free week
    const end_meet_free_week = calculateEasterDate(y);
    end_meet_free_week.setDate(pascha.getDate() - 49); // End of Meet free week
    if (current_date >= beg_meet_free_week && current_date <= end_meet_free_week) {
        fastingLevel = 7;
    }

    // Uspensky Lent
    const uspensky_lent_begin = new Date(y, 7, 14);
    const transfiguration = new Date(y, 7, 19);
    const uspensky_lent_end = new Date(y, 7, 28);

    if (current_date >= uspensky_lent_begin && current_date < uspensky_lent_end) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fastingLevel = 4;
        }
        if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fastingLevel = 3;
        }
        if (current_date.valueOf() == transfiguration.valueOf()) {
            fastingLevel = 5;
        }

        fastName = 'Успенский пост';
    }

    // After Uspensky Lent
    if (current_date >= uspensky_lent_end && current_date < cristmass_lent_begin) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
    }

    // Petrov Lent
    const petrov_lent_begin = calculateEasterDate(y);
    petrov_lent_begin.setDate(pascha.getDate() + 57);
    const petrov_lent_end = new Date(y, 6, 12);
    if (current_date >= petrov_lent_begin && current_date < petrov_lent_end) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
        if (
            current_day_of_week == 0 ||
            current_day_of_week == 2 ||
            current_day_of_week == 4 ||
            current_day_of_week == 6
        ) {
            fastingLevel = 5;
        }
        if (current_day_of_week == 1) {
            fastingLevel = 3;
        }

        fastName = 'Петров пост';
    }

    // After Petrov Lent
    if (current_date >= petrov_lent_end && current_date < uspensky_lent_begin) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
    }

    // Great Lent
    const great_lent_begin = calculateEasterDate(y);
    great_lent_begin.setDate(pascha.getDate() - 48);
    const palm_saturday = calculateEasterDate(y);
    palm_saturday.setDate(pascha.getDate() - 8);
    const palm_sunday = calculateEasterDate(y);
    palm_sunday.setDate(pascha.getDate() - 7);
    const theotocos = new Date(y, 3, 7);
    const great_lent_end = calculateEasterDate(y);

    if (current_date > great_lent_begin && current_date < great_lent_end) {
        if (current_day_of_week == 0 || current_day_of_week == 6) {
            fastingLevel = 4;
        }
        if (current_day_of_week == 1 || current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 2;
        }
        if (current_day_of_week == 2 || current_day_of_week == 4) {
            fastingLevel = 3;
        }

        fastName = 'Великий пост';
        colour = '#7b68ee';
    }
    if (current_date.valueOf() == great_lent_begin.valueOf()) {
        fastingLevel = 1;
    }
    if (current_date.valueOf() == palm_saturday.valueOf()) {
        fastingLevel = 6;
    }
    if (current_date.valueOf() == palm_sunday.valueOf()) {
        fastingLevel = 5;
    }
    if (
        current_date.valueOf() == theotocos.valueOf() &&
        current_date > great_lent_begin &&
        current_date <= palm_sunday
    ) {
        fastingLevel = 5;
    }
    if (current_date.valueOf() == theotocos.valueOf() && current_date > palm_sunday && current_date < great_lent_end) {
        fastingLevel = 4;
    }
    if (current_date > palm_sunday && current_date < great_lent_end && current_day_of_week == 5) {
        fastingLevel = 1;
    }
    if (current_date > palm_sunday && current_date < great_lent_end && current_day_of_week == 6) {
        fastingLevel = 2;
    }

    // After Great Lent
    const greatLentBegin = calculateEasterDate(y);
    greatLentBegin.setDate(pascha.getDate() + 7);
    const pentecost = calculateEasterDate(y);
    pentecost.setDate(pascha.getDate() + 49);
    if (current_date >= greatLentBegin && current_date < pentecost) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 5;
        }
    }

    // One Day Lent
    const sochelnik_cr = new Date(y, 0, 6);
    const sochelnik = new Date(y, 0, 18);
    const beheading = new Date(y, 8, 11);
    const elevation = new Date(y, 8, 27);
    const sretenie = new Date(y, 1, 15);
    const preobrazhenie = new Date(y, 7, 19);
    const uspenie = new Date(y, 7, 28);
    const rozh_bogor = new Date(y, 8, 21);
    const pokrov = new Date(y, 9, 14);
    const vvedenie = new Date(y, 11, 4);
    const joann = new Date(y, 6, 7);
    const peter = new Date(y, 6, 12);
    const bogoslov = new Date(y, 4, 21);

    if (
        current_date.valueOf() == sochelnik_cr.valueOf() ||
        current_date.valueOf() == sochelnik.valueOf() ||
        current_date.valueOf() == beheading.valueOf() ||
        current_date.valueOf() == elevation.valueOf()
    ) {
        fastingLevel = 4;
    }
    if (
        current_date.valueOf() == sretenie.valueOf() ||
        current_date.valueOf() == preobrazhenie.valueOf() ||
        current_date.valueOf() == uspenie.valueOf() ||
        current_date.valueOf() == rozh_bogor.valueOf() ||
        current_date.valueOf() == pokrov.valueOf() ||
        current_date.valueOf() == vvedenie.valueOf() ||
        current_date.valueOf() == joann.valueOf() ||
        current_date.valueOf() == peter.valueOf() ||
        current_date.valueOf() == bogoslov.valueOf()
    ) {
        if (current_day_of_week == 3 || current_day_of_week == 5) {
            fastingLevel = 5;
        }
    }

    // Sviatki
    const sviatki_begin = new Date(y, 0, 7);
    const sviatki_end = new Date(y, 0, 17);
    if (current_date >= sviatki_begin && current_date <= sviatki_end) {
        fastingLevel = 8;
    }

    // Paresee
    const paresee_begin = calculateEasterDate(y);
    paresee_begin.setDate(pascha.getDate() - 69);
    const paresee_end = calculateEasterDate(y);
    paresee_end.setDate(pascha.getDate() - 63);
    const pentecost_begin = calculateEasterDate(y);
    pentecost_begin.setDate(pascha.getDate() + 49);
    const pentecost_end = calculateEasterDate(y);
    pentecost_end.setDate(pascha.getDate() + 55);

    if (
        (current_date >= paresee_begin && current_date < paresee_end) ||
        (current_date > pentecost_begin && current_date <= pentecost_end)
    ) {
        fastingLevel = 8;
    }

    // Svetlaia sedmitsa
    const svetlaia_begin = calculateEasterDate(y);
    const svetlaia_end = calculateEasterDate(y);
    svetlaia_end.setDate(pascha.getDate() + 6);

    if (current_date > svetlaia_begin && current_date <= svetlaia_end) {
        fastingLevel = 8;
    }

    if (fastingLevel) {
        return {
            fastName: fastingLevel !== 8 ? fastName : 'Поста нет',
            fastingLevel,
            fastingLevelName: fastingLevels[fastingLevel],
            colour,
        };
    }

    return null;
}

export function getFeastInfo(_date) {
    const y = _date.getFullYear();
    const m = _date.getMonth();
    const d = _date.getDate();
    const date = new Date(y, m, d);

    const pascha = calculateEasterDate(y);

    if (pascha.getTime() == date.getTime()) {
        return {
            title: 'Пасха',
            feastType: '12',
            colour: '#D02020',
        };
    }

    const palm_sunday = calculateEasterDate(y);
    palm_sunday.setDate(pascha.getDate() - 7);

    if (palm_sunday.getTime() == date.getTime()) {
        return {
            title: 'Вход Господень в Иерусалим',
            feastType: '12',
            colour: '#5C985C',
        };
    }

    const holy_Ascension = calculateEasterDate(y);
    holy_Ascension.setDate(pascha.getDate() + 39);

    if (holy_Ascension.getTime() == date.getTime()) {
        return {
            title: 'Вознесение',
            feastType: '12',
            colour: '#A2A2A2',
        };
    }

    const pentecost = calculateEasterDate(y);
    pentecost.setDate(pascha.getDate() + 49);

    if (pentecost.getTime() == date.getTime()) {
        return {
            title: 'Пятидесятница',
            feastType: '12',
            colour: '#5C985C',
        };
    }

    if (new Date(y, 8, 21).getTime() == date.getTime()) {
        return {
            title: 'Рождество Богородицы',
            feastType: '12',
            colour: '#4169E1',
        };
    }

    if (new Date(y, 8, 27).getTime() == date.getTime()) {
        return {
            title: 'Воздвижение Креста Господня',
            feastType: '12',
            colour: '#A2A2A2',
        };
    }

    if (new Date(y, 11, 4).getTime() == date.getTime()) {
        return {
            title: 'Введение во храм Пресвятой Богородицы',
            feastType: '12',
            colour: '#4169E1',
        };
    }

    if (new Date(y, 0, 7).getTime() == date.getTime()) {
        return {
            title: 'Рождество Христово',
            feastType: '12',
            colour: '#A2A2A2',
        };
    }

    if (new Date(y, 0, 19).getTime() == date.getTime()) {
        return {
            title: 'Крещение Господне',
            feastType: '12',
            colour: '#A2A2A2',
        };
    }

    if (new Date(y, 1, 15).getTime() == date.getTime()) {
        return {
            title: 'Сретение Господне',
            feastType: '12',
            colour: '#A2A2A2',
        };
    }

    if (new Date(y, 3, 7).getTime() == date.getTime()) {
        return {
            title: 'Благовещение Пресвятой Богородицы',
            feastType: '12',
            colour: '#4169E1',
        };
    }

    if (new Date(y, 7, 19).getTime() == date.getTime()) {
        return {
            title: 'Преображение Господне',
            feastType: '12',
            colour: '#A2A2A2',
        };
    }

    if (new Date(y, 7, 28).getTime() == date.getTime()) {
        return {
            title: 'Успение Богородицы',
            feastType: '12',
            colour: '#4169E1',
        };
    }

    if (new Date(y, 9, 14).getTime() == date.getTime()) {
        return {
            title: 'Покров Пресвятой Богородицы',
            feastType: 'great',
            colour: '#4169E1',
        };
    }

    if (new Date(y, 0, 14).getTime() == date.getTime()) {
        return {
            title: 'Обрезание Господне',
            feastType: 'great',
            colour: '#A2A2A2',
        };
    }

    if (new Date(y, 6, 7).getTime() == date.getTime()) {
        return {
            title: 'Рождество Иоанна Крестителя',
            feastType: 'great',
        };
    }

    if (new Date(y, 6, 12).getTime() == date.getTime()) {
        return {
            title: 'День святых первоверховных апостолов Петра и Павла',
            feastType: 'great',
        };
    }

    if (new Date(y, 8, 11).getTime() == date.getTime()) {
        return {
            title: 'Усекновение главы Иоанна Предтечи',
            feastType: 'great',
        };
    }

    return {};
}