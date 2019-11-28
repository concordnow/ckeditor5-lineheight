import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';
import { getData as getViewData } from '@ckeditor/ckeditor5-engine/src/dev-utils/view';
import { getData as getModelData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import LineHeightConverter from './../src/lineheightconverter';
import { POINT_TO_PIXEL_CONVERTER, getLineHeightNumber } from './../src/utils';

describe( 'LineHeightConverter', () => {
	let editor, doc;

	testUtils.createSinonSandbox();

	afterEach( () => {
		if ( editor ) {
			return editor.destroy();
		}
	} );

	describe( 'conversion', () => {
		beforeEach( () => {
			return VirtualTestEditor
				.create( {
					plugins: [ Paragraph, LineHeightConverter ],
					lineHeight: 1.2
				} )
				.then( newEditor => {
					editor = newEditor;
					doc = editor.model;
				} );
		} );

		it( 'defines plugin name', () => {
			expect( LineHeightConverter.pluginName ).to.equal( 'LineHeightConverter' );
		} );

		it( 'should set proper schema rules', () => {
			expect( doc.schema.checkAttribute( [ 'paragraph' ], 'lineHeight' ) ).to.be.true;
		} );

		it( 'should convert pt line-height to number with no lineHeight in config', () => {
			const data = '<p style="line-height: 12.5pt"><span>foo bar</span></p>';
			const lineHeightValue = getLineHeightNumber( '12.5pt' );

			editor.setData( data );

			expect( lineHeightValue ).to.equal( 1.25 * 1.2 );
			expect( getModelData( doc ) )
				.to.equal( `<paragraph lineHeight="${ lineHeightValue }">[]foo bar</paragraph>` );
		} );

		it( 'should convert pt line-height to number and check model', () => {
			const data = '<p style="line-height: 12.5pt"><span>foo bar</span></p>';
			const configLineHeightValue = editor.config.get( 'lineHeight' );
			const lineHeightValue = getLineHeightNumber( '12.5pt', configLineHeightValue );

			editor.setData( data );

			expect( lineHeightValue ).to.equal( 1.25 * configLineHeightValue );
			expect( getModelData( doc ) )
				.to.equal( `<paragraph lineHeight="${ lineHeightValue }">[]foo bar</paragraph>` );
		} );

		it( 'should convert px line-height to number and check model', () => {
			const data = '<p style="line-height: 15px"><span>foo bar</span></p>';
			const configLineHeightValue = editor.config.get( 'lineHeight' );
			const lineHeightValue = getLineHeightNumber( '15px', configLineHeightValue );

			editor.setData( data );

			expect( lineHeightValue ).to.equal( parseFloat( ( 15 / POINT_TO_PIXEL_CONVERTER / 10 * configLineHeightValue ).toFixed( 2 ) ) );
			expect( getModelData( doc ) ).to.equal( `<paragraph lineHeight="${ lineHeightValue }">[]foo bar</paragraph>` );
		} );

		it( 'should convert percentage line-height to number and check model', () => {
			const data = '<p style="line-height: 125%"><span>foo bar</span></p>';
			const configLineHeightValue = editor.config.get( 'lineHeight' );
			const lineHeightValue = getLineHeightNumber( '125%', configLineHeightValue );

			editor.setData( data );

			expect( lineHeightValue ).to.equal( 1.25 * configLineHeightValue );
			expect( getModelData( doc ) ).to.equal( `<paragraph lineHeight="${ lineHeightValue }">[]foo bar</paragraph>` );
		} );

		it( 'should convert percentage line-height to number and check data and edit view', () => {
			const data = '<p style="line-height: 125%;"><span>foo bar</span></p>';
			const configLineHeightValue = editor.config.get( 'lineHeight' );
			const lineHeightValue = getLineHeightNumber( '125%', configLineHeightValue );
			const expectedData = `<p style="line-height:${ lineHeightValue };">foo bar</p>`;
			const expectedViewData = `<p style="line-height:${ lineHeightValue }">foo bar</p>`;

			editor.setData( data );

			expect( editor.getData() ).to.equal( expectedData );
			expect( getViewData( editor.editing.view, { withoutSelection: true } ) )
				.to.equal( expectedViewData );
		} );
	} );
} );

