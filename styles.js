var styles = {
	"ps1" : {
		replaces : {
			'А' : 'A',
			'Б' : '6',
			'В' : 'B',
			'Г' : '7',
			'Д' : 'D',
			'Е' : 'E',
			'Ё' : 'E',
			'Ж' : 'X',
			'З' : '3',
			'И' : 'N',
			'Й' : 'N',
			'К' : 'K',
			'Л' : 'JI',
			'М' : 'M',
			'Н' : 'H',
			'О' : 'Ф',
			'П' : 'II',
			'Р' : 'P',
			'С' : 'C',
			'Т' : 'T',
			'У' : 'Y',
			'Ф' : 'Ф',
			'Х' : 'X',
			'Ц' : 'U',
			'Ч' : '4',
			'Ш' : 'W',
			'Щ' : 'W',
			'Ь' : 'b',
			'Ы' : 'bI',
			'Ъ' : 'b',
			'Э' : '3',
			'Ю' : 'I0',
			'Я' : '9'
		},
		getWastified : function(s) {
			var ans = "";
			var rep = this.replaces;
			var englishRegexp = /[a-z]/;
			for (var i = 0; i < s.length; i++) {
				var c = s[i];
				if(!englishRegexp.test(c)){
					c = c.toUpperCase();
				}
				if (rep[c] === null || rep[c] === undefined) {
					ans += c;
				} else {
					ans += rep[c];
				}
			}
			return ans;
		}
	},
	"vc" : {
		replaces : {
			'м' : "m",
			"п" : "n",
			"и" : "u",
			"й" : "u",
			"д" : "g"
		},
		getWastified : function(s) {
			var ans = "";
			var rep = this.replaces;
			for (var i = 0; i < s.length; i++) {
				var c = s[i];
				if (rep[c] === null || rep[c] === undefined) {
					ans += c;
				} else {
					ans += rep[c];
				}
			}
			return ans;
		}
	},
	"sa_caps" : {
		replaces : {
			"Э" : "3",
			"Щ" : "Ш",
			"Ъ" : "Ь",
			"S" : "Ы",
			"R" : "Я",
			"Ё" : "Е",
			"Й" : "И",
			"4" : "Ч",
			"6" : "Б"	
		},
		getWastified : function(s) {
			var ans = "";
			var rep = this.replaces;
			var englishRegexp = /[a-z]/;
			for (var i = 0; i < s.length; i++) {
				c = s[i];
				console.log(englishRegexp.test(c) + " " + c);
				if(!englishRegexp.test(c)) {
					c = c.toUpperCase();
				}
				if (rep[c] === null || rep[c] === undefined) {
					ans += c;
				} else {
					ans += rep[c];
				}
			}
			return ans;
		}
	}

}
