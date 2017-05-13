<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://ajala.io
 * @since      1.0.0
 *
 * @package    Maya_Calendar
 * @subpackage Maya_Calendar/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Maya_Calendar
 * @subpackage Maya_Calendar/admin
 * @author     Michael Ajala <michael@ajala.io>
 */
class Maya_Calendar_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}
    public function add_options_page() {
        $this->plugin_screen_hook_suffix = add_menu_page(
            __('Maya Calendar Settings', 'maya-calendar'),
            __('Maya Calendar', 'maya-calendar'),
            'manage_options',
            $this->plugin_name,
            array($this, 'display_options_page')
        );
            /* debugger($this->plugin_screen_hook_suffix); */
    }
    /**
     * display_option_page
     *
     * Rendert die Admin Options Page 
     *
     * @return void
     */
    public function display_options_page() {
	include_once 'partials/index.html';
    }

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Plugin_Name_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Maya_Calendar_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/maya-calendar-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

    /**
     * defer_enqueue_scripts
     *
     * @param mixed $tag        
     * @param mixed $handle     = An unique specifier for a wordpress hook (e.g add_filter, add_action, euqueue_scripts,... etc.) 
     * @param mixed $src        = URL to the script file
     * @access public
     * @return void
     */
    function defer_enqueue_scripts($tag, $handle, $src) {

        /**
         * specify the target ($handle) that should be modified by wordpress  
         */
        $defer_scripts = array(
            'main-maya-script'
        );

        /**
         * checks if an $handle is listed in the array.
         */
        if(in_array($handle, $defer_scripts) ) {
            /**
             * it modifies the script tag to babel(javascript transformer) , so it can be executed by the browser
             */
            return '<script type="text/babel" src="' . $src . '"></script>' . "\n";
        }
        return $tag;
    }

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Maya_Calendar_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Maya_Calendar_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */


		wp_enqueue_script( 'maya-bundle-script', plugin_dir_url( __FILE__ ) . 'partials/dist/bundle.js' );
		wp_enqueue_script( 'react', plugin_dir_url( __FILE__ ) . 'js/react.min.js' );
		wp_enqueue_script( 'react-dom', plugin_dir_url( __FILE__ ) . 'js/react-dom.min.js' );
		wp_enqueue_script( 'main-maya-script', plugin_dir_url( __FILE__ ) . 'partials/src/maya-calendar-admin-display.js' );
		wp_enqueue_script( 'main-maya-script', plugin_dir_url( __FILE__ ) . 'partials/src/maya-calendar-admin-display.js' );

        /**
             Main admin application scirpt added to wordpress
         */
		wp_register_script( 'main-maya-script', plugin_dir_url( __FILE__ ) . 'partials/src/maya-calendar-admin-display.js','',1.1,true );
        /* Add filter to script */

        /**
         * this function tell us that this code should run anytime an enqueued script is about to be printed onto the page as an HTML script
         * element. Letting us filter that HTML is what 'script_loader_tag' is for. 
         */ 
        add_filter( 'script_loader_tag','defer_enqueue_scripts', 10, 3);
	}
}	

