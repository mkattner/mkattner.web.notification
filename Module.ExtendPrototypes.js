Number.prototype.pad = function(size) {
		var s = String(this);
		while (s.length < (size || 2)) {
			s = "0" + s;
		}
		return s;
	}

	// useful hashCode function
	String.prototype.hashCode = function() {
		var hash, length, _char;
		hash = 0;
		length = this.length;

		if (length == 0)
			return hash;
		for (var i = 0; i < length; i++) {
			_char = this.charCodeAt(i);
			hash = ((hash << 5) - hash) + _char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return Math.abs(hash);
	}

	// some android versions don't support startsWith
	if (typeof String.prototype.startsWith != 'function') {
		// see below for better implementation!
		String.prototype.startsWith = function(str) {
			return this.indexOf(str) === 0;
		};
	}

	if (typeof String.prototype.replaceAll != 'function') {
		String.prototype.replaceAll = function(search, replacement) {
			var target = this;
			return target.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
		};
	}

	if (typeof String.prototype.endsWith != 'function') {
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}

	if (typeof String.prototype.contains != 'function') {
		String.prototype.contains = function(it) {
			return this.indexOf(it) != -1;
		};
	}

	if (typeof String.prototype.capitalizeFirstLetter != 'function') {
		String.prototype.capitalizeFirstLetter = function() {
			return this.charAt(0).toUpperCase() + this.slice(1);
		};
	}

	String.prototype.pathCombine = function(path) {
		var url, set, replace_with;
		url = this + "/" + (path);
		set = url.match(/([^:]\/{2,})/g); // Match (NOT ":") followed by (2 OR
		// 3 "/")

		for (var str in set) {
			// Modify the data you have
			replace_with = set[str].substr(0, 1) + '/';

			// Replace the match
			url = url.replace(set[str], replace_with);
		}
		return url;
	}

	String.prototype.toIntegerVersion = function(delimiter) {
		var splittedString, integerVersion;

		integerVersion = 0;
		if (delimiter) {
			splittedString = this.split(delimiter).reverse();
		}

		else {
			splittedString = this.split(".").reverse();
		}

		$.each(splittedString, function(index, value) {
			integerVersion += Math.pow(10000, index) * parseInt(value);
		});

		return integerVersion;
	}

	/**
	 * "1.2.3" returns 1
	 */
	String.prototype.majorVersion = function() {
		return parseInt(this.split(".")[0])
	}

	/**
	 * "1.2.3" returns 2
	 */
	String.prototype.minorVersion = function() {
		return parseInt(this.split(".")[1])
	}

	/**
	 * "1.2.3" returns 3
	 */
	String.prototype.buildVersion = function() {
		return parseInt(this.split(".")[2])
	}

String.prototype.id = function() {
  return this.replace(/\W/g,'_');
}
	String.prototype.occurences = function(subString, allowOverlapping) {

		var string;
		string = this;
		subString += "";
		if (subString.length <= 0)
			return (string.length + 1);

		var n = 0, pos = 0, step = allowOverlapping ? 1 : subString.length;

		while (true) {
			pos = string.indexOf(subString, pos);
			if (pos >= 0) {
				++n;
				pos += step;
			} else
				break;
		}
		return n;
	}
