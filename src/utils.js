export const POINT_TO_PIXEL_CONVERTER = ( 2 / 3 * 2 );

export function getLineHeightNumber( value ) {
	switch ( true ) {
		case value.indexOf( '%' ) > -1:
			value = parseFloat( value.replace( '%', '' ) ) / 100;
			break;
		case value.indexOf( 'pt' ) > -1:
			value = parseFloat( value.replace( 'pt', '' ) ) / 10;
			break;
		case value.indexOf( 'px' ) > -1:
			value = parseFloat( value.replace( 'px', '' ) ) / POINT_TO_PIXEL_CONVERTER / 10;
			break;
		default:
			value = parseFloat( value );
	}

	return parseFloat( value.toFixed( 2 ) );
}
