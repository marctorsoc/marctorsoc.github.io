<?php
/*
  Plugin Name: Post Or Page Hide Title
  Description: Allows admin to hide the title tag on single pages and posts.
  Version: 1.0
  Author: Jitendra Banjara
  Author URI: https://profiles.wordpress.org/jitendrabanjara1991
 */

if (!class_exists('PostOrPageHideTitle')) {

    class PostOrPageHideTitle {

        private $slug = 'post_or_pages_title';
        private $selector = '.entry-title';
        private $title;
        private $afterHead = false;

        function __construct() {

            add_action('add_meta_boxes', array($this, 'add_box'));
            add_action('save_post', array($this, 'save_data'));
            add_action('delete_post', array($this, 'delete_data'));
            add_action('wp_head', array($this, 'insert_in_heading'), 3000);
            add_action('the_title', array($this, 'main_title'));
            add_action('wp_enqueue_scripts', array($this, 'load_scripts'));
        }

        private function is_hide() {

            if (is_singular()) {

                global $post;

                $toggle = get_post_meta($post->ID, $this->slug, true);

                if ((bool) $toggle) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        public function insert_in_heading() {

            if ($this->is_hide()) {
                ?>                
                <script type="text/javascript">
                    jQuery(document).ready(function($) {

                        if (jQuery('<?php echo $this->selector; ?>').length != 0) {
                            jQuery('<?php echo $this->selector; ?> span.<?php echo $this->slug; ?>').parents('<?php echo $this->selector; ?>:first').hide();
                                    } else {
                                        jQuery('h1 span.<?php echo $this->slug; ?>').parents('h1:first').hide();
                                        jQuery('h2 span.<?php echo $this->slug; ?>').parents('h2:first').hide();
                                    }

                                });
                </script>
                <noscript><style type="text/css"> <?php echo $this->selector; ?> { display:none !important; }</style></noscript>
                <?php
            }
            $this->afterHead = true;
        }

        public function add_box() {

            $posttypes = array('post', 'page');

            foreach ($posttypes as $posttype) {
                add_meta_box($this->slug, 'Hide Title', array($this, 'create_boxes'), $posttype, 'side');
            }
        }

        public function create_boxes($post) {

            $value = get_post_meta($post->ID, $this->slug, true);

            $checked = '';

            if ((bool) $value) {
                $checked = ' checked="checked"';
            }

            wp_nonce_field($this->slug . '_dononce', $this->slug . '_noncename');
            ?>
            <label><input type="checkbox" name="<?php echo $this->slug; ?>" <?php echo $checked; ?> /> Hide the title on singular page views.</label>
            <?php
        }

        public function main_title($content) {

            if ($this->is_hide() && $content == $this->title && $this->afterHead) {
                $content = '<span class="' . $this->slug . '">' . $content . '</span>';
            }

            return $content;
        }

        public function load_scripts() {

            global $post;
            $this->title = $post->post_title;

            if ($this->is_hide()) {
                wp_enqueue_script('jquery');
            }
        }

        public function save_data($postID) {
                        
            $post_slug=sanitize_text_field($_POST[$this->slug . '_noncename']);           
            if (( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) || !isset($post_slug) || !wp_verify_nonce($post_slug, $this->slug . '_dononce')) {
			return $postID;
            }

            $old = get_post_meta($postID, $this->slug, true);
            $new = sanitize_text_field([$this->slug]);

            if ($old) {
                if (is_null($new)) {
                    delete_post_meta($postID, $this->slug);
                } else {
                    update_post_meta($postID, $this->slug, $new, $old);
                }
            } elseif (!is_null($new)) {
                add_post_meta($postID, $this->slug, $new, true);
            }

            return $postID;
        }

        public function delete_data($postID) {
            delete_post_meta($postID, $this->slug);
            return $postID;
        }

        public function set_selector($selector) {

            if (isset($selector) && is_string($selector)) {
                $this->selector = $selector;
            }
        }

    }

    $PostOrPageHideTitle = new PostOrPageHideTitle;
} 