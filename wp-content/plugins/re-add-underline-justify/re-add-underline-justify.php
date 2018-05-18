<?php
/*
 * Plugin Name: Re-add text underline and justify
 * Plugin URI: https://www.b-website.com/re-add-text-underline-and-justify
 * Description: This very simple plugin re-adds the Editor text underline, text justify and rearrange buttons as they were before WordPress 4.7.
 * Author: Brice Capobianco
 * Version: 0.1.4
 * Author URI: https://www.b-website.com/
 * Domain Path: /langs
 * Text Domain: re-add-underline-justify
 */

/*  Copyright 2016  Brice CAPOBIANCO  (contact : http:// b-website.com/contact)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/


/***************************************************************
 * SECURITY : Exit if accessed directly
***************************************************************/
if ( !defined( 'ABSPATH' ) ) {
	
	die( 'Direct access not allowed!' );
	
}


/***************************************************************
 * Add custom meta link on plugin list page
 ***************************************************************/
function ratb_meta_links( $links, $file ) {
	
	if ( $file === 're-add-underline-justify/re-add-underline-justify.php' ) {
		$paypalDonate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7Z6YVM63739Y8';
		$links[] = '<a href="https://www.b-website.com/category/plugins" target="_blank" title="' . __( 'More b*web Plugins', 'simple-revisions-delete' ) . '">'. __( 'More b*web Plugins', 'simple-revisions-delete' ) .'</a>';
		$links[] = '<a href="' . $paypalDonate . '" target="_blank" title="' . __( 'Donate to this plugin &#187;' ) . '"><strong>' . __( 'Donate to this plugin &#187;' ) . '</strong></a>';
	}
	return $links;
	
}
add_filter( 'plugin_row_meta', 'ratb_meta_links', 10, 2 );


/***************************************************************
 * Load plugin textdomain
 ***************************************************************/
function ratb_load_textdomain() {
	
	$path = dirname( plugin_basename( __FILE__ ) ) . '/langs/';
	load_plugin_textdomain( 're-add-underline-justify', FALSE, $path );
	
}
add_action( 'init', 'ratb_load_textdomain' );


/***************************************************************
 * Remove plugin settings from DB on plugin deletion
 ***************************************************************/
function ratb_uninstall() {
	
	// Remove option from DB
	delete_option( 'ratb_options' );
	
}


/***************************************************************
 * Hooks for install & uninstall
 ***************************************************************/
function ratb_activation() {
	
	register_uninstall_hook( __FILE__,  'ratb_uninstall' );
	
}
register_activation_hook( __FILE__, 'ratb_activation' );


/***************************************************************
 * Register the new setting on the Wrinting screen
 ***************************************************************/
function ratb_admin_init(){
	
	register_setting(
		'writing',											// settings page
		'ratb_options'										// option name
	);	
	add_settings_field(
		'ratb_mce_style',									// id
		__( 'Editor style', 're-add-underline-justify' ),	// setting title
		'ratb_setting_input',								// display callback
		'writing',											// settings page
		'default'											// settings section
	);
	
}
add_action('admin_init', 'ratb_admin_init');


/***************************************************************
 * Display the select on the Wrinting screen
 ***************************************************************/
function ratb_setting_input() {
	
	//Retrieve the option value
	$options = get_option( 'ratb_options' );
	
	//Default value
	if( empty( $options ) ){
		$options['ratb_mce_style'] = 1;
	}
	
	// Output the field
	echo '	
	<select id="ratb_mce_style" name="ratb_options[ratb_mce_style]">
		<option value="1"' . selected( $options['ratb_mce_style'], 1, false ) . '>' . __( 'Default - without underline & justify buttons', 're-add-underline-justify' ) . '</option>
		<option value="2"' . selected( $options['ratb_mce_style'], 2, false ) . '>' . __( 'Re-add underline & justify buttons', 're-add-underline-justify' ) . '</option>
		<option value="3"' . selected( $options['ratb_mce_style'], 3, false ) . '>' . __( 'Re-add underline & justify + rearrange', 're-add-underline-justify' ) . '</option>
		<option value="4"' . selected( $options['ratb_mce_style'], 4, false ) . '>' . __( 'Re-add justify only', 're-add-underline-justify' ) . '</option>
	</select>';
	
}


/***************************************************************
 * Update tinyMCE buttons lines
 ***************************************************************/
function ratb_buttons_lines_tiny_mce(){
	
	//Retrieve the option value
	$options = get_option( 'ratb_options' );
	
	// Conditionnal MCE display
	if ( isset( $options['ratb_mce_style'] ) && $options['ratb_mce_style'] == 2 ) {
		
		add_filter( 'mce_buttons', 'ratb_tiny_mce_buttons', 5 );
		add_filter( 'mce_buttons_2', 'ratb_tiny_mce_buttons_2', 5 );	
		
	} else if ( isset( $options['ratb_mce_style'] ) && $options['ratb_mce_style'] == 3 ) {
		
		add_filter( 'mce_buttons', 'ratb_tiny_mce_buttons_rearrange', 5 );
		add_filter( 'mce_buttons_2', 'ratb_tiny_mce_buttons_2_rearrange', 5 );		
		
	} else if ( isset( $options['ratb_mce_style'] ) && $options['ratb_mce_style'] == 4 ) {
		
		add_filter( 'mce_buttons', 'ratb_tiny_mce_buttons_justify', 5 );
		
	} 
	//Else, do nothing... use the default editor style

}	 
add_action( 'admin_head', 'ratb_buttons_lines_tiny_mce', 5 );


/***************************************************************
 * First editor row buttons - 4.6
 ***************************************************************/
function ratb_tiny_mce_buttons( $buttons_array ){
	
	$mce_buttons = array( 
			'bold',				// Applies the bold format to the current selection.
			'italic',			// Applies the italic format to the current selection.
			'strikethrough',	// Applies strike though format to the current selection.
			'bullist',			// Formats the current selection as a bullet list.
			'numlist',			// Formats the current selection as a numbered list.
			'blockquote',		// Applies block quote format to the current block level element.
			'hr',				// Inserts a horizontal rule into the editor.
			'alignleft',		// Left aligns the current block or image.
			'aligncenter',		// Left aligns the current block or image.
			'alignright',		// Right aligns the current block or image.
			'link',				// Creates/Edits links within the editor.
			'unlink',			// Removes links from the current selection.
			'wp_more',			// Inserts the <!-- more --> tag.
			'spellchecker',		// ???
			'wp_adv',			// Toggles the second toolbar on/off.
			'dfw' 				// Distraction-free mode on/off.
		); 
	return $mce_buttons;
	
}


/***************************************************************
 * Second editor row buttons - 4.6
 ***************************************************************/
function ratb_tiny_mce_buttons_2( $buttons_array ){	
	
	$mce_buttons_2 = array( 
			'formatselect',		// Dropdown list with block formats to apply to selection.
			'underline',		// Applies the underline format to the current selection.
			'alignjustify',		// Full aligns the current block or image.
			'forecolor',		// Applies foreground/text color to selection.
			'pastetext',		// Toggles plain text pasting mode on/off.
			'removeformat',		// Removes the formatting from the current selection.
			'charmap',			// Inserts custom characters into the editor.
			'outdent',			// Outdents the current list item or block element.
			'indent',			// Indents the current list item or block element.
			'undo',				// Undoes the last operation.
			'redo',				// Redoes the last undoed operation.
			'wp_help'			// Opens the help.
		); 
		
	//Fix for ACF code button
	if ( in_array( 'code', $buttons_array ) ){
		$mce_buttons_2[] = 'code';
	}
	
	return $mce_buttons_2;
	
}


/***************************************************************
 * Buttons lists - 4.7 + rearrange
 ***************************************************************/
function ratb_tiny_mce_buttons_rearrange_list(){
	
	return $mce_buttons = array( 
			'formatselect',		// Dropdown list with block formats to apply to selection.
			'bold',				// Applies the bold format to the current selection.
			'italic',			// Applies the italic format to the current selection.
			'underline',		// Applies the underline format to the current selection.
			'bullist',			// Formats the current selection as a bullet list.
			'numlist',			// Formats the current selection as a numbered list.
			'blockquote',		// Applies block quote format to the current block level element.
			'hr',				// Inserts a horizontal rule into the editor.
			'alignleft',		// Left aligns the current block or image.
			'aligncenter',		// Left aligns the current block or image.
			'alignright',		// Right aligns the current block or image.
			'alignjustify',		// Full aligns the current block or image.
			'link',				// Creates/Edits links within the editor.
			'unlink',			// Removes links from the current selection.
			'wp_more',			// Inserts the <!-- more --> tag.
			'spellchecker',		// ???
			'wp_adv',			// Toggles the second toolbar on/off.
			'dfw' 				// Distraction-free mode on/off.
		);
		
}


function ratb_tiny_mce_buttons_2_rearrange_list(){
	
	return $mce_buttons_2 = array( 
			'strikethrough',	// Applies strike though format to the current selection.
			'forecolor',		// Applies foreground/text color to selection.
			'pastetext',		// Toggles plain text pasting mode on/off.
			'removeformat',		// Removes the formatting from the current selection.
			'charmap',			// Inserts custom characters into the editor.
			'outdent',			// Outdents the current list item or block element.
			'indent',			// Indents the current list item or block element.
			'undo',				// Undoes the last operation.
			'redo',				// Redoes the last undoed operation.
			'wp_help'			// Opens the help.
		);
		
}

 
 /***************************************************************
 * First editor row buttons - 4.7 + rearrange
 ***************************************************************/
function ratb_tiny_mce_buttons_rearrange( $buttons_array ){
	
	$mce_buttons = ratb_tiny_mce_buttons_rearrange_list();
	
	//Keep extra buttons by comparing two buttons lines
	$mce_buttons_2 = ratb_tiny_mce_buttons_2_rearrange_list();
	foreach( $buttons_array as $button ){
		if( !in_array( $button, $mce_buttons ) && !in_array( $button, $mce_buttons_2 ) ){
			array_push( $mce_buttons, $button );
		}
	}
	
	return $mce_buttons;
	
}


/***************************************************************
 * Second editor row buttons - 4.7 + rearrange
 ***************************************************************/
function ratb_tiny_mce_buttons_2_rearrange( $buttons_array ){	
	
	$mce_buttons_2 = ratb_tiny_mce_buttons_2_rearrange_list();

	//Keep extra buttons by comparing two buttons lines
	$mce_buttons = ratb_tiny_mce_buttons_rearrange_list();
	foreach( $buttons_array as $button ){
		if( !in_array( $button, $mce_buttons_2 ) && !in_array( $button, $mce_buttons ) ){
			array_push( $mce_buttons_2, $button );
		}
	}
	
	return $mce_buttons_2;
	
}


/***************************************************************
 * First editor row buttons - Re-add justify only
 ***************************************************************/
function ratb_tiny_mce_buttons_justify( $buttons_array ){
		
	if ( !in_array( 'alignjustify', $buttons_array ) && in_array( 'alignright', $buttons_array ) ){
		$key = array_search( 'alignright', $buttons_array );
		$inserted = array( 'alignjustify' );
		array_splice( $buttons_array, $key + 1, 0, $inserted );
	}
	
	return $buttons_array;
	
}