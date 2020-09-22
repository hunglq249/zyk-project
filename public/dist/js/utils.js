const zykUtils = {};

zykUtils.callAjax = function callAjax(options) {
	var formData = new FormData();
	formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
	$.each(options.data, function (key, value) {
		formData.append(key, value);
	});

	$.ajax({
		url: options.url,
		type: options.method ? options.method : 'POST',
		crossDomain: true,
		contentType: false,
		processData: false,
		dataType: options.data_type ? options.data_type : 'json',
		data: formData,
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			xhr.upload.addEventListener(
				'progress',
				function (evt) {
					options.progress && options.progress(evt);
				},
				false
			);
			return xhr;
		},
		success: function (data) {
			options.success && options.success(data);
		},
		error: function (jqXhr) {
			var errors = jqXhr.responseJSON;
			options.error && options.error(errors);
		},
	});
};

zykUtils.buildUrl = function (url, k, v) {
	let key = encodeURIComponent(k),
		value = encodeURIComponent(v);

	let baseUrl = url.split('?')[0],
		newParam = key + '=' + value,
		params = '?' + newParam;

	if (url.split('?')[1] === undefined) {
		urlQueryString = '';
	} else {
		urlQueryString = '?' + url.split('?')[1];
	}
	if (urlQueryString) {
		let updateRegex = new RegExp('([?&])' + key + '[^&]*');
		let removeRegex = new RegExp('([?&])' + key + '=[^&;]+[&;]?');

		if (value === undefined || value === null || value === '') {
			params = urlQueryString.replace(removeRegex, '$1');
			params = params.replace(/[&;]$/, '');
		} else if (urlQueryString.match(updateRegex) !== null) {
			params = urlQueryString.replace(updateRegex, '$1' + newParam);
		} else if (urlQueryString == '') {
			params = '?' + newParam;
		} else {
			params = urlQueryString + '&' + newParam;
		}
	}
	params = params === '?' ? '' : params;
	return baseUrl + params;
};

zykUtils.validateEmail = function(input){
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(input).toLowerCase());
};

zykUtils.validatePhone = function(input){
    const res = /^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/;
    return res.test(String(input).toLowerCase());
};
