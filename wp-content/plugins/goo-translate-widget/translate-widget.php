<?php
/*
	Plugin Name: Goo Translate Widget
	Description: Make your website instantly available in 90+ languages. Add the power of Google automatic translations to your website with one click using this widget.
	Author: Gregory M
	Author URI: https://profiles.wordpress.org/gioni/
	Version: 1.0
	Text Domain: gtwgt
	Domain Path: /languages
*/


add_action('widgets_init', create_function('', 'return register_widget("Translate_Widget");'));


class Translate_Widget extends WP_Widget {

	function __construct() {		
		load_plugin_textdomain( 'gtwgt', false, basename( dirname( __FILE__ ) ) . '/languages' );		
		parent::__construct(
			'translate_wgt',
			__( 'Google Translate Widget','gtwgt'),
			array( 'description' => __( 'Add the power of Google translations service to your website with one click','gtwgt') )
		);
	}

	function widget($args, $instance) {
		extract( $args );
		$title = apply_filters('widget_title', $instance['title'], $instance, $this->id_base);
		
		echo $before_widget;
		if ( $title ) echo $before_title . esc_html($title) . $after_title; 
								
		$params=array("autoDisplay: false");
		if ($instance['orlang']) $params[]="pageLanguage: '".$instance['orlang']."'"; else $params[]="pageLanguage: 'en'";
		if ($instance['mlng']) $params[]="multilanguagePage: true";
		if ($instance['gaid']) $params[]="gaTrack: true, gaId: '".$instance['gaid']."'";
		if (!empty($params)) $plist=implode(',',$params).','; else $plist='';
		?>
		<div id="google_translate_element"></div>
		<script type="text/javascript">
		function googleTranslateElementInit() {
	  	new google.translate.TranslateElement({ <?php echo $plist; ?> layout: google.translate.TranslateElement.InlineLayout.SIMPLE }, 'google_translate_element');
		}
		</script>
		<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
		<?php
				
		echo $after_widget;
	}
	
	function form($instance) {
  	?>
		<p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($instance['title']); ?>" />

		<?php 
		echo '<p>'.__('What is the original language of your website?','gtwgt').'<br/><select name="'.$this->get_field_name( 'orlang' ).'" id="'.$this->get_field_id( 'orlang' ).'">';
		foreach ($this->goo_langs as $id => $lang) echo '<option value="'.$id.'" '.selected($instance['orlang'],$id).'>'.$lang.'</option>';
		echo '</select></p>';
		?>
			
		<p><input class="checkbox" type="checkbox" name="<?php echo $this->get_field_name( 'mlng' ); ?>" id="<?php echo $this->get_field_id( 'mlng' ); ?>" <?php checked($instance['mlng']); ?> value="1" /> <label for="<?php echo $this->get_field_id( 'mlng' ); ?>"><?php _e('My page contains content in multiple languages','gtwgt'); ?></label></p>
		
		<p><label for="<?php echo $this->get_field_id('gaid'); ?>"><?php _e('Track translation using Google Analytics:','gtwgt'); ?></label>
		<input class="widefat" id="<?php echo $this->get_field_id('gaid'); ?>" name="<?php echo $this->get_field_name('gaid'); ?>" type="text" value="<?php echo esc_attr($instance['gaid']); ?>" placeholder="Your GA Web Property ID"/>
		
		<?php
		
	}
  
	function update($new_instance, $old_instance) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['orlang'] = $new_instance['orlang'];		
		$instance['mlng'] = $new_instance['mlng'];
		$instance['gaid'] = $new_instance['gaid'];
		return $instance;
	}
	
	var $goo_langs = array(
	'af'=>'Afrikaans', 
	'sq'=>'Albanian', 
	'ar'=>'Arabic', 
	'hy'=>'Armenian', 
	'az'=>'Azerbaijani', 
	'eu'=>'Basque', 
	'be'=>'Belarusian',
	'bn'=>'Bengali',
	'bs'=>'Bosnian',
	'bg'=>'Bulgarian',
	'my'=>'Burmese',
	'ca'=>'Catalan',
	'ceb'=>'Cebuano',
	'zh-CN'=>'Chinese',
	'zh-TW'=>'Chinese (Traditional)',
	'hr'=>'Croatian',
	'cs'=>'Czech',
	'da'=>'Danish',
	'nl'=>'Dutch',
	'en'=>'English',
	'eo'=>'Esperanto',
	'et'=>'Estonian',
	'tl'=>'Filipino',
	'fi'=>'Finnish',
	'fr'=>'French',
	'gl'=>'Galician',
	'ka'=>'Georgian',
	'de'=>'German',
	'el'=>'Greek',
	'gu'=>'Gujarati',
	'ht'=>'Haitian',
	'ha'=>'Hausa',
	'iw'=>'Hebrew',
	'hi'=>'Hindi',
	'hmn'=>'Hmong',
	'hu'=>'Hungarian',
	'is'=>'Icelandic',
	'ig'=>'Igbo',
	'id'=>'Indonesian',
	'ga'=>'Irish',
	'it'=>'Italian',
	'ja'=>'Japanese',
	'jv'=>'Javanese',
	'kn'=>'Kannada',
	'kk'=>'Kazakh',
	'km'=>'Khmer',
	'ko'=>'Korean',
	'lo'=>'Lao',
	'la'=>'Latin',
	'lv'=>'Latvian',
	'lt'=>'Lithuanian',
	'mk'=>'Macedonian',
	'mg'=>'Malagasy',
	'ms'=>'Malay',
	'ml'=>'Malayalam',
	'mt'=>'Maltese',
	'mi'=>'Maori',
	'mr'=>'Marathi',
	'mn'=>'Mongolian',
	'no'=>'Norwegian',
	'ny'=>'Nyanja',
	'fa'=>'Persian',
	'pl'=>'Polish',
	'pt'=>'Portuguese',
	'pa'=>'Punjabi',
	'ro'=>'Romanian',
	'ru'=>'Русский',
	'sr'=>'Serbian',
	'si'=>'Sinhala',
	'sk'=>'Slovak',
	'sl'=>'Slovenian',
	'so'=>'Somali',
	'es'=>'Spanish',
	'su'=>'Sundanese',
	'sw'=>'Swahili',
	'sv'=>'Swedish',
	'tg'=>'Tajik',
	'ta'=>'Tamil',
	'te'=>'Telugu',
	'th'=>'Thai',
	'tr'=>'Turkish',
	'uk'=>'Ukrainian',
	'ur'=>'Urdu',
	'uz'=>'Uzbek',
	'vi'=>'Vietnamese',
	'cy'=>'Welsh',
	'yi'=>'Yiddish',
	'yo'=>'Yoruba',
	'zu'=>'Zulu');


}