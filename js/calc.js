document.addEventListener("DOMContentLoaded", function () {

	const runes = [
		{
			group: 1,
			atts: [
				{ rus: "Феху", eng: "Fehu", img: "/img/runes/fehu.png" },
				{ rus: "Хагалаз", eng: "Hagalaz", img: "/img/runes/hagalaz.png" },
				{ rus: "Тейваз", eng: "Teiwaz", img: "/img/runes/teiwaz.png" }
			]
		},
		{
			group: 2,
			atts: [
				{ rus: "Уруз", eng: "Uruz", img: "/img/runes/uruz.png" },
				{ rus: "Наутиз", eng: "Nauthiz", img: "/img/runes/nauthiz.png" },
				{ rus: "Беркана", eng: "Berkana", img: "/img/runes/berkana.png" }
			]
		},
		{
			group: 3,
			atts: [
				{ rus: "Турисаз", eng: "Thurisaz", img: "/img/runes/thurisaz.png" },
				{ rus: "Иса", eng: "Isa", img: "/img/runes/isa.png" },
				{ rus: "Эваз", eng: "Ehwaz", img: "/img/runes/ehwaz.png" }
			]
		},
		{
			group: 4,
			atts: [
				{ rus: "Ансуз", eng: "Ansuz", img: "/img/runes/ansuz.png" },
				{ rus: "Йера", eng: "Jera", img: "/img/runes/jera.png" },
				{ rus: "Манназ", eng: "Mannaz", img: "/img/runes/mannaz.png" }
			]
		},
		{
			group: 5,
			atts: [
				{ rus: "Райдо", eng: "Raido", img: "/img/runes/raido.png" },
				{ rus: "Эйваз", eng: "Eihwaz", img: "/img/runes/eihwaz.png" },
				{ rus: "Лагуз", eng: "Laguz", img: "/img/runes/laguz.png" }
			]
		},
		{
			group: 6,
			atts: [
				{ rus: "Кеназ", eng: "Kenaz", img: "/img/runes/kenaz.png" },
				{ rus: "Перт", eng: "Perth", img: "/img/runes/perth.png" },
				{ rus: "Ингуз", eng: "Inguz", img: "/img/runes/inguz.png" }
			]
		},
		{
			group: 7,
			atts: [
				{ rus: "Гебо", eng: "Gebo", img: "/img/runes/gebo.png" },
				{ rus: "Альгиз", eng: "Algiz", img: "/img/runes/algiz.png" },
				{ rus: "Отала", eng: "Othala", img: "/img/runes/othala.png" }
			]
		},
		{
			group: 8,
			atts: [
				{ rus: "Вуньо", eng: "Wunjo", img: "/img/runes/wunjo.png" },
				{ rus: "Совило", eng: "Sowulo", img: "/img/runes/sowulo.png" },
				{ rus: "Дагаз", eng: "Dagaz", img: "/img/runes/dagaz.png" }
			]
		},
		{
			group: 9,
			atts: [
				{ rus: "Пустая руна<br>Вирд", eng: "Wyrd", img: "/img/runes/empty.png" },
				{ rus: "Пустая руна<br>Вирд", eng: "Wyrd", img: "/img/runes/empty.png" },
				{ rus: "Пустая руна<br>Вирд", eng: "Wyrd", img: "/img/runes/empty.png" }
			]
		}
	];

	const ORIGIN_URL= window.location.origin;

	// Функция для получения руны по номеру группы и этта
	function getRuneByGroupAndAtt(groupNumber, attNumber) {
		const groupIndex = groupNumber - 1; // Индекс группы
		const attIndex = attNumber - 1; // Индекс этта
		if (runes[groupIndex] && runes[groupIndex].atts[attIndex]) {
			return {
				rune: runes[groupIndex].atts[attIndex], // Руна
				group: groupNumber, // Номер группы
				att: attNumber, // Номер этта
			};
		} else {
			return null; // Если такой группы или этта нет, вернем null
		}
	}

	const rcForm = document.querySelector("#runeCalcForm");

	rcForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const language = rcForm.querySelector("#rc_language").value;
	const name = rcForm.querySelector("#rc_imya").value;
	const surname = rcForm.querySelector("#rc_familiya").value;
	const patronymic = rcForm.querySelector("#rc_otchestvo").value;
	const birthDate = rcForm.querySelector("#rc_date").value;
	const [birthYear, birthMonth, birthDay] = birthDate.split("-");

	// Функция для проверки текста на кириллицу
	function isCyrillic(input) {
		const cyrillicPattern = /^[А-ЯЁа-яё\s]+$/;
		return cyrillicPattern.test(input);
	}

	// Функция для проверки текста на латиницу
	function isLatin(input) {
		const latinPattern = /^[A-Za-z\s]+$/;
		return latinPattern.test(input);
	}

	if (language === "ru") {
		if (!isCyrillic(name) || !isCyrillic(surname)) {
			alert("Пожалуйста, вводите имя и фамилию на кириллице.");
			return false;
		}
	} else if (language === "en") {
		if (!isLatin(name) || !isLatin(surname)) {
			alert("Please enter your first and last name in Latin characters.");
			return false;
		}
	}

	// получаем суммы цифр в числе
	function getDigitSum(num) {
		num = num.toString().replace(/\D/g, "");
		while (num > 9) {
			num = num
			.toString()
			.split("")
			.reduce((acc, digit) => acc + parseInt(digit), 0);
		}
		return +num;
	}
	// console.log(getDigitSum('1991-04-29'));

	// пре­об­ра­зу­ем де­сятич­ный код в тро­ич­ный код
	function getTernaryValue(num) {
		num = getDigitSum(num);
		if (num == 1 || num == 4 || num == 7) {
			return 1;
		} else if (num == 2 || num == 5 || num == 8) {
			return 2;
		} else if (num == 3 || num == 6 || num == 9) {
			return 3;
		}
	}
	// console.log(getTernaryValue(46));

	// ищем совпадение значений или возвращаем null
	function checkMatch(first, second, third) {
		if (first === second && second === third) {
			return first;
		}
		if (first === second || first === third) {
			return first;
		}
		if (second === third) {
			return second;
		}
		return null;
	}
	// console.log(checkMatch(1,2,1));

	// РУНА СУЩНОСТИ
	function getEssenceRune() {
		const group = getDigitSum(birthDate);
		// check9group(group);
		const att =
			checkMatch(
			getTernaryValue(birthDay),
			getTernaryValue(birthMonth),
			getTernaryValue(birthYear)
			) || getTernaryValue(getDigitSum(birthDate));
		let essenceRune = getRuneByGroupAndAtt(group, att);
		essenceRune.dayNumber = getDigitSum(birthDay);
		essenceRune.monthNumber = getDigitSum(birthMonth);
		essenceRune.yearNumber = getDigitSum(birthYear);
		return {
			...essenceRune,
		};
	}
	const essenceRune = getEssenceRune();
	console.log(`Руна Сущности:`);
	console.log(essenceRune);

	// РУНА ЛИЧНОСТИ
	function getPersonalityRune() {
		let letterValues = null;
		if (language === "ru") {
			letterValues = {
				'А': 1, 'И': 1, 'С': 1, 'Ъ': 1,
				'Б': 2, 'Й': 2, 'Т': 2, 'Ы': 2,
				'В': 3, 'К': 3, 'У': 3, 'Ь': 3,
				'Г': 4, 'Л': 4, 'Ф': 4, 'Э': 4,
				'Д': 5, 'М': 5, 'Х': 5, 'Ю': 5,
				'Е': 6, 'Н': 6, 'Ц': 6, 'Я': 6,
				'Ё': 7, 'О': 7, 'Ч': 7,
				'Ж': 8, 'П': 8, 'Ш': 8,
				'З': 9, 'Р': 9, 'Щ': 9
				};
		} else if (language === "en") {
			letterValues = {
				'A': 1, 'J': 1, 'S': 1,
				'B': 2, 'K': 2, 'T': 2,
				'C': 3, 'L': 3, 'U': 3,
				'D': 4, 'M': 4, 'V': 4,
				'E': 5, 'N': 5, 'W': 5,
				'F': 6, 'O': 6, 'X': 6,
				'G': 7, 'P': 7, 'Y': 7,
				'H': 8, 'Q': 8, 'Z': 8,
				'I': 9, 'R': 9
				};
		}
		function getNameNumber(name) {
			const upperName = name.toUpperCase().replace(/\s+/g, "");
			let sum = 0;
			for (const letter of upperName) {
			if (letterValues[letter]) {
				sum += letterValues[letter];
			}
			}
			sum = getDigitSum(sum);
			return sum;
		}
		function getPersonalityNumber(names) {
			sum = 0;
			names.forEach((name) => {
			sum += getNameNumber(name);
			});
			return getDigitSum(sum);
		}
		const group = getPersonalityNumber([name, surname, patronymic]);
		const att =
			checkMatch(
			getTernaryValue(getPersonalityNumber([name])),
			getTernaryValue(getPersonalityNumber([surname])),
			getTernaryValue(getPersonalityNumber([patronymic]))
			) || getTernaryValue(getPersonalityNumber([name, surname, patronymic]));
		// check9group(group);
		let personalityRune = getRuneByGroupAndAtt(group, att);
		personalityRune.nameNumber = getNameNumber(name);
		personalityRune.surnameNumber = getNameNumber(surname);
		personalityRune.patronymicNumber = getNameNumber(patronymic);
		return {
			...personalityRune,
		};
	}
	const personalityRune = getPersonalityRune();
	console.log(`Руна Личности:`);
	console.log(personalityRune);

	// ЗОЛОТАЯ РУНА
	function getGoldenRune() {
		const dayPlusName = essenceRune.dayNumber + personalityRune.nameNumber;
		const monthPlusPatronymic =
			essenceRune.monthNumber + personalityRune.patronymicNumber;
		const yearPlusSurname =
			essenceRune.yearNumber + personalityRune.surnameNumber;
		const group = getDigitSum(essenceRune.group + personalityRune.group);
		const att =
			checkMatch(
			getTernaryValue(dayPlusName),
			getTernaryValue(monthPlusPatronymic),
			getTernaryValue(yearPlusSurname)
			) ||
			getTernaryValue(getDigitSum(essenceRune.group + personalityRune.group));
		// check9group(group);
		let goldenRune = getRuneByGroupAndAtt(group, att);
		goldenRune.dayPlusName = dayPlusName;
		goldenRune.monthPlusPatronymic = monthPlusPatronymic;
		goldenRune.yearPlusSurname = yearPlusSurname;
		return {
			...goldenRune,
		};
	}
	const goldenRune = getGoldenRune();
	console.log(`Золотая Руна:`);
	console.log(goldenRune);

	document.querySelector(
		"#essenceRune"
	).innerHTML = `<img src="${ORIGIN_URL+essenceRune.rune.img}" alt="${essenceRune.rune.rus}"><h5><em>${essenceRune.rune.rus} (${essenceRune.rune.eng})</em></h5><small>Руническая группа: ${essenceRune.group}<br>Атт: ${essenceRune.att}</small>`;
	document.querySelector(
		"#personalityRune"
	).innerHTML = `<img src="${ORIGIN_URL+personalityRune.rune.img}" alt="${personalityRune.rune.rus}"><h5><em>${personalityRune.rune.rus} (${personalityRune.rune.eng})</em></h5><small>Руническая группа: ${personalityRune.group}<br>Атт: ${personalityRune.att}</small>`;
	document.querySelector(
		"#goldenRune"
	).innerHTML = `<img src="${ORIGIN_URL+goldenRune.rune.img}" alt="${goldenRune.rune.rus}"><h5><em>${goldenRune.rune.rus} (${goldenRune.rune.eng})</em></h5><small>Руническая группа: ${goldenRune.group}<br>Атт: ${goldenRune.att}</small>`;
	document.querySelector("#runeCalcResult").style.display = "block";
	document.querySelector("#runeCalcAbout").style.display = "none";
	document
		.querySelector("#runeCalcResult")
		.scrollIntoView({ behavior: "smooth", block: "start" });
	});

});
