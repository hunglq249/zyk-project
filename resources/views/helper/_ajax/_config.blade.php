@php
	$config = $feature['Config'];
@endphp

@if (isset($config['Tags']))
	<div class="form-group col-md-12">
		<label>Tag name</label>

		<select class="form-control" id="selectTagName">
			<option value="">Select one</option>
			@foreach ($config['Tags'] as $key => $tag)
				<option value="{{ $tag }}">{{ $tag }}</option>
			@endforeach
		</select>
	</div>
@endif

@if (isset($config['Class']))
	<div class="form-group col-md-6">
		<label>Main class</label>

		<select class="form-control" id="selectCompMainClass">
			<option value="">Select one</option>
			@foreach ($config['Class'] as $key => $class)
				<option value="{{ $class }}">{{ $class }}</option>
			@endforeach
		</select>
	</div>
@endif

@if (isset($config['Classes']))
	<div class="form-group col-md-6">
		<label>Sub class(s)</label>

		<select class="form-control" id="selectCompSubClasses">
			<option value="">Select one</option>
			@foreach ($config['Classes'] as $key => $class)
				<option value="{{ $class }}">{{ $class }}</option>
			@endforeach
		</select>
	</div>
@endif