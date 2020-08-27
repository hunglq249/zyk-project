class Component {
	constructor(options) {
		let configValues = {
			name: '',
			tag: 'div',
			mainClass: '',
			subClasses: [],
		};

		this.config = {
			...configValues,
			...options,
		};

		this.output = this.render();
	}

	render() {
		let html = this.renderHtml();

		let result = [];

		result.push({ html: html });

		return result;
	}

	renderHtml() {
		let template = `
			<${this.config.tag} class="${this.config.mainClass} ${this.getSubClasses()}">
				${this.config.tag}
			</${this.config.tag}>
		`;

		return template;
	}

	getSubClasses() {
		let subClasses = this.config.subClasses;

		let classes = subClasses.toString();

		return classes;
	}
}
