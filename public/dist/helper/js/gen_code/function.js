$(document).ready(() => {
	$('#inputComponentId').on('change', function () {
		let id = $(this).val();
		let groupId = $(this).find(':selected').data('group-id');

		if (id == '') {
			$('#btnGen').addClass('disabled');
			$('#btnGen').attr('disabled', true);
		} else {
			$('#btnGen').removeClass('disabled');
			$('#btnGen').removeAttr('disabled');

			getConfig(groupId, id);
		}
	});
});

function getConfig(groupId, id) {
	let url = '/gen-helper/getComponentConfig';

	url = utils.buildUrl(url, 'group', groupId);
	url = utils.buildUrl(url, 'id', id);

	utils.callAjax({
		url: url,
		method: 'GET',
		success: function (res) {
			$('#formConfig').html(res.html);
		},
	});
}

function generateCode() {
	let $form = $('#formGen');

	let compName = $form.find('#inputComponentId').find(':selected').text();
	let compTag = $form.find('#selectTagName').val();
	let compMainClass = $form.find('#selectCompMainClass').val();
	let compSubClasses = $form.find('#selectCompSubClasses').val();

	let comp = new Component({
		name: compName,
		tag: compTag,
		mainClass: compMainClass,
		subClasses: compSubClasses,
	});

	console.log(typeof comp.output[0].html);

	let html = $.parseHTML(comp.output[0].html);
	let pureHtml = htmlEntities(comp.output[0].html);

	$('.quarter-code').find('code').html(pureHtml);
	$('.quarter-demo').html(html);
}

function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
