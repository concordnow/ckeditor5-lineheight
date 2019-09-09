import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import LineHeightConverter from './lineheightconverter';

export default class LineHeight extends Plugin {
	static get requires() {
		return [ LineHeightConverter ];
	}

	static get pluginName() {
		return 'LineHeight';
	}
}

