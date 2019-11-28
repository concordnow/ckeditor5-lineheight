export const POINT_TO_PIXEL_CONVERTER = ( 2 / 3 * 2 );

// 1.2 is default line-height browsers value
export function getLineHeightNumber( value, configLineHeightValue = 1.2 ) {
	switch ( true ) {
		case value.indexOf( '%' ) > -1:
			value = parseFloat( value.replace( '%', '' ) ) / 100 * configLineHeightValue;
			break;
		case value.indexOf( 'pt' ) > -1:
			value = parseFloat( value.replace( 'pt', '' ) ) / 10 * configLineHeightValue;
			break;
		case value.indexOf( 'px' ) > -1:
			value = parseFloat( value.replace( 'px', '' ) ) / POINT_TO_PIXEL_CONVERTER / 10 * configLineHeightValue;
			break;
		default:
			value = parseFloat( value );
	}

	return parseFloat( value.toFixed( 2 ) );
}
