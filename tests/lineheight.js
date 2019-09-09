import LineHeight from './../src/lineheight';
import LineHeightConverter from './../src/lineheightconverter';

describe( 'LineHeight', () => {
	it( 'requires LineHeightConverter', () => {
		expect( LineHeight.requires ).to.deep.equal( [ LineHeightConverter ] );
	} );

	it( 'defines plugin name', () => {
		expect( LineHeight.pluginName ).to.equal( 'LineHeight' );
	} );
} );
