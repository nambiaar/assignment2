$(document).ready(function() {

	var data;
	var text;
	var thisDate;

	var jsonObj = '[{"1" : "YELLOW"}, {"2" : "RED"}, {"3" : "GREEN"}, {"4" : "BLACK"}, {"5" : "WHITE"}, {"6" : "ORANGE"}]';
	var json_data = JSON.parse(jsonObj);

	for(var i = 0; i < json_data.length; i++) {

		var option = $("<option>");

		for(var key in json_data[i]) {
			option.html(json_data[i][key]);
			option.attr("value", json_data[i]);
		}

		$("select").append(option);
	}

	renderGrid(data);

	$("#add").on("click", function (event) {

		var x = {
			"Name": $("#name").val(),
			"Date": $("#datePicker").val(),
			"Color" : $("#color option:selected" ).text()
		};

		var obj = (data == null)? [] : JSON.parse(data);
		obj.push( x);
		data = JSON.stringify(obj);
		renderGrid(data);

		event.preventDefault();
	});

	$("#clear").on("click", function (event) {
		data = null;
		renderGrid(data);
	});

	$("#jqxgrid").on("cellclick", function (event){
		var args = event.args;

		// row's visible index.
		var rowVisibleIndex = args.visibleindex;
		var rows = JSON.parse(data);

		$("#name").val(rows[rowVisibleIndex ].Name);
		$("#datePicker").val(rows[rowVisibleIndex ].Date);
		$("#color option:selected" ).text(rows[rowVisibleIndex ].Color);
	});
});

function renderGrid(data) {
	var source = {
		datatype: "json",
		datafields: [
			{ name: 'Name', type: 'string' },
			{ name: 'Date', type: 'string' },
			{ name: 'Color', type: 'string' }
		],
		localdata: data
	};

	var dataAdapter = new $.jqx.dataAdapter(source);

 	$("#jqxgrid").jqxGrid({
		width: 550,
		source: dataAdapter,
		columnsresize: true,
		columns: [
			{ text: 'Name', datafield: 'Name', width: 250 },
			{ text: 'Date', datafield: 'Date', width: 150 },
			{ text: 'Color', datafield: 'Color', width: 150 }
		]
	});
}
