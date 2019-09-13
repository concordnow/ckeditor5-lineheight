import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { getLineHeightNumber } from './utils';

export default class LineHeightConverter extends Plugin {
	static get pluginName() {
		return 'LineHeightConverter';
	}

	init() {
		const editor = this.editor;
		const schema = editor.model.schema;
		const conversion = editor.conversion;
		const configLineHeightValue = editor.config.get( 'lineHeight' );

		schema.extend( 'paragraph', {
			allowAttributes: [ 'lineHeight' ]
		} );

		conversion.for( 'upcast' ).attributeToAttribute( {
			view: {
				name: 'p',
				key: 'style',
				value: /line-height:(.*?)(?:;|$)/
			},
			model: {
				key: 'lineHeight',
				value: viewElement => {
					const viewElementStyle = viewElement.getAttribute( 'style' );

					if ( !viewElementStyle ) {
						return;
					}

					const regexp = viewElementStyle.match( /line-height:(.*?)(?:;|$)/ );

					if ( !regexp ) {
						return;
					}

					const lineHeight = regexp[ 1 ];
					const value = getLineHeightNumber( lineHeight ) * ( configLineHeightValue || 1 );

					return value;
				}
			}
		} );

		conversion.for( 'downcast' ).attributeToAttribute( {
			model: 'lineHeight',
			view: modelAttributeValue => {
				return {
					key: 'style',
					value: {
						'line-height': modelAttributeValue
					}
				};
			}
		} );
	}
}
